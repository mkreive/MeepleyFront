import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './navigation.module.scss';

const cn = classNames.bind(styles);

export default function DesktopNavigation() {
    return (
        <nav className={cn('nav--desktop')}>
            <Link className={cn('link')} to='/home'>
                Home
            </Link>
            <Link className={cn('link')} to='/games'>
                Games
            </Link>
            {/* <Link className={cn('link')} to='/account'>
                Account
            </Link>
            <Link className={cn('link')} to='/services'>
                Services
            </Link> */}
            <Link className={cn('link')} to='/login'>
                Login
            </Link>
        </nav>
    );
}
