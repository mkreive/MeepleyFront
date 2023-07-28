import React, { useState } from 'react';
import { useFetchGames } from '../../hooks/useFetchGames';
import classNames from 'classnames/bind';
import styles from './games-page.module.scss';

import SearchSection from '../../features/SearchSection/SearchSection';
import GamesSection from '../../features/GamesSection/GamesSection';

const cn = classNames.bind(styles);
const gamesUrl = '/api/games';

export default function GamesPage() {
    const { loading, games, error } = useFetchGames(gamesUrl);
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleSearch = function (props) {};

    return (
        <div className={cn('wrapper')}>
            <SearchSection onChange={handleSearch} />
            <GamesSection loading={loading} error={error} category={selectedCategory} games={games} />
            {/* <LatestReviewsSection/>
            <NewsletterSection/> */}
        </div>
    );
}
