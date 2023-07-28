import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './search-section.module.scss';
import Heading from '../../components/Heading/Heading';
import Paragraph from '../../components/Paragraph/Paragraph';
import SearchBar from '../../components/SearchBar/SearchBar';
import FilterBar from '../../components/FilterBar/FilterBar';

const cn = classNames.bind(styles);
const gameCategories = [
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
    'dice',
    'solo',
];

const complexityCategories = ['easy', 'medium', 'complex'];

export default function SearchSection(props) {
    const [searchInput, setSearchInput] = useState('');
    const [categorySelection, setCategorySelection] = useState([]);
    const [complexitySelection, setComplexitySelection] = useState('');

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleSearch = () => {
        props.onSearch(searchInput);
        setSearchInput('');
    };

    const handleCategorySelection = (e) => {
        setCategorySelection(...categorySelection, e.target.value);
        props.onCategorySelection(e.target.value);
    };

    const handleComplexitySelection = (e) => {
        setComplexitySelection(e.target.value);
        props.onComplexitySelection(complexitySelection);
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
                <SearchBar onChange={handleInputChange} onSearch={handleSearch} />
            </section>

            <FilterBar filterName={'category'} filterCategories={gameCategories} onChange={handleCategorySelection} />

            <FilterBar
                filterName={'complexity'}
                filterCategories={complexityCategories}
                onChange={handleComplexitySelection}
            />
        </div>
    );
}
