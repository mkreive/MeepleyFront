import React from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import classNames from 'classnames/bind';
import styles from './footer.module.scss';
import Paragraph from '../../components/Paragraph/Paragraph';
import { useOktaAuth } from '@okta/okta-react';

const cn = classNames.bind(styles);

export default function Header() {
    const isMobile = useMediaQuery({ query: '(max-width: 700px)' });
    const { authState } = useOktaAuth();

    return (
        <header className={cn('container')}>
            <div className={cn('wrapper')}>
                <Paragraph style='regular--white'>Copyright © 2023 MEEPLEY</Paragraph>
                <nav className={cn('nav')}>
                    <Link className={cn('link')} to='/home'>
                        Home
                    </Link>
                    <Link className={cn('link')} to='/games'>
                        Games
                    </Link>
                    <Link className={cn('link')} to='/forums'>
                        Forums
                    </Link>

                    {authState?.isAuthenticated && (
                        <Link className={cn('link')} to='/account'>
                            Account
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
}
