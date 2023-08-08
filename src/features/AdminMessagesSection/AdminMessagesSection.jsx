import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { fetchMessages } from '../../utils/fetchMessages';
import classNames from 'classnames/bind';
import styles from './admin-messages-section.module.scss';
import Loader from '../../components/Loader/Loader';
import Heading from '../../components/Heading/Heading';
import SectionWithButton from '../../components/SectionWithButton/SectionWithButton';
import Paragraph from '../../components/Paragraph/Paragraph';
import NewMessageField from '../../components/NewMessageField/NewMessageField';
import MessageCard from '../../components/MessageCard/MessageCard';

const cn = classNames.bind(styles);

export default function AdminMessagesSection() {
    const { authState } = useOktaAuth();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [sendMessage, setSendMessage] = useState(false);

    useEffect(() => {
        const getMessages = async function () {
            if (authState && authState?.isAuthenticated) {
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json',
                    },
                };
                const fetchedMessages = await fetchMessages(
                    `/api/messages/search/findByUserEmail?userEmail=${authState?.accessToken?.claims.sub}`,
                    requestOptions
                );

                if (fetchedMessages) {
                    setLoading(false);
                    setMessages(fetchedMessages);
                } else {
                    setError(fetchedMessages);
                }
            }
        };
        getMessages();
        window.scrollTo(0, 0);
    }, [authState, sendMessage]);

    return (
        <section className={cn(`${!error ? 'wrapper' : 'hidden'}`)}>
            <Heading tag='h2' style='medium'>
                New Message
            </Heading>
            <NewMessageField onMessageSend={(props) => setSendMessage(props)} />
            <span className={cn('line')}></span>

            <Heading tag='h2' style='medium'>
                Messages History
            </Heading>

            {loading && <Loader />}

            {messages.length > 0 && !loading && messages.map((msg, i) => <MessageCard key={i} message={msg} />)}

            {messages.length === 0 && !loading && (
                <Paragraph style='regular'>Currently there is no messages.</Paragraph>
            )}

            {messages.length === 0 && !loading && (
                <SectionWithButton
                    title='Have any questions?'
                    text='Write us a message and we will respond as soon as we can!'
                />
            )}
        </section>
    );
}
