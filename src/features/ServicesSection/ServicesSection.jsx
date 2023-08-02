import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './services-section.module.scss';
import Heading from '../../components/Heading/Heading';
import Paragraph from '../../components/Paragraph/Paragraph';
import Button from '../../components/Button/Button';
import ServicesImage from './ServicesImage';

const cn = classNames.bind(styles);

export default function ServicesSection() {
    return (
        <div className={cn('container')}>
            <ServicesImage />
            <section className={cn('text')}>
                <Heading tag='h3' style='medium'>
                    Online Services
                </Heading>
                <Paragraph style='big--gray'>
                    Get in-depth insights and reviews from our team of expert gamers. We'll help you make informed
                    decisions about which board games are worth your time and money. Additionally, we offer
                    comprehensive guides for beginners, ensuring everyone can jump into the board game world with
                    confidence.
                </Paragraph>
                <Paragraph style='big--gray'>
                    Come, embark on an exciting journey through the world of board games with us. Whether you're here to
                    find your next favorite game, discuss tactics, or make new friends, MEEPLEY is the ultimate
                    destination for all your board game needs. Let's roll the dice and have some fun!
                </Paragraph>

                <Link to='/services' className={cn('link')}>
                    <Button theme='primary'>Services</Button>
                </Link>
            </section>
        </div>
    );
}
