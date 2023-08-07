import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './reservation-card.module.scss';
import Heading from '../Heading/Heading';
import Paragraph from '../Paragraph/Paragraph';
import Button from '../Button/Button';

const cn = classNames.bind(styles);

export default function ReservationCard(props) {
    const { game, daysLeft, onReturnGame, onRenewLoan } = props;

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

            <div className={cn('game__container')}>
                <Heading tag='h3' style='medium'>
                    {game.title}
                </Heading>
                <div className={cn('info__container')}>
                    <Paragraph style='small'>{game.designer}</Paragraph>
                    <Paragraph style='small'>{game.publisher}</Paragraph>
                    <Paragraph style='small'>{game.players}</Paragraph>
                    <Paragraph style='small'>{game.playingTime}</Paragraph>
                </div>
                <Paragraph style='regular'>{game.intro}</Paragraph>
                <Link to={`/checkout/${game.id}`} className={cn('link')}>
                    <Button theme='black'>Details</Button>
                </Link>
            </div>

            <div className={cn('loans__container')}>
                <Paragraph style='small'>{`Due in ${daysLeft} days`}</Paragraph>
                <Button theme='black--small' onClick={() => onReturnGame(game.id)}>
                    Return game
                </Button>
                <span className={cn('line')}></span>

                <Paragraph style='small'>
                    {daysLeft < 0 ? 'Late dues cannot be renewed' : 'Renew your loan for 7 days'}
                </Paragraph>
                <Button theme={daysLeft < 0 ? 'disabled' : 'black--small'} onClick={() => onRenewLoan(game.id)}>
                    Renew loan
                </Button>
                <span className={cn('line')}></span>

                <Paragraph style='small'>Help others by reviewing your recent loan.</Paragraph>
                <Link className={cn('link')} to={`/checkout/${game.id}`}>
                    <Button theme='black--small'>Leave a review</Button>
                </Link>
            </div>
        </div>
    );
}
