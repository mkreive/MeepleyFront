import React from 'react';
import { useFetchGames } from '../../hooks/useFetchGames';
import classNames from 'classnames/bind';
import styles from './home-page.module.scss';
import Hero from '../../components/Hero/Hero';
import NewGamesSection from '../../features/NewGamesSection/NewGamesSection';
import SignupSection from '../../features/SignupSection/SignupSection';
import ServicesSection from '../../features/ServicesSection/ServicesSection';
import ForumSection from '../../features/ForumSection/ForumSection';
import ExploreSection from '../../features/ExploreSection/ExploreSection';
import { useOktaAuth } from '@okta/okta-react';

const cn = classNames.bind(styles);
const gamesUrl = '/api/games';

export default function HomePage() {
    const { authState } = useOktaAuth();
    const { loading, games, error } = useFetchGames(gamesUrl);

    return (
        <div className={cn('wrapper')}>
            <Hero />
            <NewGamesSection loading={loading} games={games} error={error} />
            <SignupSection isAuthenticated={authState?.isAuthenticated} />
            <ServicesSection isAuthenticated={authState?.isAuthenticated} />
            <ForumSection />
            <ExploreSection />
        </div>
    );
}
