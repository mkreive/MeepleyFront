import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import styles from './navigation.module.scss';

const cn = classNames.bind(styles);

export default function MobileNavigation({ onClick, loggedIn, onLogout }) {
    const { t } = useTranslation();
    return (
        <nav onClick={onClick} className={cn('nav--mobile')}>
            <Link className={cn('link')} to='/home'>
                {t('navigation_home')}
            </Link>
            <Link className={cn('link')} to='/games'>
                {t('navigation_games')}
            </Link>

            {loggedIn && (
                <Link className={cn('link')} to='/account'>
                    {t('navigation_account')}
                </Link>
            )}

            {isAdmin && (
                <Link className={cn('link')} to='/admin'>
                    {t('navigation_admin')}
                </Link>
            )}

            {!loggedIn ? (
                <Link className={cn('link')} to='/login'>
                    {t('navigation_login')}
                </Link>
            ) : (
                <Link className={cn('link')} onClick={onLogout}>
                    {t('navigation_logout')}
                </Link>
            )}
        </nav>
    );
}
