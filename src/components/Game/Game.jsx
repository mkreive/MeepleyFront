import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './game.module.scss';
import Heading from '../Heading/Heading';
import Paragraph from '../Paragraph/Paragraph';
import Button from '../Button/Button';

const cn = classNames.bind(styles);

export default function GameBox(props) {
    const { game } = props;
    const { t } = useTranslation();

    return (
        <div className={cn('wrapper')}>
            {game.img ? (
                <img src={`data:image/jpeg;base64,${game.img}`} alt='board game cover' className={cn('image')} />
            ) : (
                <img
                    src={require('../../assets/games/00-noimage.jpg')}
                    alt={t('games_allgames_img_alt')}
                    className={cn('image')}
                />
            )}

            <div className={cn('heading-container')}>
                <Paragraph style='very-small--gray'>{game.category}</Paragraph>

                <Heading tag='h4' style='small'>
                    {game.title}
                </Heading>
                <Paragraph style='very-very-small'>{game.designer}</Paragraph>
            </div>

            <Link to={`/checkout/${game.id}`} className={cn('link')}>
                <Button theme='black'>{t('games_allgames_game_button')}</Button>
            </Link>
        </div>
    );
}
