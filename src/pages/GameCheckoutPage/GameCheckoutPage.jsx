import React, { useState, useEffect } from 'react';
import { useFetchGames } from '../../hooks/useFetchGames';
import { fetchData } from '../../utils/fetchData';
import classNames from 'classnames/bind';
import styles from './game-checkout-page.module.scss';
import GameCard from '../../components/GameCard/GameCard';
import NewGamesSection from '../../features/NewGamesSection/NewGamesSection';
import { useOktaAuth } from '@okta/okta-react';
import ReviewsSection from '../../features/ReviewsSection/ReviewsSection';

const cn = classNames.bind(styles);

export default function GameCheckoutPage() {
    const { authState } = useOktaAuth();
    const { loading, games, error } = useFetchGames('/api/games');
    const [reviewLeft, setReviewLeft] = useState(false);
    const [loadingUserReview, setLoadingUserReview] = useState(true);
    const gameId = window.location.pathname.split('/')[2];

    useEffect(() => window.scrollTo(0, 0), []);

    useEffect(() => {
        const getUserReview = async function () {
            if (authState && authState?.isAuthenticated) {
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json',
                    },
                };
                const fetchedUserReview = await fetchData(
                    `/api/reviews/secure/user/game?gameId=${gameId}`,
                    requestOptions
                );

                if (fetchedUserReview) {
                    setLoadingUserReview(false);
                    setReviewLeft(fetchedUserReview);
                } else {
                    setError(fetchedUserReview);
                }
            }
        };
        getUserReview();
    }, []);

    return (
        <div className={cn('container')}>
            <GameCard gameId={gameId} authState={authState} isReviewLeft={reviewLeft} />

            <ReviewsSection gameId={gameId} authState={authState} isReviewLeft={reviewLeft} />

            <NewGamesSection loading={loading} error={error} games={games} />
        </div>
    );
}
