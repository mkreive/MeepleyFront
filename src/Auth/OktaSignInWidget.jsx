import React, { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './okta-signin-widget.module.scss';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import { oktaConfig } from '../lib/oktaConfig';

const cn = classNames.bind(styles);

const OktaSignInWidget = ({ onSuccess, onError }) => {
    const widgetRef = useRef();

    useEffect(() => {
        if (!widgetRef.current) {
            return false;
        }

        const widget = new OktaSignIn(oktaConfig);

        widget
            .showSignInToGetTokens({
                el: widgetRef.current,
            })
            .then(onSuccess)
            .catch(onError);

        return () => widget.remove();
    }, [onSuccess, onError]);

    return (
        <div className={cn('container')}>
            <div className={cn('widget')} ref={widgetRef}></div>
        </div>
    );
};

export default OktaSignInWidget;
