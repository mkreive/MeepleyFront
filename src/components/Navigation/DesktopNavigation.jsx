import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import styles from './navigation.module.scss';
import { LANGUAGES } from '../../constants';

const cn = classNames.bind(styles);

export default function DesktopNavigation({ loggedIn, onLogout, isAdmin }) {
    const { i18n, t } = useTranslation();
    const [selected, setSelected] = useState('en');

    const onChangeLang = (e) => {
        const lang_code = e.target.value;
        i18n.changeLanguage(lang_code);
        setSelected(lang_code);
    };

    return (
        <nav className={cn('nav--desktop')}>
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

            <form className={cn('select')}>
                {LANGUAGES.map(({ code, label }) => (
                    <label key={code} htmlFor={code} className={cn('link')}>
                        <input
                            onChange={onChangeLang}
                            className={cn('input')}
                            name='radio-group'
                            type='radio'
                            value={code}
                            checked={selected === code}
                            id={code}
                        />
                        {label}
                    </label>
                ))}
            </form>
        </nav>
    );
}
