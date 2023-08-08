import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './navigation.module.scss';

const cn = classNames.bind(styles);

export default function DesktopNavigation({ loggedIn, onLogout, isAdmin }) {
    return (
        <nav className={cn('nav--desktop')}>
            <Link className={cn('link')} to='/home'>
                Home
            </Link>
            <Link className={cn('link')} to='/games'>
                Games
            </Link>

            {loggedIn && (
                <Link className={cn('link')} to='/account'>
                    Account
                </Link>
            )}

            {isAdmin && (
                <Link className={cn('link')} to='/admin'>
                    Admin
                </Link>
            )}

            {!loggedIn ? (
                <Link className={cn('link')} to='/login'>
                    Login
                </Link>
            ) : (
                <Link className={cn('link')} onClick={onLogout}>
                    Logout
                </Link>
            )}
        </nav>
    );
}
