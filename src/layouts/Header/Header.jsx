import React from 'react';
import classNames from 'classnames/bind';
import styles from './header.module.scss';
import Logo from '../../components/Logo/Logo';

const cn = classNames.bind(styles);

export default function Header() {
    return (
        <header className={cn('container')}>
            <Logo alt='logo' className={cn('logo')} />
        </header>
    );
}
