import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation();
    const { authState } = useOktaAuth();
    const [page, setPage] = useState(t('admin_page_messages'));

    if (authState?.accessToken?.claims.userType === undefined) {
        return <Navigate to='/home' />;
    }

    return (
        <div className={cn('container')}>
            <div className={cn('container__header')}>
                <Heading tag='h1' style='big--black'>
                    {t('admin_heading')}
                </Heading>
                <RadioBar
                    onRadioChange={(props) => setPage(props)}
                    pages={[t('admin_page_messages'), t('admin_page_addgame'), t('admin_page_editgame')]}
                />
            </div>

            {page === t('admin_page_messages') && <AdminMessagesSection />}

            {page === t('admin_page_addgame') && <AddNewGameSection />}

            {page === t('admin_page_editgame') && <EditGameSection />}
        </div>
    );
}
