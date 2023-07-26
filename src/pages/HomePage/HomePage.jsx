import React from 'react';
import { useFetchData } from '../../hooks/useFetchData';
import { filterNewGames } from '../../utils/filterNewGames';
import classNames from 'classnames/bind';
import styles from './home-page.module.scss';
import homeData from './homeData.json';
import Hero from '../../components/Hero/Hero';
import NewGamesSection from '../../features/NewGamesSection/NewGamesSection';

const cn = classNames.bind(styles);
const gamesUrl = '...';

export default function HomePage() {
    const { loading, error } = useFetchData(gamesUrl);
    const data = homeData.games;
    const newGames = filterNewGames(data, 3);
    console.log(newGames);

    return (
        <div className={cn('wrapper')}>
            <Hero />
            <NewGamesSection loading={loading} data={newGames} error={error} />
        </div>
    );
}
