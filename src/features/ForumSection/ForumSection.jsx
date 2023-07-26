import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './forum-section.module.scss';
import Heading from '../../components/Heading/Heading';
import Paragraph from '../../components/Paragraph/Paragraph';
import Button from '../../components/Button/Button';
import ForumImage from './ForumImage';

const cn = classNames.bind(styles);

export default function ForumSection() {
    return (
        <div className={cn('container')}>
            <section className={cn('text')}>
                <Heading tag='h3' style='medium'>
                    Friendly Community
                </Heading>
                <Paragraph style='big--gray'>
                    Connect with fellow board game enthusiasts in our lively forums. Share your experiences, strategies,
                    and thoughts on different games, or seek recommendations and advice from seasoned players. Our
                    forums are the heart of our community, fostering engaging discussions and lasting friendships.
                </Paragraph>
                <Link to='/forums' className={cn('link')}>
                    <Button theme='primary'>Forums</Button>
                </Link>
            </section>
            <ForumImage />
        </div>
    );
}
