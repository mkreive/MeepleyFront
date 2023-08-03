import React, { useState, useEffect } from 'react';
import { fetchGame } from '../../utils/fetchGame';
import { fetchReviews } from '../../utils/fetchReviews';
import { fetchLoans } from '../../utils/fetchLoans';
import { fetchCheckout } from '../../utils/fetchCheckout';
import { useFetchGames } from '../../hooks/useFetchGames';
import classNames from 'classnames/bind';
import styles from './game-checkout-page.module.scss';
import Loader from '../../components/Loader/Loader';
import Heading from '../../components/Heading/Heading';
import GameCard from '../../components/GameCard/GameCard';
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import SectionWithButton from '../../components/SectionWithButton/SectionWithButton';
import NewGamesSection from '../../features/NewGamesSection/NewGamesSection';
import { useOktaAuth } from '@okta/okta-react';

const cn = classNames.bind(styles);

export default function HomePage() {
    const { authState } = useOktaAuth();
    const { loading, games, error } = useFetchGames('/api/games');

    const gameId = window.location.pathname.split('/')[2];
    const [game, setGame] = useState({});
    const [loadingGame, setLoadingGame] = useState(true);
    const [gameError, setGameError] = useState(false);

    const [reviews, setReviews] = useState([]);
    const [loadingReviews, setLoadingReviews] = useState(true);
    const [reviewsError, setReviewsError] = useState(false);

    const [loans, setLoans] = useState(0);
    const [loadingLoans, setLoadingLoans] = useState(true);
    const [loansError, setLoansError] = useState(false);

    const [checkout, setCheckout] = useState(false);
    const [loadingCheckout, setLoadingCheckout] = useState(true);
    const [checkoutError, setCheckoutError] = useState(false);

    // console.log(authState);

    // GAME
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

    // REVIEWS
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

    // LOANS
    useEffect(() => {
        const getLoans = async function () {
            if (authState && authState.isAuthenticated) {
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json',
                    },
                };
                const fetchedLoans = await fetchLoans(`/api/games/secure/currentloans/count`, requestOptions);
                if (fetchedLoans) {
                    setLoadingLoans(false);
                    setLoans(fetchedLoans);
                } else {
                    setLoansError(fetchedLoans);
                }
            }
        };
        getLoans();
    }, []);

    // CHECKOUT
    useEffect(() => {
        const getCheckout = async function () {
            if (authState && authState.isAuthenticated) {
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json',
                    },
                };
                const fetchedCheckout = await fetchCheckout(
                    `/api/games/secure/ischeckedout/byuser/?gameId=${gameId}`,
                    requestOptions
                );
                if (fetchedCheckout) {
                    setLoadingCheckout(false);
                    setCheckout(fetchedCheckout);
                } else {
                    setCheckoutError(fetchedCheckout);
                }
            }
        };
        getCheckout();
    }, []);

    return (
        <div className={cn('container')}>
            <section className={cn(`${!gameError ? 'wrapper__game' : 'hidden'}`)}>
                <GameCard
                    key={game.id}
                    game={game}
                    loadingGame={loadingGame}
                    loans={loans}
                    loadingLoans={loadingLoans}
                    checkout={checkout}
                    loadingCheckout={loadingCheckout}
                    isAuthenticated={authState?.isAuthenticated}
                />
            </section>

            <section className={cn(`${!reviewsError ? 'wrapper__reviews' : 'hidden'}`)}>
                <Heading tag='h2' style='big--black'>
                    Reviews
                </Heading>
                {loadingReviews && <Loader />}

                {reviews.length > 0 && !loadingReviews && reviews.map((r) => <ReviewCard key={r.id} review={r} />)}

                {!authState?.isAuthenticated && (
                    <SectionWithButton
                        title='Want to leave your review?'
                        text='Sign in to be able to leave a review and use our services :)'
                        button='Sign up'
                        link='/login'
                    />
                )}

                {/* {authState?.isAuthenticated && <ReviewField />} */}
            </section>

            <NewGamesSection loading={loading} error={error} games={games} />
        </div>
    );
}
