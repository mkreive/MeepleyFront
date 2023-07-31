import React, { useState, useEffect } from 'react';
import { fetchGame } from '../../utils/fetchGame';
import classNames from 'classnames/bind';
import styles from './game-checkout-page.module.scss';
import Loader from '../../components/Loader/Loader';
import GameCard from '../../components/GameCard/GameCard';

const cn = classNames.bind(styles);

export default function GameCheckoutPage() {
    const [game, setGame] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const gameId = window.location.pathname.split('/')[2];

    useEffect(() => {
        const getGame = async function () {
            const fetchedGame = await fetchGame(`/api/games/${gameId}`);
            if (fetchedGame) {
                setLoading(false);
                setGame(fetchedGame);
            } else {
                setError(fetchGame);
            }
        };
        getGame();
    }, []);

    return (
        <div className={cn('container')}>
            {loading && <Loader />}

            <section className={cn(`${!error ? 'wrapper' : 'hidden'}`)}>
                <GameCard key={game.id} game={game} />
            </section>

            <div> Reviews section</div>
            <div>Service section</div>
        </div>
    );
}
