import React from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import styles from './search-bar.module.scss';
import Button from '../../components/Button/Button';

const cn = classNames.bind(styles);

export default function SearchBar(props) {
    const { t } = useTranslation();
    return (
        <div className={cn('wrapper')}>
            <input
                type='search'
                placeholder={t('games_search_bar_placeholder')}
                onChange={props.onChange}
                className={cn('field')}
                value={props.value}
            />
            <Button theme='primary' onClick={props.onSearch}>
                {t('games_search_bar_button')}
            </Button>
        </div>
    );
}
