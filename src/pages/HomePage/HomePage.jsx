import React from 'react';
import { useFetchData } from '~/hooks';
import { filterNewGames } from '~/utils';
import classNames from 'classnames/bind';
import styles from './home-page.module.scss';
import Hero from '../../components/Hero/Hero';
import NewGamesSection from '../../features/NewGamesSection/NewGamesSection';

const cn = classNames.bind(styles);
const gamesUrl = '...';

export default function HomePage() {
    const { loading, data, error } = useFetchData(gamesUrl);
    const newGames = filterNewGames(data, 3);

    return (
        <div className={cn('wrapper')}>
            <Hero />
            <NewGamesSection loading={loading} data={newGames} error={error} />
        </div>
    );
}
