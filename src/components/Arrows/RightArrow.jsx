import React from 'react';
import classNames from 'classnames/bind';
import styles from './arrow.module.scss';

const cn = classNames.bind(styles);

export default function RightArrow(props) {
    return (
        <div onClick={props.onClick} className={cn('arrow')}>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'>
                <path d='m18.75 36-2.15-2.15 9.9-9.9-9.9-9.9 2.15-2.15L30.8 23.95Z' />
            </svg>
        </div>
    );
}
