import React, { useState, useEffect } from 'react';
import { fetchGame } from '../../utils/fetchGame';
import { fetchReviews } from '../../utils/fetchReviews';
import classNames from 'classnames/bind';
import styles from './game-checkout-page.module.scss';
import Loader from '../../components/Loader/Loader';
import GameCard from '../../components/GameCard/GameCard';
import ReviewCard from '../../components/ReviewCard/ReviewCard';

const cn = classNames.bind(styles);

export default function GameCheckoutPage() {
    const [game, setGame] = useState({});
    const [reviews, setReviews] = useState([]);
    const [loadingGame, setLoadingGame] = useState(true);
    const [loadingReviews, setLoadingReviews] = useState(true);
    const [error, setError] = useState(false);

    const gameId = window.location.pathname.split('/')[2];

    useEffect(() => {
        const getGame = async function () {
            const fetchedGame = await fetchGame(`/api/games/${gameId}`);
            if (fetchedGame) {
                setLoadingGame(false);
                setGame(fetchedGame);
            } else {
                setError(fetchGame);
            }
        };
        getGame();
    }, []);

    useEffect(() => {
        const getReviews = async function () {
            const fetchedReviews = await fetchReviews(`/api/reviews/search/findByGameId?gameId=${gameId}`);
            if (fetchedReviews) {
                setLoadingReviews(false);
                setReviews(fetchedReviews);
            } else {
                setError(fetchedReviews);
            }
        };
        getReviews();
    }, []);

    console.log(reviews);

    return (
        <div className={cn('container')}>
            <section className={cn(`${!error ? 'wrapper__game' : 'hidden'}`)}>
                {loadingGame && <Loader />}
                <GameCard key={game.id} game={game} />
            </section>

            <section className={cn(`${!error ? 'wrapper__reviews' : 'hidden'}`)}>
                {loadingReviews && <Loader />}
                {reviews.map((review) => {
                    <ReviewCard key={review.id} review={review} />;
                })}
            </section>

            <div>Service section</div>
        </div>
    );
}
