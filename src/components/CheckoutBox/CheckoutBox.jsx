import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { fetchLoans } from '../../utils/fetchLoans';
import { fetchCheckout } from '../../utils/fetchCheckout';
import classNames from 'classnames/bind';
import styles from './checkout-box.module.scss';
import Heading from '../Heading/Heading';
import Paragraph from '../Paragraph/Paragraph';
import Button from '../Button/Button';

const cn = classNames.bind(styles);

export default function CheckoutBox({
    copies,
    copiesAvailable,
    authState,
    gameId,
    onCheckout,
    isReviewLeft,
    onReviewSubmit,
}) {
    const { t } = useTranslation();
    const [loans, setLoans] = useState(0);
    const [loadingLoans, setLoadingLoans] = useState(true);
    const [loansError, setLoansError] = useState(false);

    const [checkout, setCheckout] = useState(false);
    const [loadingCheckout, setLoadingCheckout] = useState(true);
    const [checkoutError, setCheckoutError] = useState(false);

    const [gameReview, setGameReview] = useState('');
    const [gameRating, setGameRating] = useState(5);
    const [reviewSubmited, setReviewSubmited] = useState(false);

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
        if (authState && authState?.isAuthenticated) {
            if (!checkout && loans < 5 && copiesAvailable > 0) {
                return (
                    <Button theme='secondary' onClick={reserveGame}>
                        {t('checkout_box_reserve_button')}
                    </Button>
                );
            } else if (checkout) {
                return <Paragraph style='regular--bold'>{t('checkout_box_reserve_success')}</Paragraph>;
            } else if (!checkout && loans === 5) {
                return <Paragraph style='regular--tertiary'>{t('checkout_box_reserve_toomany')}</Paragraph>;
            } else if (!checkout && copiesAvailable === 0) {
                return (
                    <Button theme='disabled' disabled={true}>
                        {t('checkout_box_reserve_button')}
                    </Button>
                );
            }
        } else {
            return (
                <Link to='/login'>
                    <Button theme='secondary'>{t('checkout_box_signin_button')}</Button>
                </Link>
            );
        }
    }

    function reviewRender() {
        if (authState?.isAuthenticated && !isReviewLeft) {
            return (
                <form action='POST' className={cn('review')}>
                    <label className={cn('review__label')}>
                        <textarea
                            id='gameReview'
                            className={cn('review__input')}
                            placeholder={t('checkout_box_textarea_placeholder')}
                            rows={6}
                            onChange={(e) => setGameReview(e.target.value)}
                        ></textarea>
                    </label>
                    <Button theme='primary' onClick={submitReview}>
                        {t('checkout_box_review_button')}
                    </Button>
                </form>
            );
        } else if (authState?.isAuthenticated && isReviewLeft) {
            return <Paragraph style='regular'>{t('checkout_box_review_thankyou')}</Paragraph>;
        }
        return <Paragraph style='regular--gray'>{t('checkout_box_review_signin')}</Paragraph>;
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
            throw new Error(t('checkout_box_error'));
        }
        setCheckout(true);
        onCheckout(true);
    }

    async function submitReview() {
        const url = `/api/reviews/secure`;
        const requestOptions = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ gameRating, gameReview, gameId }),
        };

        const returnResponse = await fetch(url, requestOptions);
        if (!returnResponse.ok) {
            throw new Error(t('checkout_box_error'));
        }
        setReviewSubmited(true);
        onReviewSubmit(true);
    }

    return (
        <div className={cn('checkout__box')}>
            <div className={cn('upper_block')}>
                {!loadingLoans && (
                    <>
                        <Paragraph style='medium'>
                            {loans}
                            {loans === 1 ? t('checkout_box_game_reserved') : t('checkout_box_games_reserved')}
                        </Paragraph>
                        <span className={cn('line')}></span>
                    </>
                )}

                {copiesAvailable > 0 ? (
                    <Heading tag='h3' style='medium--secondary'>
                        {t('checkout_box_available')}
                    </Heading>
                ) : (
                    <Heading tag='h3' style='medium--tertiary'>
                        {t('checkout_box_notavailable')}
                    </Heading>
                )}

                <Paragraph style='small'>
                    {copies}/{copiesAvailable}
                    {copies === 1 ? t('checkout_box_copyavailable') : t('checkout_box_copiesavailable')}
                </Paragraph>

                {buttonRender()}
            </div>
            <span className={cn('line')}></span>

            <div className={cn('bottom_block')}>
                <Paragraph style='regular'> {t('checkout_box_paragraph')}</Paragraph>

                {reviewRender()}
            </div>
        </div>
    );
}
