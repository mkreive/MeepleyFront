import React from 'react';
import classNames from 'classnames/bind';
import styles from './login-page.module.scss';
import LoginPageImage from './LoginPageImage';

const cn = classNames.bind(styles);

export default function LoginPage({ children }) {
    return (
        <div className={cn('wrapper')}>
            {children}
            <LoginPageImage />
        </div>
    );
}
