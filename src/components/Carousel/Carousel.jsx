import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './carousel.module.scss';
import GameBox from '../../components/GameBox/GameBox';
import LeftArrow from '../Arrows/LeftArrow';
import RightArrow from '../Arrows/RightArrow';

const cn = classNames.bind(styles);

export default function Carousel(props) {
    const { loading, items, error } = props;
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 3;
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const handlePrevClick = () => {
        setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
    };

    const handleNextClick = () => {
        setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
    };

    const startIndex = currentPage * itemsPerPage;
    const endIndex = (currentPage + 1) * itemsPerPage;
    const visibleItems =
        items.slice(startIndex, endIndex).length === itemsPerPage
            ? items.slice(startIndex, endIndex)
            : [...items.slice(startIndex), ...items.slice(0, endIndex % items.length)];

    return (
        <div className={cn('wrapper')}>
            <LeftArrow onClick={handlePrevClick} />
            {visibleItems.map((item, index) => (
                <GameBox key={index} game={item} />
            ))}
            <RightArrow onClick={handleNextClick} />
        </div>
    );
}
