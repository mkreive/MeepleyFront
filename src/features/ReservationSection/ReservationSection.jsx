import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useOktaAuth } from '@okta/okta-react';
import { fetchLoans } from '../../utils/fetchLoans';
import classNames from 'classnames/bind';
import styles from './reservation-section.module.scss';
import Loader from '../../components/Loader/Loader';
import Heading from '../../components/Heading/Heading';
import SectionWithButton from '../../components/SectionWithButton/SectionWithButton';
import Paragraph from '../../components/Paragraph/Paragraph';
import ReservationCard from '../../components/ReservationCard/ReservationCard';

const cn = classNames.bind(styles);

export default function ReviewsSection() {
    const { t } = useTranslation();
    const { authState } = useOktaAuth();
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [returnGame, setReturnGame] = useState(false);

    async function handleReturnGame(props) {
        const url = `/api/games/secure/return?gameId=${props}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json',
            },
        };
        const returnResponse = await fetch(url, requestOptions);
        if (!returnResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setReturnGame(!returnGame);
    }

    async function handleRenewLoan(props) {
        const url = `/api/games/secure/renew/loan?gameId=${props}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json',
            },
        };

        const returnResponse = await fetch(url, requestOptions);
        if (!returnResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setReturnGame(!returnGame);
    }

    useEffect(() => {
        const getUserLoans = async function () {
            if (authState && authState?.isAuthenticated) {
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json',
                    },
                };
                const fetchedUserReservations = await fetchLoans(`/api/games/secure/currentloans`, requestOptions);

                if (fetchedUserReservations) {
                    setLoading(false);
                    setLoans(fetchedUserReservations);
                } else {
                    setError(fetchedUserReservations);
                }
            }
        };
        window.scrollTo(0, 0);
        getUserLoans();
    }, [authState, returnGame]);

    return (
        <section className={cn(`${!error ? 'wrapper' : 'hidden'}`)}>
            <Heading tag='h2' style='medium'>
                {t('account_reservations_header')}
            </Heading>

            {loading && <Loader />}

            {loans.length > 0 &&
                !loading &&
                loans.map((loan, i) => (
                    <ReservationCard
                        key={i}
                        game={loan.game}
                        daysLeft={loan.daysLeft}
                        onReturnGame={handleReturnGame}
                        onRenewLoan={handleRenewLoan}
                    />
                ))}

            {loans.length === 0 && !loading && (
                <Paragraph style='regular'>Currently there is no reservations.</Paragraph>
            )}

            {loans.length === 0 && !loading && (
                <SectionWithButton
                    title={t('account_reservations_allgamesad_title')}
                    text={t('account_reservations_allgamesad_text')}
                    button={t('account_reservations_allgamesad_button')}
                    link='/games'
                />
            )}
        </section>
    );
}
