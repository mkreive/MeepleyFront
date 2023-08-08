import React, { useState, useEffect } from 'react';
import { fetchData } from '../../utils/fetchData';
import { useOktaAuth } from '@okta/okta-react';
import classNames from 'classnames/bind';
import styles from './new-message-field.module.scss';
import Paragraph from '../Paragraph/Paragraph';
import Button from '../Button/Button';

const cn = classNames.bind(styles);

export default function NewMessageField() {
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
                body: JSON.stringify(title, question),
            };

            const submitNewQuestionResponse = await fetchData(url, requestOptions);
            if (!submitNewQuestionResponse.ok) {
                throw new Error('Something went wrong!');
            }

            setTitle('');
            setQuestion('');
            setDisplayWarning(false);
            setDisplaySuccess(true);
        } else {
            setDisplayWarning(true);
            setDisplaySuccess(false);
        }
    }

    return (
        <div className={cn('container')}>
            <Paragraph style='small'>Ask a question:</Paragraph>

            <form method='POST'>
                {displayWarning && <Paragraph style='small--alert'>All fields must be filled out</Paragraph>}

                {displaySuccess && <Paragraph style='small-secondary'>Question added successfully</Paragraph>}

                <label className={cn('label')}>
                    Title
                    <input
                        type='text'
                        className={cn('input')}
                        placeholder='Title'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </label>

                <label className={cn('label')}>
                    Question
                    <textarea
                        rows={5}
                        className={cn('input--textarea')}
                        placeholder='Question'
                        onChange={(e) => setQuestion(e.target.value)}
                        value={question}
                    />
                </label>

                <Button theme='black' onClick={submitNewQuestion}>
                    Submit
                </Button>
            </form>
        </div>
    );
}
