import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useOktaAuth } from '@okta/okta-react';
import { fetchHistory } from '../../utils/fetchHistory';
import classNames from 'classnames/bind';
import styles from './history-section.module.scss';
import Loader from '../../components/Loader/Loader';
import Heading from '../../components/Heading/Heading';
import SectionWithButton from '../../components/SectionWithButton/SectionWithButton';
import Paragraph from '../../components/Paragraph/Paragraph';
import HistoryCard from '../../components/HistoryCard/HistoryCard';

const cn = classNames.bind(styles);

export default function HistorySection() {
    const { t } = useTranslation();
    const { authState } = useOktaAuth();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getUserHistory = async function () {
            if (authState && authState?.isAuthenticated) {
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json',
                    },
                };
                const fetchedUserHistory = await fetchHistory(
                    `/api/histories/search/findGamesByUserEmail?userEmail=${authState.accessToken.claims.sub}`,
                    requestOptions
                );

                if (fetchedUserHistory) {
                    setLoading(false);
                    setHistory(fetchedUserHistory);
                } else {
                    setError(fetchedUserHistory);
                }
            }
        };
        window.scrollTo(0, 0);
        getUserHistory();
    }, [authState]);

    return (
        <section className={cn(`${!error ? 'wrapper' : 'hidden'}`)}>
            <Heading tag='h2' style='medium'>
                Reservations History
            </Heading>

            {loading && <Loader />}

            {history.length > 0 && !loading && history.map((entry, i) => <HistoryCard history={entry} key={i} />)}

            {history.length === 0 && !loading && <Paragraph style='regular'>Currently there is no history.</Paragraph>}

            {history.length === 0 && !loading && (
                <SectionWithButton
                    title='Want to reserve a game?'
                    text='Visit our game collection'
                    button='Top games'
                    link='/games'
                />
            )}
        </section>
    );
}
