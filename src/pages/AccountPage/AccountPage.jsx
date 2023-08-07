import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './account-page.module.scss';
import FilterBar from '../../components/FilterBar/FilterBar';
import Heading from '../../components/Heading/Heading';

const cn = classNames.bind(styles);

export default function AccountPage() {
    const [option, setOption] = useState('reservation');

    return (
        <div className={cn('container')}>
            <div className={cn('container__header')}>
                <Heading tag='h1' style='big--black'>
                    Your Account
                </Heading>
                <div className={cn('wrapper')}>
                    <form className={cn('inner-wrapper')}>
                        <input
                            onClick={(e) => setOption(e.target.value.toLowerCase())}
                            className={cn('radio-button')}
                            type='radio'
                            name='radio-group'
                            value='reservation'
                            checked={option === 'reservation'}
                            id='1'
                            defaultChecked
                        />
                        <label htmlFor='1' className={cn('radio-label')}>
                            RESERVATION
                        </label>

                        <input
                            onClick={(e) => setOption(e.target.value.toLowerCase())}
                            className={cn('radio-button')}
                            type='radio'
                            name='radio-group'
                            value='history'
                            id='2'
                            checked={option === 'history'}
                        />
                        <label htmlFor='2' className={cn('radio-label')}>
                            HISTORY
                        </label>

                        <input
                            onClick={(e) => setOption(e.target.value.toLowerCase())}
                            className={cn('radio-button')}
                            type='radio'
                            name='radio-group'
                            value='service'
                            id='3'
                            checked={option === 'service'}
                        />
                        <label htmlFor='3' className={cn('radio-label')}>
                            SERVICE
                        </label>
                    </form>
                </div>
            </div>
        </div>
    );
}
