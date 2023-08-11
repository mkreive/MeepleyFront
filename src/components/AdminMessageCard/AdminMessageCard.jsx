import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import styles from './admin-message-card.module.scss';
import Paragraph from '../Paragraph/Paragraph';
import Heading from '../Heading/Heading';
import Button from '../Button/Button';
import { useOktaAuth } from '@okta/okta-react';

const cn = classNames.bind(styles);

export default function AdminMessageCard({ message, onMessageSend }) {
    const { t } = useTranslation();
    const { authState } = useOktaAuth();
    const [response, setResponse] = useState('');
    const [displayWarning, setDisplayWarning] = useState(false);

    async function submitAnswer() {
        const url = `/api/messages/secure/admin/message`;
        if (authState && authState?.isAuthenticated && response !== '' && message.id != null) {
            const requestOptions = {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: message.id, response: response }),
            };

            const submitNewQuestionResponse = await fetch(url, requestOptions);

            if (!submitNewQuestionResponse.ok) {
                throw new Error('Something went wrong!');
            }

            setResponse('');
            setDisplayWarning(false);
            onMessageSend(true);
        } else {
            setDisplayWarning(true);
        }
    }

    return (
        <div className={cn('container')}>
            <div className={cn('group')}>
                <Heading tag='h4' style='small'>
                    {t('admin_messages_msgcard_case')}
                    {`${message.id}: ${message.title}`}
                </Heading>
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
                        placeholder={t('admin_messages_msgcard_placeholder')}
                        onChange={(e) => setResponse(e.target.value)}
                        value={response}
                    />
                </label>

                {displayWarning && (
                    <Paragraph style='regular--alert_bold'>{t('admin_messages_msgcard_warning')}</Paragraph>
                )}

                <Button theme='black--small' onClick={submitAnswer}>
                    {t('admin_messages_msgcard_submitbtn')}
                </Button>
            </form>
        </div>
    );
}
