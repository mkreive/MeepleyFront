import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import { useOktaAuth } from '@okta/okta-react';
import styles from './edit-game-card.module.scss';
import Heading from '../Heading/Heading';
import Paragraph from '../Paragraph/Paragraph';

const cn = classNames.bind(styles);

export default function EditGameCard(props) {
    const { t } = useTranslation();
    const { game, onDelete } = props;
    const { authState } = useOktaAuth();
    const [quantity, setQuantity] = useState(game.copies);
    const [remaining, setRemaining] = useState(game.copiesAvailable);

    async function increaseQuantity() {
        const url = `/api/admin/secure/increase/game/quantity?gameId=${game.id}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json',
            },
        };

        const quantityUpdateResponse = await fetch(url, requestOptions);
        if (!quantityUpdateResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setQuantity(quantity + 1);
        setRemaining(remaining + 1);
    }

    async function decreaseQuantity() {
        const url = `/api/admin/secure/decrease/game/quantity?gameId=${game.id}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json',
            },
        };

        const quantityUpdateResponse = await fetch(url, requestOptions);
        if (!quantityUpdateResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setQuantity(quantity - 1);
        setRemaining(remaining - 1);
    }

    async function editGame() {
        const url = `/api/admin/secure/decrease/game/quantity?gameId=${game.id}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json',
            },
        };

        const quantityUpdateResponse = await fetch(url, requestOptions);
        if (!quantityUpdateResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setQuantity(quantity - 1);
        setRemaining(remaining - 1);
    }

    async function deleteGame() {
        const url = `/api/admin/secure/delete/game?gameId=${game.id}`;
        const requestOptions = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json',
            },
        };

        const updateResponse = await fetch(url, requestOptions);
        if (!updateResponse.ok) {
            throw new Error('Something went wrong!');
        }
        onDelete();
    }

    return (
        <div className={cn('card')}>
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
                <Heading tag='h4' style='small'>
                    {game.title}
                </Heading>
                <Paragraph style='regular'>
                    {t('admin_editgame_quantity')}
                    {quantity}
                </Paragraph>
                <Paragraph style='regular'>
                    {t('admin_editgame_remaining')}
                    {remaining}
                </Paragraph>
            </div>

            <button className={cn('btn', 'btn--add')} onClick={increaseQuantity}>
                {t('admin_editgame_increasebtn')}
            </button>
            <button className={cn('btn', 'btn--minus')} onClick={decreaseQuantity}>
                {t('admin_editgame_decreasebtn')}
            </button>
            <button className={cn('btn', 'btn--edit')} onClick={editGame}>
                {t('admin_editgame_editbtn')}
            </button>
            <button className={cn('btn', 'btn--delete')} onClick={deleteGame}>
                {t('admin_editgame_deletebtn')}
            </button>
        </div>
    );
}
