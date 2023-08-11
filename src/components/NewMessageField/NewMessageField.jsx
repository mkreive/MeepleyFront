import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useOktaAuth } from '@okta/okta-react';
import classNames from 'classnames/bind';
import styles from './new-message-field.module.scss';
import Paragraph from '../Paragraph/Paragraph';
import Button from '../Button/Button';

const cn = classNames.bind(styles);

export default function NewMessageField(props) {
    const { t } = useTranslation();
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
            <Paragraph style='regular--bold'>{t('account_messsages_newmsg_title')}</Paragraph>

            <form method='POST' className={cn('form')}>
                <label className={cn('label')}>
                    <input
                        type='text'
                        className={cn('input')}
                        placeholder={t('account_messsages_newmsg_input_placeholder')}
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </label>

                <label className={cn('label')}>
                    <textarea
                        rows={5}
                        className={cn('input--textarea')}
                        placeholder={t('account_messsages_newmsg_textarea_placeholder')}
                        onChange={(e) => setQuestion(e.target.value)}
                        value={question}
                    />
                </label>

                {displayWarning && (
                    <Paragraph style='regular--alert_bold'>{t('account_messsages_newmsg_warning')}</Paragraph>
                )}

                {displaySuccess && (
                    <Paragraph style='regular--secondary_bold'>{t('account_messsages_newmsg_success')}</Paragraph>
                )}

                <Button theme='black--small' onClick={submitNewQuestion}>
                    {t('account_messsages_newmsg_submitbtn')}
                </Button>
            </form>
        </div>
    );
}
