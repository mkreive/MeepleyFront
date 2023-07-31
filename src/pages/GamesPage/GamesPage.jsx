import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchData } from '../../utils/fetchData';
import classNames from 'classnames/bind';
import styles from './games-page.module.scss';
import SearchSection from '../../features/SearchSection/SearchSection';
import GamesSection from '../../features/GamesSection/GamesSection';
import Heading from '../../components/Heading/Heading';
import Paragraph from '../../components/Paragraph/Paragraph';
import Button from '../../components/Button/Button';

const cn = classNames.bind(styles);

export default function GamesPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [games, setGames] = useState([]);
    const [categories, setCategories] = useState([]);
    const [complexities, setComplexities] = useState([]);
    const [searchUrl, setSearchUrl] = useState('/api/games');

    const handleSearch = function (props) {
        const title = props.trim().toLowerCase();
        setSearchUrl(`api/games/search/findByTitle?title=${title}`);
    };

    const handleCategory = function (props) {
        const selected = props.toLowerCase();
        if (!categories.includes(selected)) {
            setCategories([...categories, selected]);
        } else {
            const newCategories = categories.filter((category) => category !== selected);
            setCategories(newCategories);
        }
        console.log(categories);
        setSearchUrl(`/api/games/search/findByCategory?category=${categories}`);
    };

    const handleComplexity = function (props) {
        const selected = props.toLowerCase();
        if (!complexities.includes(selected)) {
            setComplexities([...complexities, selected]);
        } else {
            const newComplexities = complexities.filter((category) => category !== selected);
            setCategories(newCategories);
        }

        setSearchUrl(`/api/games/search/findByComplexity?complexity=${complexities}`);
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

            <GamesSection loading={loading} error={error} games={games} />

            <div className={cn('text')}>
                <Heading tag='h2' style='medium--primary'>
                    Haven't find a game you were looking for?
                </Heading>
                <Paragraph theme='regular'>Write us a letter and we will help you!</Paragraph>
                <Link to='/services' className={cn('link')}>
                    <Button theme='secondary'>Services</Button>
                </Link>
            </div>

            <div>Latest reviews about our board games</div>
        </div>
    );
}
