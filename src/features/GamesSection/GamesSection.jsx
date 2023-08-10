import React from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import styles from './games-section.module.scss';
import Heading from '../../components/Heading/Heading';
import Loader from '../../components/Loader/Loader';
import Game from '../../components/Game/Game';

const cn = classNames.bind(styles);

export default function GamesSection(props) {
    const { loading, error, games } = props;
    const { t } = useTranslation();

    return (
        <div className={cn('container')}>
            <Heading tag='h4' style='medium'>
                {t('games_allgames_heading')}
            </Heading>

            {loading && <Loader />}

            <section className={cn(`${!error ? 'wrapper' : 'hidden'}`)}>
                {games.map((game) => (
                    <Game key={game.id} game={game} />
                ))}
            </section>
        </div>
    );
}
