import React, { useState, useEffect } from 'react';
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
    const { authState } = useOktaAuth();
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

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
        getUserLoans();
    }, [authState]);

    return (
        <section className={cn(`${!error ? 'wrapper' : 'hidden'}`)}>
            <Heading tag='h2' style='medium'>
                Current Reservations
            </Heading>

            {loading && <Loader />}

            {loans.length > 0 &&
                !loading &&
                loans.map((loan, i) => <ReservationCard key={i} game={loan.game} daysLeft={loan.daysLeft} />)}

            {loans.length === 0 && !loading && (
                <Paragraph style='regular'>Currently there is no reservations.</Paragraph>
            )}

            {loans.length === 0 && !loading && (
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
