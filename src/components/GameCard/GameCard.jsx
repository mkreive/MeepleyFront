import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './game-card.module.scss';
import { fetchGame } from '../../utils/fetchGame';
import Heading from '../Heading/Heading';
import Paragraph from '../Paragraph/Paragraph';
import CheckoutBox from '../CheckoutBox/CheckoutBox';
import Loader from '../Loader/Loader';

const cn = classNames.bind(styles);

export default function GameCard({ gameId, authState, isReviewLeft, onReviewSubmit }) {
    const [game, setGame] = useState({});
    const [loading, setLoading] = useState(true);
    const [gameReserved, setGameReserved] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getGame = async function () {
            const fetchedGame = await fetchGame(`/api/games/${gameId}`);
            if (fetchedGame) {
                setLoading(false);
                setGame(fetchedGame);
            } else {
                setError(fetchedGame);
            }
        };
        getGame();
    }, [gameReserved]);

    return (
        <div className={cn('container')}>
            {loading && <Loader />}

            {!error && !loading && (
                <div className={cn('game__wrapper')}>
                    {game.img ? (
                        <img
                            src={`data:image/jpeg;base64,${game.img}`}
                            alt='board game cover'
                            className={cn('image')}
                        />
                    ) : (
                        <img
                            src={require('../../assets/games/00-noimage.jpg')}
                            alt='board game cover'
                            className={cn('image')}
                        />
                    )}
                    <div className={cn('text-container')}>
                        <div className={cn('headings__container')}>
                            <Heading tag='h1' style='big--black'>
                                {game.title}
                            </Heading>
                            <Heading tag='h2' style='very-small--black'>
                                {game.designer}
                            </Heading>
                            <Heading tag='h2' style='very-small--black'>
                                {game.publisher}
                            </Heading>
                        </div>

                        <div className={cn('headings__container')}>
                            <Paragraph style='small--gray'>CATEGORY: {game.category.toLowerCase()}</Paragraph>
                            <Paragraph style='small--gray'>COMPLEXITY: {game.complexity}</Paragraph>
                            <Paragraph style='small--gray'>PLAYERS: {game.players}</Paragraph>
                            <Paragraph style='small--gray'>PLAY TIME: {game.playingTime} min</Paragraph>
                        </div>

                        <Paragraph style='regular'>{game.description}</Paragraph>
                    </div>
                </div>
            )}

            <CheckoutBox
                copies={game.copies}
                copiesAvailable={game.copiesAvailable}
                authState={authState}
                gameId={gameId}
                onCheckout={() => setGameReserved(true)}
                isReviewLeft={isReviewLeft}
                onReviewSubmit={onReviewSubmit}
            />
        </div>
    );
}
