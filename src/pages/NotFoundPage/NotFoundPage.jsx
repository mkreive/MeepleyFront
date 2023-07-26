import React from 'react';
import classNames from 'classnames/bind';
import styles from './not-found-page.module.scss';
import NotFoundImage from './NotFoundImage';
import Heading from '../../components/Heading/Heading';
import { Link } from 'react-router-dom';

const cn = classNames.bind(styles);

export default function NotFoundPage() {
    return (
        <div className={cn('container')}>
            <NotFoundImage />
            <Heading tag='h1' style='medium'>
                Sorry, looks like the page you are trying to reach no longer exists.
            </Heading>
            <Heading tag='h2' style='small'>
                Let's get you{' '}
                <Link to={'/home'} className={cn('link')}>
                    home
                </Link>
                .
            </Heading>
        </div>
    );
}
