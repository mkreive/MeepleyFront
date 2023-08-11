import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
    'rollwrite',
    'euro',
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
    const { t } = useTranslation();

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleSearch = () => {
        props.onSearch(searchInput);
        setSearchInput('');
    };

    return (
        <div className={cn('container')}>
            <section className={cn('text__wrapper')}>
                <Heading tag='h1' style='medium--secondary'>
                    {t('games_search_heading')}
                </Heading>
                <Paragraph style='big--gray'>{t('games_search_paragraph')}</Paragraph>
                <SearchBar onChange={handleInputChange} onSearch={handleSearch} value={searchInput} />
            </section>

            <FilterBar
                filterName={t('games_search_filterName1')}
                filterCategories={gameCategories}
                onChange={(e) => props.onCategorySelection(e.target.value)}
            />

            <FilterBar
                filterName={t('games_search_filterName2')}
                filterCategories={complexityCategories}
                onChange={(e) => props.onComplexitySelection(e.target.value)}
            />
        </div>
    );
}
