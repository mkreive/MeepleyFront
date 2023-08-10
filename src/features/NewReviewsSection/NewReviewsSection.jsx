import React from 'react';
import classNames from 'classnames/bind';
import styles from './new-reviews-section.module.scss';
import Loader from '../../components/Loader/Loader';
import Heading from '../../components/Heading/Heading';
import ReviewBox from '../../components/ReviewBox/ReviewBox';

const cn = classNames.bind(styles);

export default function NewReviewsSection(props) {
    const { loading, reviews, error } = props;
    const latestReviews = reviews.slice(-3);

    return (
        <section className={cn(`${!error ? 'container' : 'hidden'}`)}>
            <Heading tag='h2' style='medium'>
                Latest Reviews
            </Heading>

            <section className={cn(`${!error ? 'wrapper' : 'hidden'}`)}>
                {loading && <Loader />}
                {!loading && latestReviews.length > 0 && latestReviews.map((r) => <ReviewBox key={r.id} review={r} />)}
            </section>
        </section>
    );
}
