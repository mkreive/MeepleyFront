import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './reservation-card.module.scss';
import Heading from '../Heading/Heading';
import Paragraph from '../Paragraph/Paragraph';
import Button from '../Button/Button';

const cn = classNames.bind(styles);

export default function ReservationCard(props) {
    const { game, daysLeft } = props;

    console.log(game);
    console.log(daysLeft);

    return (
        <div className={cn('container')}>
            {game.img ? (
                <img src={`data:image/jpeg;base64,${game.img}`} alt='board game cover' className={cn('image')} />
            ) : (
                <img
                    src={require('../../assets/games/00-noimage.jpg')}
                    alt='board game cover'
                    className={cn('image')}
                />
            )}

            <div className={cn('loans__container')}>
                <Heading tag='h3' style='medium'>
                    {game.title}
                </Heading>
                <Paragraph style='regular'>{game.intro}</Paragraph>
                <span className={cn('line')}></span>

                <Paragraph style='regular'>{`DAYS LEFT: ${daysLeft} days`}</Paragraph>
                <div className={cn('buttons__group')}>
                    <Button theme='black'>Return Game</Button>
                    <Button theme='black'>Renew loan for 7 days</Button>
                </div>
                <span className={cn('line')}></span>

                <Paragraph style='regular'>Help others by reviewing your recent loan.</Paragraph>
                <Link className={cn('link')} to={`/checkout/${game.id}`}>
                    <Button theme='black'>Leave a review</Button>
                </Link>
            </div>
        </div>
    );
}
