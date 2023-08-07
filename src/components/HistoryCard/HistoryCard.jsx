import React from 'react';
import classNames from 'classnames/bind';
import styles from './history-card.module.scss';
import Heading from '../Heading/Heading';
import Paragraph from '../Paragraph/Paragraph';

const cn = classNames.bind(styles);

export default function HistoryCard({ history }) {
    return (
        <div className={cn('container')}>
            {history.img ? (
                <img src={`data:image/jpeg;base64,${history.img}`} alt='board game cover' className={cn('image')} />
            ) : (
                <img
                    src={require('../../assets/games/00-noimage.jpg')}
                    alt='board game cover'
                    className={cn('image')}
                />
            )}

            <div className={cn('game__container')}>
                <Heading tag='h3' style='medium'>
                    {history.title}
                </Heading>
                <div className={cn('info__container')}>
                    <Paragraph style='small'>{history.designer}</Paragraph>
                    <Paragraph style='small'>{history.publisher}</Paragraph>
                    <Paragraph style='small'>{history.category}</Paragraph>
                    <Paragraph style='small'>{history.complexity}</Paragraph>
                </div>

                <Paragraph style='regular'>{history.intro}</Paragraph>
                <span className={cn('line')}></span>
                <Paragraph style='regular'>{`Reserved: ${history.checkoutDate}`}</Paragraph>
                <Paragraph style='regular'>{`Returned: ${history.returnedDate}`}</Paragraph>
            </div>
        </div>
    );
}
