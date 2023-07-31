import React from 'react';
import classNames from 'classnames/bind';
import styles from './review-card.module.scss';
import Heading from '../Heading/Heading';
import Paragraph from '../Paragraph/Paragraph';

const cn = classNames.bind(styles);

export default function ReviewCard({ review }) {
    console.log(review);
    return (
        <div className={cn('container')}>
            <div className={cn('upper_block')}>
                <Paragraph style='medium'>{review.date}</Paragraph>
                <Heading tag='h3' style='small--primary'>
                    {review.userEmail}
                </Heading>
            </div>

            <div className={cn('bottom_block')}>
                <Paragraph style='regular--gray'>{review.gameReview}</Paragraph>
            </div>
        </div>
    );
}
