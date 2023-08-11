import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import styles from './services-section.module.scss';
import Heading from '../../components/Heading/Heading';
import Paragraph from '../../components/Paragraph/Paragraph';
import Button from '../../components/Button/Button';
import ServicesImage from './ServicesImage';

const cn = classNames.bind(styles);

export default function ServicesSection(props) {
    const { t } = useTranslation();
    return (
        <div className={cn('container')}>
            <ServicesImage />
            <section className={cn('text')}>
                <Heading tag='h3' style='medium'>
                    {t('home_services_heading')}
                </Heading>
                <Paragraph style='big--gray'>{t('home_services_paragraph')}</Paragraph>
                <Paragraph style='big--gray'>{t('home_services_paragraph_bottom')}</Paragraph>

                {props.isAuthenticated ? (
                    <Link to='/account' className={cn('link')}>
                        <Button theme='primary'>{t('home_services_button2')}</Button>
                    </Link>
                ) : (
                    <Link to='/login' className={cn('link')}>
                        <Button theme='primary'>{t('home_services_button')}</Button>
                    </Link>
                )}
            </section>
        </div>
    );
}
