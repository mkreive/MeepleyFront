import React, { useState, useRef, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import classNames from 'classnames/bind';
import styles from './header.module.scss';
import Logo from '../../components/Logo/Logo';
import DesktopNavigation from '../../components/Navigation/DesktopNavigation';
import MobileNavigation from '../../components/Navigation/MobileNavigation';
import Burger from '../../components/Burger/Burger';
import Modal from '../Modal/Modal';
import { useOktaAuth } from '@okta/okta-react';
import Loader from '../../components/Loader/Loader';

const cn = classNames.bind(styles);

export default function Header() {
    const { oktaAuth, authState } = useOktaAuth();
    const wrapperRef = useRef(null);
    const [dropMenuShown, setDropMenuShown] = useState(false);
    const isMobile = useMediaQuery({ query: '(max-width: 700px)' });

    const handleMenuClick = function (event) {
        setDropMenuShown(event.checked);
    };

    const handleLogout = async () => oktaAuth.signOut();

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

    if (!authState) {
        return <Loader />;
    }

    return (
        <header className={cn('container')}>
            <Logo />
            {!isMobile && (
                <DesktopNavigation
                    loggedIn={authState?.isAuthenticated}
                    onLogout={handleLogout}
                    isAdmin={authState?.accessToken?.claims.userType === 'admin'}
                />
            )}
            {isMobile && <Burger onChange={handleMenuClick} checked={dropMenuShown} />}
            {dropMenuShown && (
                <MobileNavigation
                    onClick={handleMenuClick}
                    loggedIn={authState?.isAuthenticated}
                    onLogout={handleLogout}
                    isAdmin={authState?.accessToken?.claims.userType === 'admin'}
                />
            )}
            {dropMenuShown && <Modal />}
        </header>
    );
}
