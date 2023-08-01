import React, { useState, useEffect } from 'react';
import { fetchGames } from '../../utils/fetchGames';
import { useFetchReviews } from '../../hooks/useFetchReviews';
import classNames from 'classnames/bind';
import styles from './games-page.module.scss';
import SearchSection from '../../features/SearchSection/SearchSection';
import GamesSection from '../../features/GamesSection/GamesSection';
import SectionWithButton from '../../components/SectionWithButton/SectionWithButton';
import NewReviewsSection from '../../features/NewReviewsSection/NewReviewsSection';
import qs from 'qs';
import Button from '../../components/Button/Button';

const cn = classNames.bind(styles);

export default function GamesPage() {
    const { loadingReviews, reviews, errorReviews } = useFetchReviews('/api/reviews');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [games, setGames] = useState([]);
    const [title, setTitle] = useState('');
    const [categories, setCategories] = useState([]);
    const [complexities, setComplexities] = useState([]);

    // TODO pagination sutvarkyti

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

    const handleClearFilters = function () {
        // TODO checkboxus panaikinti isclearinus filtrus
        setCategories([]);
        setComplexities([]);
        setTitle('');
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
            const games = await fetchGames(url);
            if (games) {
                setLoading(false);
                setGames(games);
            } else {
                setError(games);
            }
        };
        getGames();
    }, [categories, complexities, title]);

    return (
        <div className={cn('wrapper')}>
            <SearchSection
                onSearch={handleSearch}
                onCategorySelection={handleCategory}
                onComplexitySelection={handleComplexity}
            />

            <GamesSection loading={loading} error={error} games={games} />

            {(categories.length > 0 || complexities.length > 0 || title) && (
                <Button theme='black' onClick={handleClearFilters}>
                    Clear all filters
                </Button>
            )}

            <SectionWithButton
                title="Haven't find what you were looking for?"
                text='Write us a letter and we will help you!'
                button='Services'
                link='/services'
            />

            {reviews.length > 0 && (
                <NewReviewsSection error={errorReviews} loading={loadingReviews} reviews={reviews} />
            )}
        </div>
    );
}
