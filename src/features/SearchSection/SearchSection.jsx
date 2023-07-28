import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './search-section.module.scss';
import Heading from '../../components/Heading/Heading';
import Paragraph from '../../components/Paragraph/Paragraph';
import SearchBar from '../../components/SearchBar/SearchBar';
import FilterBar from '../../components/FilterBar/FilterBar';

const cn = classNames.bind(styles);
const categories = [
    'strategy',
    'thematic',
    'wargame',
    'family',
    'abstract',
    'roll&write',
    'eurogame',
    'campaign',
    'deckbuilder',
    'dexterity',
    'deduction',
    'party',
    'enginebuilder',
    'memory',
    'other',
];

export default function SearchSection(props) {
    const [searchInput, setSearchInput] = useState('');
    const [searchUrl, setSearchUrl] = useState('');
    const [categorySelection, setCategorySelection] = useState([]);

    const handleSearch = (e) => {
        setSearchInput(e.target.value);
        console.log(e.type === 'click');

        if (e.type === 'click' && searchInput === '') {
            setSearchUrl('');
        } else if (e.type === 'click') {
            setSearchUrl(`/search/findByTitle?title=${searchInput}`);
        }
    };

    const handleCategorySelection = (e) => {
        console.log(e.target.value);
        setCategorySelection(...categorySelection, e.target.value);
        setSearchUrl(`/search/findByCategory?category=${e.target.value}`);
    };

    return (
        <div className={cn('container')}>
            <section className={cn('text__wrapper')}>
                <Heading tag='h1' style='medium--secondary'>
                    Board Games
                </Heading>
                <Paragraph style='big--gray'>
                    Check out our range of brand new board games, all available to rent or buy online at MEEPLEY. Order
                    today for fast home delivery internationally.
                </Paragraph>
                <SearchBar onChange={handleSearch} />
            </section>

            <FilterBar filterName={'category'} filterCategories={categories} onChange={handleCategorySelection} />
        </div>
    );
}
