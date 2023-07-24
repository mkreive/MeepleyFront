import React from 'react';
import { Outlet } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './root-layout.module.scss';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const cn = classNames.bind(styles);

export default function RootLayout() {
    return (
        <div className={cn('container')}>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}
