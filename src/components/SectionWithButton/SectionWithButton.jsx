import React from 'react';
import { Link } from 'react-router-dom';
import Heading from '../../components/Heading/Heading';
import Paragraph from '../../components/Paragraph/Paragraph';
import Button from '../../components/Button/Button';
import classNames from 'classnames/bind';
import styles from './section-with-button.module.scss';

const cn = classNames.bind(styles);

export default function SectionWithButton({ title, text, button, link }) {
    return (
        <div className={cn('text')}>
            <Heading tag='h2' style='medium--primary'>
                {title}
            </Heading>
            <Paragraph theme='regular'>{text}</Paragraph>
            <Link to={link} className={cn('link')}>
                <Button theme='secondary'>{button}</Button>
            </Link>
        </div>
    );
}
