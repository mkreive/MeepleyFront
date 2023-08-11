import React from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import styles from './message-card.module.scss';
import Paragraph from '../Paragraph/Paragraph';
import Heading from '../Heading/Heading';

const cn = classNames.bind(styles);

export default function MessageCard({ message }) {
    const { t } = useTranslation();

    return (
        <div className={cn('container')}>
            <div className={cn('group')}>
                <Heading tag='h4' style='small'>
                    {t('account_messsages_msccard_case')}
                    {`${message.id}: ${message.title} |`}
                </Heading>
                <Heading tag='h5' style='very-very-small'>
                    {message.userEmail}
                </Heading>
            </div>

            <div className={cn('group--other')}>
                <Heading tag='h6' style='small--gray'>
                    {t('account_messsages_msccard_title')}
                </Heading>
                <Paragraph style='regular--gray'>{message.question}</Paragraph>
            </div>

            <span className={cn('line')}></span>

            <div className={cn('group--other')}>
                <Heading tag='h6' style='small--secondary'>
                    {t('account_messsages_msccard_title2')}
                </Heading>

                {message.response && message.adminEmail && (
                    <>
                        <Heading tag='h5' style='very-small--black'>
                            {message.adminEmail}
                        </Heading>
                        <Paragraph style='regular'>{message.response}</Paragraph>
                    </>
                )}

                {!message.response && <Paragraph style='regular'>{t('account_messsages_msccard_paragraph')}</Paragraph>}
            </div>
        </div>
    );
}
