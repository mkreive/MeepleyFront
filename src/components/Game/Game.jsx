import React from 'react';
import classNames from 'classnames/bind';
import styles from './game.module.scss';
import Heading from '../Heading/Heading';
import Paragraph from '../Paragraph/Paragraph';
import Card from '../Card/Card';
import Button from '../Button/Button';

const cn = classNames.bind(styles);

export default function GameBox(props) {
    const { game } = props;

    return (
        <div className={cn('wrapper')}>
            {game.img ? (
                <img src={`data:image/jpeg;base64,${game.img}`} alt='board game cover' className={cn('image')} />
            ) : (
                <img
                    src={require('../../assets/games/00-noimage.jpg')}
                    alt='board game cover'
                    className={cn('image')}
                />
            )}

            <div className={cn('heading-container')}>
                <Paragraph style='very-small--gray'>{game.category}</Paragraph>
                <Heading tag='h4' style='small'>
                    {game.title}
                </Heading>
            </div>

            <Button theme='black'>Details</Button>
        </div>
    );
}