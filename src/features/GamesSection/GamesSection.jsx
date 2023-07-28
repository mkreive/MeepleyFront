import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './games-section.module.scss';
import Heading from '../../components/Heading/Heading';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import GameBox from '../../components/GameBox/GameBox';

const cn = classNames.bind(styles);

export default function GamesSection(props) {
    const { loading, error, games, category } = props;
    return (
        <div className={cn('container')}>
            <Heading tag='h4' style='medium'>
                {category ? category + 'Board Games' : 'All Board Games'}
            </Heading>

            {loading && <Loader />}

            <section className={cn(`${!error ? 'wrapper' : 'hidden'}`)}>
                {games.map((game, index) => (
                    <GameBox key={index} game={game} />
                ))}
            </section>
        </div>
    );
}
