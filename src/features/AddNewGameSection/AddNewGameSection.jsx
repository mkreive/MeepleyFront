import React, { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import classNames from 'classnames/bind';
import styles from './add-new-game.module.scss';
import Heading from '../../components/Heading/Heading';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Paragraph from '../../components/Paragraph/Paragraph';

const cn = classNames.bind(styles);

export default function AddNewGameSection() {
    const { authState } = useOktaAuth();

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
    const [selectedImage, setSelectedImage] = useState(null);
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    async function base64ConversionForImages(e) {
        if (e.target.files[0]) {
            getBase64(e.target.files[0]);
        }
    }

    function getBase64(file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            const base64result = reader.result.split(',')[1];
            setSelectedImage(base64result);
        };
        reader.onerror = function (error) {
            console.log('Error', error);
        };
    }

    async function submitNewGame() {
        const url = `/api/admin/secure/add/game`;
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
            const game = {
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
                img: selectedImage,
            };

            const requestOptions = {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(game),
            };

            const submitNewGameResponse = await fetch(url, requestOptions);
            if (!submitNewGameResponse.ok) {
                throw new Error('Something went wrong!');
            }
            setTitle('');
            setDesigner('');
            setPublisher('');
            setIntro('');
            setDescription('');
            setCopies(0);
            setCategory('');
            setComplexity('');
            setPlayers('');
            setPlayingTime('');
            setSelectedImage(null);
            setDisplayWarning(false);
            setDisplaySuccess(true);
        } else {
            setDisplayWarning(true);
            setDisplaySuccess(false);
        }
        window.scrollTo(0, 0);
    }

    return (
        <section className={cn('wrapper')}>
            <Heading tag='h2' style='medium'>
                Add New Game
            </Heading>

            {displayWarning && <Paragraph style='regular--alert_bold'>All fields must be filled out</Paragraph>}

            {displaySuccess && <Paragraph style='regular--secondary_bold'>New game added successfully</Paragraph>}

            <Card>
                <form method='POST' className={cn('form')}>
                    <div className={cn('group')}>
                        <label className={cn('label')}>
                            Title
                            <input
                                type='text'
                                className={cn('input')}
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                                required
                            />
                        </label>
                        <label className={cn('label')}>
                            Designer
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
                            Publisher
                            <input
                                type='text'
                                className={cn('input')}
                                onChange={(e) => setPublisher(e.target.value)}
                                value={publisher}
                                required
                            />
                        </label>
                        <label className={cn('label')}>
                            Category
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
                            Complexity
                            <input
                                type='text'
                                className={cn('input')}
                                onChange={(e) => setComplexity(e.target.value)}
                                value={complexity}
                                required
                            />
                        </label>
                        <label className={cn('label')}>
                            Playing Time
                            <input
                                type='text'
                                className={cn('input')}
                                onChange={(e) => setPlayingTime(e.target.value)}
                                value={playingTime}
                                required
                            />
                        </label>
                        <label className={cn('label')}>
                            Number of Players
                            <input
                                type='text'
                                className={cn('input')}
                                onChange={(e) => setPlayers(e.target.value)}
                                value={players}
                                required
                            />
                        </label>
                        <label className={cn('label')}>
                            Copies
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
                        Intro
                        <textarea
                            rows={3}
                            className={cn('input--textarea')}
                            onChange={(e) => setIntro(e.target.value)}
                            value={intro}
                            required
                        />
                    </label>

                    <label className={cn('label')}>
                        Description
                        <textarea
                            rows={5}
                            className={cn('input--textarea')}
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                    </label>

                    <label className={cn('label')}>
                        Image
                        <input type='file' className={cn('input')} onChange={(e) => base64ConversionForImages(e)} />
                    </label>

                    <Button theme='black--small' onClick={submitNewGame}>
                        Add Game
                    </Button>
                </form>
            </Card>
        </section>
    );
}
