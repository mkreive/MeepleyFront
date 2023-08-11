import React, { useState, useEffect } from 'react';
import { fetchGames } from '../../utils/fetchGames';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import styles from './edit-game-section.module.scss';
import Heading from '../../components/Heading/Heading';
import qs from 'qs';
import Loader from '../../components/Loader/Loader';
import EditGameCard from '../../components/EditGameCard/EditGameCard';
import SearchBar from '../../components/SearchBar/SearchBar';

const cn = classNames.bind(styles);

export default function EditGameSection() {
    const { t } = useTranslation();
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [gameDelete, setGameDelete] = useState(false);
    const [title, setTitle] = useState('');

    const handleSearch = function (props) {
        setTitle(props.trim().toLowerCase());
    };

    useEffect(() => {
        const params = { title: title };

        const url = `/api/games/search/findGames${qs.stringify(params, {
            addQueryPrefix: true,
            arrayFormat: 'comma',
            encode: false,
            skipNulls: true,
        })}`;

        const getGames = async function () {
            const games = await fetchGames(url);
            if (games) {
                setLoading(false);
                setGames(games);
            } else {
                setError(games);
            }
        };
        getGames();
    }, [gameDelete, title]);

    const deleteGame = () => setGameDelete(!gameDelete);

    return (
        <div className={cn('container')}>
            <Heading tag='h2' style='medium'>
                {t('admin_editgame_heading')}
            </Heading>

            <SearchBar onChange={(e) => setTitle(e.target.value)} onSearch={handleSearch} value={title} />

            {loading && <Loader />}

            <section className={cn(`${!error ? 'wrapper' : 'hidden'}`)}>
                {games.map((game) => (
                    <EditGameCard key={game.id} game={game} onDelete={deleteGame} />
                ))}
            </section>
        </div>
    );
}
