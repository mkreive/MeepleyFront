import React, { useState, useEffect } from 'react';
import { fetchGame } from '../../utils/fetchGame';
import { fetchReviews } from '../../utils/fetchReviews';
import { useFetchGames } from '../../hooks/useFetchGames';
import classNames from 'classnames/bind';
import styles from './game-checkout-page.module.scss';
import Loader from '../../components/Loader/Loader';
import Heading from '../../components/Heading/Heading';
import GameCard from '../../components/GameCard/GameCard';
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import SectionWithButton from '../../components/SectionWithButton/SectionWithButton';
import NewGamesSection from '../../features/NewGamesSection/NewGamesSection';

const cn = classNames.bind(styles);

export default function HomePage() {
    const { loading, games, error } = useFetchGames('/api/games');
    const [game, setGame] = useState({});
    const [reviews, setReviews] = useState([]);
    const [loadingGame, setLoadingGame] = useState(true);
    const [loadingReviews, setLoadingReviews] = useState(true);
    const [gameError, setGameError] = useState(false);
    const [reviewsError, setReviewsError] = useState(false);

    const gameId = window.location.pathname.split('/')[2];

    useEffect(() => {
        const getGame = async function () {
            const fetchedGame = await fetchGame(`/api/games/${gameId}`);
            if (fetchedGame) {
                setLoadingGame(false);
                setGame(fetchedGame);
            } else {
                setGameError(fetchedGame);
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
                setReviewsError(fetchedReviews);
            }
        };
        getReviews();
    }, []);

    return (
        <div className={cn('container')}>
            <section className={cn(`${!gameError ? 'wrapper__game' : 'hidden'}`)}>
                {loadingGame && <Loader />}
                {!loadingGame && <GameCard key={game.id} game={game} />}
            </section>
            <section className={cn(`${!reviewsError ? 'wrapper__reviews' : 'hidden'}`)}>
                <Heading tag='h2' style='big--black'>
                    Reviews
                </Heading>
                {loadingReviews && <Loader />}

                {reviews.length > 0 && !loadingReviews && reviews.map((r) => <ReviewCard key={r.id} review={r} />)}

                <SectionWithButton
                    title='Want to leave your review?'
                    text='Sign in to be able to leave a review and use our services :)'
                    button='Sign up'
                    link='/login'
                />
            </section>

            <NewGamesSection loading={loading} error={error} games={games} />
        </div>
    );
}
