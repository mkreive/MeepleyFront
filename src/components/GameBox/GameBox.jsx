import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import styles from './game-box.module.scss';
import Heading from '../Heading/Heading';
import Paragraph from '../Paragraph/Paragraph';
import Card from '../Card/Card';
import Button from '../Button/Button';

const cn = classNames.bind(styles);

export default function GameBox(props) {
    const { game } = props;
    const { t } = useTranslation();

    return (
        <Card>
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
                <Paragraph style='regular'>{game.designer}</Paragraph>
            </div>

            <Link to={`/checkout/${game.id}`} className={cn('link')}>
                <Button theme='black'> {t('home_newgames_button')}</Button>
            </Link>
        </Card>
    );
}
