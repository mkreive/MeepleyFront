import React from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, useNavigate } from 'react-router-dom';
import styles from './app.module.scss';
import classNames from 'classnames/bind';
import { oktaConfig } from '../lib/oktaConfig';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security, LoginCallback } from '@okta/okta-react';
import RootLayout from '../layouts/RootLayout/RootLayout';
import HomePage from '../pages/HomePage/HomePage';
import GamesPage from '../pages/GamesPage/GamesPage';
import GameCheckoutPage from '../pages/GameCheckoutPage/GameCheckoutPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import LoginWidget from '../Auth/LoginWidget';

const cn = classNames.bind(styles);
const oktaAuth = new OktaAuth(oktaConfig);
const customAuthHandler = () => {
    history.push('/login');
};
const restoreOriginalUri = async () => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
};
const router = createBrowserRouter(
    createRoutesFromElements(
        <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
            <Route path='/' element={<RootLayout />}>
                <Route index element={<HomePage />} />
                <Route path='/home' element={<HomePage />} />
                <Route path='/games' element={<GamesPage />} />
                <Route path='/checkout/:gameId' element={<GameCheckoutPage />} />
                <Route path='/login' element={<LoginWidget config={oktaConfig} />} />
                <Route path='/login/callback' element={LoginCallback} />
                <Route path='*' element={<NotFoundPage />} />
            </Route>
        </Security>
    )
);

export default function App() {
    const history = useNavigate();
    return (
        <div className={cn('app')}>
            <RouterProvider router={router} />
        </div>
    );
}
