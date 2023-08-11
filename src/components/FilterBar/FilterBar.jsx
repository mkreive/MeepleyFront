import React from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import styles from './filter-bar.module.scss';
import Heading from '../../components/Heading/Heading';

const cn = classNames.bind(styles);

export default function FitlerBar({ filterName, filterCategories, onChange }) {
    const { t } = useTranslation();
    return (
        <div className={cn('filter__wrapper')}>
            <Heading tag='h3' style='small'>
                {t('games_search_filter')}
                {` ${filterName}`}
            </Heading>
            <div className={cn('filter__items')}>
                {filterCategories.map((category, index) => (
                    <div key={index} className={cn('checkbox__wrapper')}>
                        <input
                            type='checkbox'
                            id={category}
                            name={category}
                            value={category}
                            onChange={onChange}
                            className={cn('checkbox__input')}
                        />
                        {category.toUpperCase()}
                    </div>
                ))}
            </div>
        </div>
    );
}
