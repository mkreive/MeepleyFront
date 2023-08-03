import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './navigation.module.scss';

const cn = classNames.bind(styles);

export default function MobileNavigation({ onClick, loggedIn, onLogout }) {
    return (
        <nav onClick={onClick} className={cn('nav--mobile')}>
            <Link className={cn('link')} to='/home'>
                Home
            </Link>
            <Link className={cn('link')} to='/games'>
                Games
            </Link>
            <Link className={cn('link')} to='/forums'>
                Forums
            </Link>
            {loggedIn && (
                <Link className={cn('link')} to='/account'>
                    Account
                </Link>
            )}

            {loggedIn && (
                <Link className={cn('link')} to='/services'>
                    Services
                </Link>
            )}
            {!loggedIn ? (
                <Link className={cn('link')} to='/login'>
                    Login
                </Link>
            ) : (
                <Link className={cn('link')} onClick={onLogout}>
                    Logout
                </Link>
            )}
        </nav>
    );
}
