import React from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import styles from './new-games-section.module.scss';
import Loader from '../../components/Loader/Loader';
import Heading from '../../components/Heading/Heading';
import Carousel from '../../components/Carousel/Carousel';

const cn = classNames.bind(styles);

export default function NewGamesSection(props) {
    const { loading, games, error } = props;
    const { t } = useTranslation();

    return (
        <section className={cn(`${!error ? 'container' : 'hidden'}`)}>
            <Heading tag='h2' style='big'>
                {t('home_newgames_heading')}
            </Heading>

            {loading && <Loader />}

            {!loading && !error && <Carousel items={games} />}
        </section>
    );
}
