import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './signup-section.module.scss';
import Heading from '../../components/Heading/Heading';
import Paragraph from '../../components/Paragraph/Paragraph';
import Button from '../../components/Button/Button';
import SignupImage from './SignupImage';

const cn = classNames.bind(styles);

export default function SignupSection(props) {
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
                <Link to='/signup' className={cn('link')}>
                    <Button theme='secondary'>Sign up</Button>
                </Link>
            </section>
            <SignupImage />
        </div>
    );
}
