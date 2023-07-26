import React from 'react';
import classNames from 'classnames/bind';
import styles from './new-games-section.module.scss';
import Loader from '../../components/Loader/Loader';
import Heading from '../../components/Heading/Heading';
import GameBox from '../../components/GameBox/GameBox';

const cn = classNames.bind(styles);

export default function NewGamesSection(props) {
    const { loading = false, data, error = false } = props;

    return (
        <section className={cn(`${!error ? 'container' : 'hidden'}`)}>
            <Heading tag='h2' style='big'>
                New Games
            </Heading>

            {loading && <Loader />}

            {!loading && !error && (
                <div className={cn('wrapper')}>
                    {data.map((game, index) => (
                        <GameBox key={index} game={game} />
                    ))}
                </div>
            )}
        </section>
    );
}
