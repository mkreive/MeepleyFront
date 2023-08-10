import React from 'react';
import classNames from 'classnames/bind';
import styles from './review-box.module.scss';
import Card from '../Card/Card';
import Heading from '../Heading/Heading';
import Paragraph from '../Paragraph/Paragraph';

const cn = classNames.bind(styles);

export default function ReviewBox({ review }) {
    return (
        <div className={cn('container')}>
            <Card>
                <div className={cn('headings')}>
                    <Heading tag='h4' style='medium--primary'>
                        {review.gameName}
                    </Heading>
                    <Heading tag='h5' style='small'>
                        {review.userName}
                    </Heading>
                </div>

                <Paragraph style='small'>{review.gameReview}</Paragraph>
            </Card>
        </div>
    );
}
