import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import classNames from 'classnames/bind';
import styles from './header.module.scss';
import Logo from '../../components/Logo/Logo';
import Navigation from '../../components/Navigation/Navigation';
import Burger from '../../components/Burger/Burger';

const cn = classNames.bind(styles);

export default function Header() {
    const [dropMenuShown, setDropMenuShown] = useState(false);
    const isMobile = useMediaQuery({ query: '(max-width: 700px)' });

    const handleMenuClick = function (event) {
        setDropMenuShown(event.checked);
    };

    return (
        <header className={cn('container')}>
            <Logo />
            {!isMobile && <Navigation />}
            {isMobile && <Burger onChange={handleMenuClick} checked={dropMenuShown} />}
            {/* {dropMenuShown && <Modal />} */}
        </header>
    );
}
