import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './account-page.module.scss';
import FilterBar from '../../components/FilterBar/FilterBar';

const cn = classNames.bind(styles);

export default function AccountPage() {
    const [option, setOption] = useState('Reservations');

    return (
        <div className={cn('wrapper')}>
            <FilterBar
                filterName={'Your Account'}
                filterCategories={['Reservtions', 'History']}
                onChange={(e) => setOption(e.target.value)}
            />
            {/* <button
                onClick={() => setHistoryClick(false)}
                className='nav-link active'
                id='nav-loans-tab'
                data-bs-toggle='tab'
                data-bs-target='#nav-loans'
                type='button'
                role='tab'
                aria-controls='nav-loans'
                aria-selected='true'
            >
                Loans
            </button>
            <button
                onClick={() => setHistoryClick(true)}
                className='nav-link'
                id='nav-history-tab'
                data-bs-toggle='tab'
                data-bs-target='#nav-history'
                type='button'
                role='tab'
                aria-controls='nav-history'
                aria-selected='false'
            >
                Your History
            </button> */}

            {/* <div className='tab-content' id='nav-tabContent'>
                <div
                    className='tab-pane fade show active'
                    id='nav-loans'
                    role='tabpanel'
                    aria-labelledby='nav-loans-tab'
                >
                    <Loans />
                </div>
                <div className='tab-pane fade' id='nav-history' role='tabpanel' aria-labelledby='nav-history-tab'>
                    {historyClick ? <HistoryPage /> : <></>}
                </div>
            </div> */}
            <p>account</p>
        </div>
    );
}
