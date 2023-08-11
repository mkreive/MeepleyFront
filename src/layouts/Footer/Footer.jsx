import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import styles from './footer.module.scss';
import Paragraph from '../../components/Paragraph/Paragraph';
import { useOktaAuth } from '@okta/okta-react';

const cn = classNames.bind(styles);

export default function Header() {
    const { authState } = useOktaAuth();
    const { t } = useTranslation();

    return (
        <footer className={cn('container')}>
            <div className={cn('wrapper')}>
                <Paragraph style='regular--white'>Copyright © 2023 MEEPLEY</Paragraph>
                <nav className={cn('nav')}>
                    <Link className={cn('link')} to='/home'>
                        {t('navigation_home')}
                    </Link>
                    <Link className={cn('link')} to='/games'>
                        {t('navigation_games')}
                    </Link>

                    {authState?.accessToken?.claims.userType === 'admin' && (
                        <Link className={cn('link')} to='/admin'>
                            {t('navigation_admin')}
                        </Link>
                    )}

                    {authState?.isAuthenticated ? (
                        <Link className={cn('link')} to='/account'>
                            {t('navigation_account')}
                        </Link>
                    ) : (
                        <Link className={cn('link')} to='/login'>
                            {t('navigation_login')}
                        </Link>
                    )}
                </nav>
            </div>
        </footer>
    );
}
