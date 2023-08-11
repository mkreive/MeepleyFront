import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchReviews } from '../../utils/fetchReviews';
import classNames from 'classnames/bind';
import styles from './reviews-section.module.scss';
import Loader from '../../components/Loader/Loader';
import Heading from '../../components/Heading/Heading';
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import SectionWithButton from '../../components/SectionWithButton/SectionWithButton';
import Paragraph from '../../components/Paragraph/Paragraph';

const cn = classNames.bind(styles);

export default function ReviewsSection({ gameId, authState, isReviewLeft }) {
    const { t } = useTranslation();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getReviews = async function () {
            const fetchedReviews = await fetchReviews(`/api/reviews/search/findByGameId?gameId=${gameId}`);
            if (fetchedReviews) {
                setLoading(false);
                setReviews(fetchedReviews);
            } else {
                setError(fetchedReviews);
            }
        };
        getReviews();
    }, [isReviewLeft]);

    return (
        <section className={cn(`${!error ? 'wrapper__reviews' : 'hidden'}`)}>
            <Heading tag='h2' style='big--black'>
                {t('checkout_reviews_heading')}
            </Heading>

            {loading && <Loader />}

            {reviews.length > 0 && !loading && reviews.map((r) => <ReviewCard key={r.id} review={r} />)}

            {reviews.length === 0 && !loading && (
                <Paragraph style='regular'>{t('checkout_reviews_noreviews')}</Paragraph>
            )}

            {!authState?.isAuthenticated && (
                <SectionWithButton
                    title={t('checkout_reviews_signinad_title')}
                    text={t('checkout_reviews_signinad_text')}
                    button={t('checkout_reviews_signinad_button')}
                    link='/login'
                />
            )}
        </section>
    );
}
