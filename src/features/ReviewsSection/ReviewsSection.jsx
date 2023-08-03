import React, { useState, useEffect } from 'react';
import { fetchReviews } from '../../utils/fetchReviews';
import classNames from 'classnames/bind';
import styles from './reviews-section.module.scss';
import Loader from '../../components/Loader/Loader';
import Heading from '../../components/Heading/Heading';
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import SectionWithButton from '../../components/SectionWithButton/SectionWithButton';
import Paragraph from '../../components/Paragraph/Paragraph';

const cn = classNames.bind(styles);

export default function ReviewsSection({ gameId, isAuthenticated }) {
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
    }, []);

    // TODO Review rasymui bloka padaryti

    return (
        <section className={cn(`${!error ? 'wrapper__reviews' : 'hidden'}`)}>
            <Heading tag='h2' style='big--black'>
                Reviews
            </Heading>

            {loading && <Loader />}

            {reviews.length > 0 && !loading && reviews.map((r) => <ReviewCard key={r.id} review={r} />)}

            {reviews.length === 0 && !loading && <Paragraph style='regular'>No reviews yet..</Paragraph>}

            {!isAuthenticated && (
                <SectionWithButton
                    title='Want to leave your review?'
                    text='Sign in to be able to leave a review and use our services :)'
                    button='Sign up'
                    link='/login'
                />
            )}

            {/* {authState?.isAuthenticated && <ReviewField />} */}
        </section>
    );
}
