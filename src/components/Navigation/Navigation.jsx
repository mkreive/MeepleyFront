import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './navigation.module.scss';

const cn = classNames.bind(styles);

export default function Navigation() {
    return (
        <nav className={cn('container')}>
            <Link className={cn('nav__link')} to='/home'>
                Home
            </Link>
            <Link className={cn('nav__link')} to='/games'>
                Games
            </Link>
            <Link className={cn('nav__link')} to='/account'>
                Account
            </Link>
            <Link className={cn('nav__link')} to='/services'>
                Services
            </Link>
            <Link className={cn('nav__link')} to='/login'>
                Login
            </Link>
        </nav>
    );
}
