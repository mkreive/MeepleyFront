import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { useTranslation } from 'react-i18next';
import { fetchGame } from '../../utils/fetchGame';
import classNames from 'classnames/bind';
import styles from './edit-game.module.scss';
import Heading from '../../components/Heading/Heading';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Paragraph from '../../components/Paragraph/Paragraph';
import { Navigate } from 'react-router-dom';

const cn = classNames.bind(styles);

export default function EditGame() {
    const { authState } = useOktaAuth();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const gameId = window.location.pathname.split('/')[2];
    const [game, setGame] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [title, setTitle] = useState('');
    const [designer, setDesigner] = useState('');
    const [publisher, setPublisher] = useState('');
    const [intro, setIntro] = useState('');
    const [description, setDescription] = useState('');
    const [copies, setCopies] = useState(0);
    const [category, setCategory] = useState('');
    const [complexity, setComplexity] = useState('');
    const [players, setPlayers] = useState('');
    const [playingTime, setPlayingTime] = useState('');
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    useEffect(() => {
        const getGame = async function () {
            const fetchedGame = await fetchGame(`/api/games/${gameId}`);
            if (fetchedGame) {
                setLoading(false);
                setGame(fetchedGame);
                setTitle(fetchedGame.title);
                setDesigner(fetchedGame.designer);
                setPublisher(fetchedGame.publisher);
                setIntro(fetchedGame.intro);
                setDescription(fetchedGame.description);
                setCopies(fetchedGame.copies);
                setCategory(fetchedGame.category);
                setComplexity(fetchedGame.complexity);
                setPlayers(fetchedGame.players);
                setPlayingTime(fetchedGame.playingTime);
            } else {
                setError(fetchedGame);
            }
        };
        getGame();
        window.scrollTo(0, 0);
    }, []);

    async function submitEditedGame() {
        const url = `/api/admin/secure/edit/game?gameId=${gameId}`;
        if (
            authState &&
            authState?.isAuthenticated &&
            title !== '' &&
            designer !== '' &&
            publisher !== '' &&
            intro !== '' &&
            description !== '' &&
            category !== '' &&
            complexity !== '' &&
            players !== '' &&
            playingTime !== '' &&
            copies >= 0
        ) {
            const gameEdited = {
                title,
                designer,
                publisher,
                intro,
                description,
                category,
                complexity,
                copies,
                players,
                playingTime,
            };

            const requestOptions = {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(gameEdited),
            };

            const submitEditedGameResponse = await fetch(url, requestOptions);
            if (!submitEditedGameResponse.ok) {
                throw new Error('Something went wrong!');
            }

            setDisplayWarning(false);
            setDisplaySuccess(true);
            window.scrollTo(0, 0);
            setTimeout(() => {
                navigate('/admin', window.location.origin);
            }, 4000);
        } else {
            setDisplayWarning(true);
            setDisplaySuccess(false);
        }
    }

    return (
        <section className={cn('wrapper')}>
            <Heading tag='h2' style='medium'>
                {t('admin_edit_heading')}
            </Heading>

            {displayWarning && <Paragraph style='regular--alert_bold'>{t('admin_addgame_warning')}</Paragraph>}

            {displaySuccess && <Paragraph style='regular--secondary_bold'>{t('admin_editgame_succesedit')}</Paragraph>}

            <Card>
                <form method='PUT' className={cn('form')}>
                    <div className={cn('group')}>
                        <label className={cn('label')}>
                            {t('admin_addgame_form_title')}
                            <input
                                type='text'
                                className={cn('input')}
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                                required
                            />
                        </label>
                        <label className={cn('label')}>
                            {t('admin_addgame_form_designer')}
                            <input
                                type='text'
                                className={cn('input')}
                                onChange={(e) => setDesigner(e.target.value)}
                                value={designer}
                                required
                            />
                        </label>
                    </div>

                    <div className={cn('group')}>
                        <label className={cn('label')}>
                            {t('admin_addgame_form_publisher')}
                            <input
                                type='text'
                                className={cn('input')}
                                onChange={(e) => setPublisher(e.target.value)}
                                value={publisher}
                                required
                            />
                        </label>
                        <label className={cn('label')}>
                            {t('admin_addgame_form_category')}
                            <input
                                type='text'
                                className={cn('input')}
                                onChange={(e) => setCategory(e.target.value.toUpperCase())}
                                value={category}
                                required
                            />
                        </label>
                    </div>

                    <div className={cn('group')}>
                        <label className={cn('label')}>
                            {t('admin_addgame_form_complexity')}
                            <input
                                type='text'
                                className={cn('input')}
                                onChange={(e) => setComplexity(e.target.value)}
                                value={complexity}
                                required
                            />
                        </label>
                        <label className={cn('label')}>
                            {t('admin_addgame_form_playingtime')}
                            <input
                                type='text'
                                className={cn('input')}
                                onChange={(e) => setPlayingTime(e.target.value)}
                                value={playingTime}
                                required
                            />
                        </label>
                        <label className={cn('label')}>
                            {t('admin_addgame_form_players')}
                            <input
                                type='text'
                                className={cn('input')}
                                onChange={(e) => setPlayers(e.target.value)}
                                value={players}
                                required
                            />
                        </label>
                        <label className={cn('label')}>
                            {t('admin_addgame_form_copies')}
                            <input
                                type='number'
                                className={cn('input')}
                                onChange={(e) => setCopies(e.target.value)}
                                value={copies}
                                required
                            />
                        </label>
                    </div>

                    <label className={cn('label')}>
                        {t('admin_addgame_form_intro')}
                        <textarea
                            rows={3}
                            className={cn('input--textarea')}
                            onChange={(e) => setIntro(e.target.value)}
                            value={intro}
                            required
                        />
                    </label>

                    <label className={cn('label')}>
                        {t('admin_addgame_form_description')}
                        <textarea
                            rows={5}
                            className={cn('input--textarea')}
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                    </label>

                    <Button theme='black--small' onClick={submitEditedGame}>
                        {t('admin_editgame_form_editbtn')}
                    </Button>
                </form>
            </Card>
        </section>
    );
}
