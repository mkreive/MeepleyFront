import React from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import styles from './app.module.scss';
import classNames from 'classnames/bind';
import RootLayout from '../layouts/RootLayout/RootLayout';
import HomePage from '../pages/HomePage/HomePage';
import GamesPage from '../pages/GamesPage/GamesPage';
import GameCheckoutPage from '../pages/GameCheckoutPage/GameCheckoutPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';

const cn = classNames.bind(styles);
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/games' element={<GamesPage />} />
            <Route path='/checkout/:gameId' element={<GameCheckoutPage />} />
            <Route path='*' element={<NotFoundPage />} />
        </Route>
    )
);

export default function App() {
    return (
        <div className={cn('app')}>
            <RouterProvider router={router} />
        </div>
    );
}
