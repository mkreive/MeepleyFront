import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './admin-message-card.module.scss';
import Paragraph from '../Paragraph/Paragraph';
import Heading from '../Heading/Heading';
import Button from '../Button/Button';

const cn = classNames.bind(styles);

export default function AdminMessageCard({ message, onMessageSend }) {
    const [answer, setAnswer] = useState('');
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    async function submitAnswer() {
        const url = `/api/messages/secure/add/message`;
        if (authState?.isAuthenticated && title !== '' && question !== '') {
            const requestOptions = {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: title, question: question }),
            };

            const submitNewQuestionResponse = await fetch(url, requestOptions);

            if (!submitNewQuestionResponse.ok) {
                throw new Error('Something went wrong!');
            }

            setAnswer('');
            setDisplayWarning(false);
            setDisplaySuccess(true);
            onMessageSend(true);
        } else {
            setDisplayWarning(true);
            setDisplaySuccess(false);
        }
    }

    return (
        <div className={cn('container')}>
            <div className={cn('group')}>
                <Heading tag='h4' style='small'>{`Case #${message.id}: ${message.title}`}</Heading>
                <Heading tag='h5' style='very-very-small-bold'>
                    {message.userEmail}
                </Heading>
                <Paragraph theme='big'>{message.question}</Paragraph>
            </div>

            <form method='POST' className={cn('form')}>
                <label className={cn('label')}>
                    <textarea
                        rows={5}
                        className={cn('input--textarea')}
                        placeholder='Answer'
                        onChange={(e) => setAnswer(e.target.value)}
                        value={answer}
                    />
                </label>

                {displayWarning && <Paragraph style='regular--alert_bold'>All fields must be filled out</Paragraph>}

                {displaySuccess && <Paragraph style='regular--secondary_bold'>Question added successfully!</Paragraph>}

                <Button theme='black--small' onClick={submitAnswer}>
                    Submit Answer
                </Button>
            </form>
        </div>
    );
}
