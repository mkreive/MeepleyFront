import { Outlet, useNavigate } from 'react-router-dom';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security } from '@okta/okta-react';
import { oktaConfig } from '../lib/oktaConfig';
import React from 'react';
import classNames from 'classnames/bind';
import styles from './auth-layout.module.scss';
import Footer from '../layouts/Footer/Footer';
import Header from '../layouts/Header/Header';

const cn = classNames.bind(styles);

export default function AuthLayout() {
    const navigate = useNavigate();
    const oktaAuth = new OktaAuth(oktaConfig);
    const customAuthHandler = () => {
        navigate.push('/login');
    };
    const restoreOriginalUri = async (_oktaAuth, originalUri) => {
        // navigate.replace(toRelativeUrl(originalUri || '/', window.location.origin));

        navigate(toRelativeUrl(originalUri || '/', window.location.origin), { replace: true });
    };

    return (
        <div className={cn('container')}>
            <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
                <Header />
                <Outlet />
                <Footer />
            </Security>
        </div>
    );
}
