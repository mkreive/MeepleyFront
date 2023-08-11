import React from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import styles from './not-found-page.module.scss';
import NotFoundImage from './NotFoundImage';
import Heading from '../../components/Heading/Heading';
import { Link } from 'react-router-dom';

const cn = classNames.bind(styles);

export default function NotFoundPage() {
    const { t } = useTranslation();
    return (
        <div className={cn('container')}>
            <NotFoundImage />
            <Heading tag='h1' style='medium'>
                {t('notfoundpage_heading')}
            </Heading>
            <Heading tag='h2' style='small'>
                {t('notfoundpage_letsgetyou')}
                <Link to={'/home'} className={cn('link')}>
                    {t('notfoundpage_link')}
                </Link>
                .
            </Heading>
        </div>
    );
}
