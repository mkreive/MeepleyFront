import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import styles from './explore-section.module.scss';
import Heading from '../../components/Heading/Heading';
import Paragraph from '../../components/Paragraph/Paragraph';
import Button from '../../components/Button/Button';

const cn = classNames.bind(styles);

export default function ExploreSection() {
    const { t } = useTranslation();
    return (
        <div className={cn('container')}>
            <section className={cn('text')}>
                <Heading tag='h3' style='medium'>
                    {t('home_explore_heading')}
                </Heading>
                <Paragraph style='big--gray'>{t('home_explore_paragraph')}</Paragraph>
                <Link to='/games' className={cn('link')}>
                    <Button theme='tertiary'>{t('home_explore_button')}</Button>
                </Link>
            </section>
        </div>
    );
}
