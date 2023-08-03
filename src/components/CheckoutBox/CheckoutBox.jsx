import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './checkout-box.module.scss';
import Heading from '../Heading/Heading';
import Paragraph from '../Paragraph/Paragraph';
import Button from '../Button/Button';

const cn = classNames.bind(styles);

export default function CheckoutBox(props) {
    const { copies, copiesAvailable, loans, loading } = props;

    return (
        <div className={cn('checkout__box')}>
            <div className={cn('upper_block')}>
                {!loading && <Paragraph style='medium'>{`${loans}/5 games reserved`}</Paragraph>}
                <Heading tag='h3' style='small--secondary'>
                    Available
                </Heading>

                <Paragraph style='small'>
                    {copiesAvailable} copies / {copies} available
                </Paragraph>
            </div>

            <div className={cn('bottom_block')}>
                <Link to='/login' className={cn('link')}>
                    <Button theme='secondary'>Login</Button>
                </Link>
                <Paragraph style='regular--gray'>Sign in to be able to leave a review.</Paragraph>
                <Paragraph style='regular'>This number can change until placing order has been complete.</Paragraph>
            </div>
        </div>
    );
}
