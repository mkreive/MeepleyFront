import React from 'react';
import classNames from 'classnames/bind';
import styles from './logo.module.scss';

const cn = classNames.bind(styles);

export default function Header() {
    return (
        <div className={cn('container')}>
            <div className={cn('logo')}></div>
        </div>
    );
}
