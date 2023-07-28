import React from 'react';
import classNames from 'classnames/bind';
import styles from './search-bar.module.scss';
import Button from '../../components/Button/Button';

const cn = classNames.bind(styles);

export default function SearchBar(props) {
    return (
        <div className={cn('wrapper')}>
            <input type='search' placeholder='Search games' onChange={props.onChange} className={cn('field')} />
            <Button theme='primary' onClick={props.onSearch}>
                Search
            </Button>
        </div>
    );
}
