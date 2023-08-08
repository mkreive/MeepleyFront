import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './account-page.module.scss';
import Heading from '../../components/Heading/Heading';
import RadioBar from '../../components/RadioBar/RadioBar';
import ReservationsSection from '../../features/ReservationSection/ReservationSection';
import HistorySection from '../../features/HistorySection/HistorySection';
import MessagesSection from '../../features/MessagesSection/MessagesSection';

const cn = classNames.bind(styles);

export default function AccountPage() {
    const [page, setPage] = useState('reservations');

    return (
        <div className={cn('container')}>
            <div className={cn('container__header')}>
                <Heading tag='h1' style='big--black'>
                    Your Account
                </Heading>
                <RadioBar onRadioChange={(props) => setPage(props)} />
            </div>

            {page === 'reservations' && <ReservationsSection />}

            {page === 'history' && <HistorySection />}

            {page === 'messages' && <MessagesSection />}
        </div>
    );
}
