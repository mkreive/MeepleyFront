import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchLoans } from '../../utils/fetchLoans';
import { fetchCheckout } from '../../utils/fetchCheckout';
import classNames from 'classnames/bind';
import styles from './checkout-box.module.scss';
import Heading from '../Heading/Heading';
import Paragraph from '../Paragraph/Paragraph';
import Button from '../Button/Button';

const cn = classNames.bind(styles);

export default function CheckoutBox({ copies, copiesAvailable, authState, gameId, onCheckout, isReviewLeft }) {
    const [loans, setLoans] = useState(0);
    const [loadingLoans, setLoadingLoans] = useState(true);
    const [loansError, setLoansError] = useState(false);

    const [checkout, setCheckout] = useState(false);
    const [loadingCheckout, setLoadingCheckout] = useState(true);
    const [checkoutError, setCheckoutError] = useState(false);

    useEffect(() => {
        const getLoans = async function () {
            if (authState && authState.isAuthenticated) {
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json',
                    },
                };
                const fetchedLoans = await fetchLoans(`/api/games/secure/currentloans/count`, requestOptions);
                if (fetchedLoans) {
                    setLoadingLoans(false);
                    setLoans(fetchedLoans);
                } else {
                    setLoansError(fetchedLoans);
                }
            }
        };
        getLoans();
    }, [authState, checkout]);

    useEffect(() => {
        const getCheckout = async function () {
            if (authState && authState.isAuthenticated) {
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json',
                    },
                };
                const fetchedCheckout = await fetchCheckout(
                    `/api/games/secure/ischeckedout/byuser?gameId=${gameId}`,
                    requestOptions
                );
                if (fetchedCheckout) {
                    setLoadingCheckout(false);
                    setCheckout(fetchedCheckout);
                } else {
                    setCheckoutError(fetchedCheckout);
                }
            }
        };
        getCheckout();
    }, [authState]);

    function buttonRender() {
        if (authState && authState.isAuthenticated) {
            if (!checkout && loans < 5 && copiesAvailable > 0) {
                return (
                    <Button theme='secondary' onClick={reserveGame}>
                        Reserve
                    </Button>
                );
            } else if (checkout) {
                return <Paragraph style='regular--bold'>You reserved this game. Enjoy!</Paragraph>;
            } else if (!checkout && loans === 5) {
                return <Paragraph style='regular--tertiary'>Too many games reserved..</Paragraph>;
            } else if (!checkout && copiesAvailable === 0) {
                return (
                    <Button theme='disabled' disabled={true}>
                        Reserve
                    </Button>
                );
            }
        } else {
            return (
                <div className={cn('button_block')}>
                    <Link to='/login'>
                        <Button theme='secondary'>Sign in</Button>
                    </Link>
                </div>
            );
        }
    }

    async function reserveGame() {
        const url = `/api/games/secure/checkout?gameId=${gameId}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json',
            },
        };
        const checkoutResponse = await fetch(url, requestOptions);
        if (!checkoutResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setCheckout(true);
        onCheckout(true);
    }

    return (
        <div className={cn('checkout__box')}>
            <div className={cn('upper_block')}>
                {!loadingLoans && (
                    <>
                        <Paragraph style='medium'>{`${loans}/5 games reserved`}</Paragraph>
                        <span className={cn('line')}></span>
                    </>
                )}

                {copiesAvailable > 0 ? (
                    <Heading tag='h3' style='medium--secondary'>
                        Available
                    </Heading>
                ) : (
                    <Heading tag='h3' style='medium--tertiary'>
                        Not available
                    </Heading>
                )}

                <Paragraph style='small'>
                    {copies} copies / {copiesAvailable} available
                </Paragraph>

                {buttonRender()}
            </div>
            <span className={cn('line')}></span>

            <div className={cn('bottom_block')}>
                {authState && authState.isAuthenticated && isReviewLeft && (
                    <Paragraph style='regular'>Thank you for your review!</Paragraph>
                )}

                {authState && authState.isAuthenticated && !isReviewLeft && (
                    <Paragraph style='regular'>Leave a review</Paragraph>
                )}

                {!authState.isAuthenticated && (
                    <Paragraph style='regular--gray'>Sign in to reserve games and leave reviews</Paragraph>
                )}

                <Paragraph style='regular'>This number can change until placing order has been complete.</Paragraph>
            </div>
        </div>
    );
}
