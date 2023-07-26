import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './new-games-section.module.scss';
import Loader from '../../components/Loader/Loader';
import Heading from '../../components/Heading/Heading';
import Carousel from '../../components/Carousel/Carousel';

const cn = classNames.bind(styles);

export default function NewGamesSection(props) {
    const { loading = false, data, error = false } = props;

    return (
        <section className={cn(`${!error ? 'container' : 'hidden'}`)}>
            <Heading tag='h2' style='big'>
                New Games
            </Heading>

            {loading && <Loader />}

            {!loading && !error && <Carousel items={data} loading={loading} error={error} />}
        </section>
    );
}
