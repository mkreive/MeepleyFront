import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './filter-bar.module.scss';
import Heading from '../../components/Heading/Heading';

const cn = classNames.bind(styles);

export default function SearchSection({ filterName, filterCategories, onChange }) {
    return (
        <div className={cn('filter__wrapper')}>
            <Heading tag='h3' style='small'>
                {`Filter by ${filterName}`}
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
