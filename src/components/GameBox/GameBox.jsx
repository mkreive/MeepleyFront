import React from 'react';
import classNames from 'classnames/bind';
import styles from './game-box.module.scss';
import Heading from '../Heading/Heading';
import Paragraph from '../Paragraph/Paragraph';
import Card from '../Card/Card';

const cn = classNames.bind(styles);

export default function GameBox(props) {
    const { game } = props;
    console.log(game);

    return (
        <Card>
            <Heading tag='h3' style='small'>
                Game
            </Heading>
            <img
                src={require('../../assets/games/01-spiritisland.jpg')}
                alt='board game image'
                className={cn('image')}
            />
            <div className={cn('text-container')}>
                <Paragraph style='colored'>{game.name}</Paragraph>
            </div>
            <div className={cn('heading-container')}>
                <Heading tag='h4' style='small'>
                    {game.designer}
                </Heading>
                <Heading tag='h5' style='very-small--primary'>
                    {game.category}
                </Heading>
            </div>
        </Card>
    );
}
