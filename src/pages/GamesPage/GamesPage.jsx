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
import qs from 'qs';

const cn = classNames.bind(styles);

export default function GamesPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [games, setGames] = useState([]);
    const [title, setTitle] = useState('');
    const [categories, setCategories] = useState([]);
    const [complexities, setComplexities] = useState([]);

    const handleSearch = function (props) {
        setTitle(props.trim().toLowerCase());
    };

    const handleCategory = function (props) {
        const selected = props.toLowerCase();
        if (!categories.includes(selected)) {
            setCategories([...categories, selected]);
        } else {
            const newCategories = categories.filter((category) => category !== selected);
            setCategories(newCategories);
        }
    };

    const handleComplexity = function (props) {
        const selected = props.toLowerCase();
        if (!complexities.includes(selected)) {
            setComplexities([...complexities, selected]);
        } else {
            const newComplexities = complexities.filter((complexity) => complexity !== selected);
            setComplexities(newComplexities);
        }
    };

    useEffect(() => {
        const params = {
            complexity: complexities,
            category: categories,
            title: title,
        };

        let url = '/api/games';

        if (complexities.length > 0 || categories.length > 0 || title.length > 0) {
            url = `/api/games/search/findGames${qs.stringify(params, {
                addQueryPrefix: true,
                arrayFormat: 'comma',
            })}`;
        }

        const getGames = async function () {
            const games = await fetchData(url);
            if (games) {
                setLoading(false);
                setGames(games);
            } else {
                setError(games);
            }
        };
        getGames();
        window.scrollTo(0, 0);
    }, [categories, complexities, title]);

    console.log(games);

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
