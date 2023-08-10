import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './account-page.module.scss';
import Heading from '../../components/Heading/Heading';
import RadioBar from '../../components/RadioBar/RadioBar';
import ReservationsSection from '../../features/ReservationSection/ReservationSection';
import HistorySection from '../../features/HistorySection/HistorySection';
import MessagesSection from '../../features/MessagesSection/MessagesSection';
import { useOktaAuth } from '@okta/okta-react';

const cn = classNames.bind(styles);

export default function AccountPage() {
    const { authState } = useOktaAuth();
    const [page, setPage] = useState('reservations');

    if (!authState?.accessToken?.claims) {
        return <Navigate to='/home' />;
    }

    return (
        <div className={cn('container')}>
            <div className={cn('container__header')}>
                <Heading tag='h1' style='big--black'>
                    Your Account
                </Heading>
                <RadioBar onRadioChange={(props) => setPage(props)} pages={['reservations', 'history', 'messages']} />
            </div>

            {page === 'reservations' && <ReservationsSection />}

            {page === 'history' && <HistorySection />}

            {page === 'messages' && <MessagesSection />}
        </div>
    );
}
