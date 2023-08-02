import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './signup-section.module.scss';
import Heading from '../../components/Heading/Heading';
import Paragraph from '../../components/Paragraph/Paragraph';
import Button from '../../components/Button/Button';
import SignupImage from './SignupImage';

const cn = classNames.bind(styles);

export default function SignupSection() {
    return (
        <div className={cn('container')}>
            <section className={cn('text')}>
                <Heading tag='h3' style='medium'>
                    Board game renting platform
                </Heading>
                <Paragraph style='big--gray'>
                    If you're unsure about investing in a board game, worry not! Board Game Haven offers a convenient
                    rental service, allowing you to try out games before making a commitment. Additionally, if you have
                    board games gathering dust on your shelves, you can also sell or trade them within our community.
                </Paragraph>
                <Paragraph style='big--gray'>
                    To join our bustling community of board game enthusiasts, simply sign up for a free account on our
                    website. Once you're in, you'll have access to all our fantastic features and be able to engage with
                    fellow gamers who share the same love for tabletop gaming.
                </Paragraph>
                <Link to='/login' className={cn('link')}>
                    <Button theme='secondary'>Sign In</Button>
                </Link>
            </section>
            <SignupImage />
        </div>
    );
}
