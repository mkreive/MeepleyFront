import React from 'react';
import classNames from 'classnames/bind';
import styles from './arrow.module.scss';

const cn = classNames.bind(styles);

export default function LeftArrow(props) {
    return (
        <div onClick={props.onClick} className={cn('arrow')}>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'>
                <path d='M28.05 36 16 23.95 28.05 11.9l2.15 2.15-9.9 9.9 9.9 9.9Z' />
            </svg>
        </div>
    );
}
