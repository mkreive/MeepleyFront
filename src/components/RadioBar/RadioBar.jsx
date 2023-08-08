import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './radio-bar.module.scss';

const cn = classNames.bind(styles);

export default function RadioBar({ onRadioChange }) {
    const [selected, setSelected] = useState('reservations');

    const handleSelection = (e) => {
        onRadioChange(e.target.value);
        setSelected(e.target.value);
    };

    return (
        <div className={cn('wrapper')}>
            <form className={cn('inner-wrapper')}>
                <input
                    onChange={handleSelection}
                    className={cn('radio-button')}
                    type='radio'
                    name='radio-group'
                    value='reservations'
                    checked={selected === 'reservations'}
                    id='1'
                />
                <label htmlFor='1' className={cn('radio-label')}>
                    RESERVATIONS
                </label>

                <input
                    onChange={handleSelection}
                    className={cn('radio-button')}
                    type='radio'
                    name='radio-group'
                    value='history'
                    id='2'
                    checked={selected === 'history'}
                />
                <label htmlFor='2' className={cn('radio-label')}>
                    HISTORY
                </label>

                <input
                    onChange={handleSelection}
                    className={cn('radio-button')}
                    type='radio'
                    name='radio-group'
                    value='messages'
                    id='3'
                    checked={selected === 'messages'}
                />
                <label htmlFor='3' className={cn('radio-label')}>
                    MESSAGES
                </label>
            </form>
        </div>
    );
}
