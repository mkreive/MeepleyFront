import React from 'react';
import classNames from 'classnames/bind';
import styles from './not-found-page.module.scss';

const cn = classNames.bind(styles);

export default function NotFoundPage() {
    return (
        <div className={cn('container')}>
            <p>Not Found Page</p>
        </div>
    );
}
