import React, { useState, useEffect } from 'react';
import { useFetchGames } from '../../hooks/useFetchGames';
import { fetchData } from '../../utils/fetchData';
import classNames from 'classnames/bind';
import styles from './games-page.module.scss';
import SearchSection from '../../features/SearchSection/SearchSection';
import GamesSection from '../../features/GamesSection/GamesSection';

const cn = classNames.bind(styles);

export default function GamesPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [games, setGames] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedComplexity, setSelectedComplexxity] = useState('');
    const [searchUrl, setSearchUrl] = useState('/api/games');

    const handleSearch = function (props) {
        const searchedTitle = props.trim().toLowerCase();
        setSearchUrl(`api/games/search/findByTitle?title=${searchedTitle}`);
    };

    const handleCategory = function (props) {
        setSelectedCategory(props);
        setSearchUrl(`/api/games/search/findByCategory?category=${props}`);
    };

    const handleComplexity = function (props) {
        setSearchUrl(`/api/games/search/findByComplexity?complexity=${medium}`);
    };

    useEffect(() => {
        const getGames = async function () {
            const games = await fetchData(searchUrl);
            if (games) {
                setLoading(false);
                setGames(games);
            } else {
                setError(games);
            }
        };
        getGames();
        window.scrollTo(0, 0);
    }, [searchUrl]);

    return (
        <div className={cn('wrapper')}>
            <SearchSection
                onSearch={handleSearch}
                onCategorySelection={handleCategory}
                onComplexitySelection={handleComplexity}
            />

            <GamesSection loading={loading} error={error} category={selectedCategory} games={games} />

            <div>Havent find a game you were looking for? Write us a letter!</div>
            <div>Latest reviews about our board games</div>
            <div>Sign up for newsleter</div>
        </div>
    );
}
