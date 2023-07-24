import React, { useState, useRef, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import classNames from 'classnames/bind';
import styles from './header.module.scss';
import Logo from '../../components/Logo/Logo';
import DesktopNavigation from '../../components/Navigation/DesktopNavigation';
import MobileNavigation from '../../components/Navigation/MobileNavigation';
import Burger from '../../components/Burger/Burger';
import Modal from '../Modal/Modal';

const cn = classNames.bind(styles);

export default function Header() {
    const wrapperRef = useRef(null);
    const [dropMenuShown, setDropMenuShown] = useState(false);
    const isMobile = useMediaQuery({ query: '(max-width: 700px)' });

    const handleMenuClick = function (event) {
        setDropMenuShown(event.checked);
    };

    useOutsideAlerter(wrapperRef);
    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setDropMenuShown(false);
                    setCartOpen(false);
                }
            }
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [ref]);
    }

    return (
        <header className={cn('container')}>
            <Logo />
            {!isMobile && <DesktopNavigation />}
            {isMobile && <Burger onChange={handleMenuClick} checked={dropMenuShown} />}
            {dropMenuShown && <MobileNavigation onClick={handleMenuClick} />}
            {dropMenuShown && <Modal />}
        </header>
    );
}
