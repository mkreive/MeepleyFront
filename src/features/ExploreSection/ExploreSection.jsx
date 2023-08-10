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
                    Explore Our Collection
                </Heading>
                <Paragraph style='big--gray'>
                    Dive into our extensive collection of board games from various genres, eras, and complexities. From
                    classic strategy games to modern cooperative adventures, we've curated a diverse assortment to cater
                    to all tastes. Discover new games or revisit old favorites – the choice is yours!
                </Paragraph>

                <Link to='/games' className={cn('link')}>
                    <Button theme='tertiary'>Explore all games</Button>
                </Link>
            </section>
        </div>
    );
}
