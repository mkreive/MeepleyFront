import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import styles from './reservation-card.module.scss';
import Heading from '../Heading/Heading';
import Paragraph from '../Paragraph/Paragraph';
import Button from '../Button/Button';

const cn = classNames.bind(styles);

export default function ReservationCard(props) {
    const { game, daysLeft, onReturnGame, onRenewLoan } = props;
    const { t } = useTranslation();

    return (
        <div className={cn('container')}>
            <div className={cn('game__container')}>
                {game.img ? (
                    <img src={`data:image/jpeg;base64,${game.img}`} alt='board game cover' className={cn('image')} />
                ) : (
                    <img
                        src={require('../../assets/games/00-noimage.jpg')}
                        alt='board game cover'
                        className={cn('image')}
                    />
                )}

                <div className={cn('about-game-container')}>
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
                        <Button theme='black'>{t('account_reservations_card_detailsbtn')}</Button>
                    </Link>
                </div>
            </div>

            <div className={cn('loans__container')}>
                <Paragraph style='small'>
                    {t('account_reservations_due')}
                    {daysLeft}
                    {daysLeft === 1 ? t('account_reservations_day') : t('account_reservations_days')}
                </Paragraph>
                <Button theme='black--small' onClick={() => onReturnGame(game.id)}>
                    {t('account_reservations_card_returnbtn')}
                </Button>
                <span className={cn('line')}></span>

                <Paragraph style='small'>
                    {daysLeft < 0 ? t('account_reservations_card_latedues') : t('account_reservations_card_renew')}
                </Paragraph>
                <Button theme={daysLeft < 0 ? 'disabled' : 'black--small'} onClick={() => onRenewLoan(game.id)}>
                    {t('account_reservations_card_renewloanbtn')}
                </Button>
                <span className={cn('line')}></span>

                <Paragraph style='small'>{t('account_reservations_card_helpothers')}</Paragraph>
                <Link className={cn('link')} to={`/checkout/${game.id}`}>
                    <Button theme='black--small'>{t('account_reservations_card_leavereviewbtn')}</Button>
                </Link>
            </div>
        </div>
    );
}
