import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import styles from './signup-section.module.scss';
import Heading from '../../components/Heading/Heading';
import Paragraph from '../../components/Paragraph/Paragraph';
import Button from '../../components/Button/Button';
import SignupImage from './SignupImage';

const cn = classNames.bind(styles);

export default function SignupSection(props) {
    const { t } = useTranslation();
    return (
        <div className={cn('container')}>
            <section className={cn('text')}>
                <Heading tag='h3' style='medium'>
                    {t('home_signup_heading')}
                </Heading>
                <Paragraph style='big--gray'>{t('home_signup_paragraph')}</Paragraph>
                <Paragraph style='big--gray'>{t('home_signup_paragraph_bottom')}</Paragraph>

                {!props.isAuthenticated && (
                    <Link to='/login' className={cn('link')}>
                        <Button theme='secondary'>{t('home_signup_button')}</Button>
                    </Link>
                )}
            </section>
            <SignupImage />
        </div>
    );
}
