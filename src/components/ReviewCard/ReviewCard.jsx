import React from 'react';
import classNames from 'classnames/bind';
import styles from './review-card.module.scss';
import Heading from '../Heading/Heading';
import Paragraph from '../Paragraph/Paragraph';

const cn = classNames.bind(styles);

export default function ReviewCard({ review }) {
    return (
        <div className={cn('container')}>
            <div className={cn('upper_block')}>
                <Paragraph style='regular--gray'>{review.date}</Paragraph>
                <Heading tag='h3' style='small--'>
                    {review.userName}
                </Heading>
            </div>

            <div className={cn('bottom_block')}>
                <Paragraph style='regular'>{review.gameReview}</Paragraph>
            </div>
        </div>
    );
}
