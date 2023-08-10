import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './admin-page.module.scss';
import Heading from '../../components/Heading/Heading';
import RadioBar from '../../components/RadioBar/RadioBar';
import AdminMessagesSection from '../../features/AdminMessagesSection/AdminMessagesSection';
import { useOktaAuth } from '@okta/okta-react';
import { Navigate } from 'react-router-dom';
import AddNewGameSection from '../../features/AddNewGameSection/AddNewGameSection';
import EditGameSection from '../../features/EditGameSection/EditGameSecton';

const cn = classNames.bind(styles);

export default function AdminPage() {
    const { authState } = useOktaAuth();
    const [page, setPage] = useState('messages');

    if (authState?.accessToken?.claims.userType === undefined) {
        return <Navigate to='/home' />;
    }

    return (
        <div className={cn('container')}>
            <div className={cn('container__header')}>
                <Heading tag='h1' style='big--black'>
                    Manage Store
                </Heading>
                <RadioBar onRadioChange={(props) => setPage(props)} pages={['messages', 'add game', 'edit game']} />
            </div>

            {page === 'messages' && <AdminMessagesSection />}

            {page === 'add game' && <AddNewGameSection />}

            {page === 'edit game' && <EditGameSection />}
        </div>
    );
}
