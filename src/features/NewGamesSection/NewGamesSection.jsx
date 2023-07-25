import React from 'react';
import classNames from 'classnames/bind';
import styles from './new-games-section.module.scss';
import Loader from '../../components/Loader/Loader';
import Heading from '../../components/Heading/Heading';
import GameBox from '../../components/GameBox/GameBox';

const cn = classNames.bind(styles);

export default function NewGamesSection(props) {
    // const { loading, data, error } = props;
    const { loading = false, error = false } = props;

    const data = [
        {
            name: 'Spirit Island',
            designer: 'R.Eric Reuss',
            description: 'Island Spirits join forces using elemental powers to defend their home from invaders.',
            rating: 8.4,
            category: 'STRATEGY',
            players: '1-4',
        },
        {
            name: 'Mage Knight',
            designer: 'Vlaada Chatil',
            description: 'Command armies, gather spells and artifacts as you conquer a fantasy land.',
            rating: 8.9,
            category: 'STRATEGY',
            players: '1-5',
        },
        {
            name: 'Keep the heroes out!',
            designer: 'Luis Brueh',
            description: 'As monsters, work together to defend your dungeon against so-called heroes.',
            rating: 8.0,
            category: 'THEMATIC',
            players: '1-4',
        },
    ];

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
