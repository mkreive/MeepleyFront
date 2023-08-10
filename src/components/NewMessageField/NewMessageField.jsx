import React, { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import classNames from 'classnames/bind';
import styles from './new-message-field.module.scss';
import Paragraph from '../Paragraph/Paragraph';
import Button from '../Button/Button';

const cn = classNames.bind(styles);

export default function NewMessageField(props) {
    const { authState } = useOktaAuth();
    const [title, setTitle] = useState('');
    const [question, setQuestion] = useState('');
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    async function submitNewQuestion() {
        const url = `/api/messages/secure/add/message`;
        if (authState?.isAuthenticated && title !== '' && question !== '') {
            const requestOptions = {
                method: 'POST',
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

            setTitle('');
            setQuestion('');
            setDisplayWarning(false);
            setDisplaySuccess(true);
            props.onMessageSend(true);
        } else {
            setDisplayWarning(true);
            setDisplaySuccess(false);
        }
    }

    return (
        <div className={cn('container')}>
            <Paragraph style='regular--bold'>Ask a question:</Paragraph>

            <form method='POST' className={cn('form')}>
                <label className={cn('label')}>
                    <input
                        type='text'
                        className={cn('input')}
                        placeholder='Title'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </label>

                <label className={cn('label')}>
                    <textarea
                        rows={5}
                        className={cn('input--textarea')}
                        placeholder='Question'
                        onChange={(e) => setQuestion(e.target.value)}
                        value={question}
                    />
                </label>

                {displayWarning && <Paragraph style='regular--alert_bold'>All fields must be filled out</Paragraph>}

                {displaySuccess && <Paragraph style='regular--secondary_bold'>Question added successfully!</Paragraph>}

                <Button theme='black--small' onClick={submitNewQuestion}>
                    Submit Question
                </Button>
            </form>
        </div>
    );
}
