import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './radio-bar.module.scss';

const cn = classNames.bind(styles);

export default function RadioBar({ onRadioChange, pages }) {
    const [selected, setSelected] = useState(pages[0]);

    const handleSelection = (e) => {
        onRadioChange(e.target.value);
        setSelected(e.target.value);
    };

    return (
        <div className={cn('wrapper')}>
            <form className={cn('inner-wrapper')}>
                {pages.map((page, i) => (
                    <>
                        <input
                            key={i}
                            onChange={handleSelection}
                            className={cn('radio-button')}
                            type='radio'
                            name='radio-group'
                            value={page}
                            checked={selected === page}
                            id={i}
                        />
                        <label htmlFor={i} className={cn('radio-label')}>
                            {page.toUpperCase()}
                        </label>
                    </>
                ))}
            </form>
        </div>
    );
}
