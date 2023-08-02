import { Navigate } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import Loader from '../components/Loader/Loader';
import OktaSignInWidget from './OktaSignInWidget';

const LoginWidget = ({ config }) => {
    const { oktaAuth, authState } = useOktaAuth();
    const onSuccess = (tokens) => {
        oktaAuth.handleLoginRedirect(tokens);
    };

    const onError = (err) => {
        console.log('Sign in error: ', err);
    };

    console.log(authState);

    if (!authState) {
        return <Loader />;
    }

    return authState.isAuthenticated ? (
        <Navigate to={{ pathname: '/' }} />
    ) : (
        <OktaSignInWidget config={config} onSuccess={onSuccess} onError={onError} />
    );
};

export default LoginWidget;
