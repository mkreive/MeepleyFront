import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import styles from './forum-section.module.scss';
import Heading from '../../components/Heading/Heading';
import Paragraph from '../../components/Paragraph/Paragraph';
import Button from '../../components/Button/Button';
import ForumImage from './ForumImage';

const cn = classNames.bind(styles);

export default function ForumSection() {
    const { t } = useTranslation();
    return (
        <div className={cn('container')}>
            <section className={cn('text')}>
                <Heading tag='h3' style='medium'>
                    {t('home_forum_heading')}
                </Heading>
                <Paragraph style='big--gray'>{t('home_forum_paragraph')}</Paragraph>
                <Link to='/forums' className={cn('link')}>
                    <Button theme='primary'>{t('home_forum_button')}</Button>
                </Link>
            </section>
            <ForumImage />
        </div>
    );
}
