import React, { useState, useEffect } from 'react';
import { useFetchGames } from '../../hooks/useFetchGames';
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
    const gameId = window.location.pathname.split('/')[2];

    useEffect(() => window.scrollTo(0, 0), []);

    return (
        <div className={cn('container')}>
            <GameCard gameId={gameId} authState={authState} />

            <ReviewsSection gameId={gameId} isAuthenticated={authState?.isAuthenticated} />

            <NewGamesSection loading={loading} error={error} games={games} />
        </div>
    );
}
