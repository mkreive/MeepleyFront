import React, { useState, useEffect } from 'react';
import { fetchGames } from '../../utils/fetchGames';
import { useTranslation } from 'react-i18next';
import { useFetchReviews } from '../../hooks/useFetchReviews';
import classNames from 'classnames/bind';
import styles from './games-page.module.scss';
import SearchSection from '../../features/SearchSection/SearchSection';
import GamesSection from '../../features/GamesSection/GamesSection';
import SectionWithButton from '../../components/SectionWithButton/SectionWithButton';
import NewReviewsSection from '../../features/NewReviewsSection/NewReviewsSection';
import qs from 'qs';

import { useOktaAuth } from '@okta/okta-react';

const cn = classNames.bind(styles);

export default function GamesPage() {
    const { t } = useTranslation();
    const { authState } = useOktaAuth();
    const { loadingReviews, reviews, errorReviews } = useFetchReviews('/api/reviews');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [games, setGames] = useState([]);
    const [title, setTitle] = useState(null);
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

        const url = `/api/games/search/findGames${qs.stringify(params, {
            addQueryPrefix: true,
            arrayFormat: 'comma',
            encode: false,
            skipNulls: true,
        })}`;

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
                selectedCategories={categories}
            />

            <GamesSection loading={loading} error={error} games={games} />

            {authState?.isAuthenticated ? (
                <SectionWithButton
                    title={t('games_ad_services_title')}
                    text={t('games_ad_services_text')}
                    button={t('games_ad_services_button')}
                    link='/services'
                />
            ) : (
                <SectionWithButton
                    title={t('games_ad_signin_title')}
                    text={t('games_ad_signin_text')}
                    button={t('games_ad_signin_button')}
                    link='/login'
                />
            )}

            {reviews.length > 0 && (
                <NewReviewsSection error={errorReviews} loading={loadingReviews} reviews={reviews} />
            )}
        </div>
    );
}
