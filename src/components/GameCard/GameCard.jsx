import React from 'react';
import classNames from 'classnames/bind';
import styles from './game-card.module.scss';
import Heading from '../Heading/Heading';
import Paragraph from '../Paragraph/Paragraph';
import CheckoutBox from '../CheckoutBox/CheckoutBox';

const cn = classNames.bind(styles);

export default function GameCard(props) {
    const { game, loadingGame, loans, loadingLoans } = props;

    return (
        <div className={cn('container')}>
            {loadingGame && <Loader />}

            {!loadingGame && game.img ? (
                <img src={`data:image/jpeg;base64,${game.img}`} alt='board game cover' className={cn('image')} />
            ) : (
                <img
                    src={require('../../assets/games/00-noimage.jpg')}
                    alt='board game cover'
                    className={cn('image')}
                />
            )}

            {!loadingGame && (
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
            )}

            <CheckoutBox
                copies={game.copies}
                copiesAvailable={game.copiesAvailable}
                loans={loans}
                loading={loadingLoans}
            />
        </div>
    );
}
