import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './hero.module.scss';
import HeroImage from './HeroImage';
import Heading from '../Heading/Heading';
import Paragraph from '../Paragraph/Paragraph';
import Button from '../Button/Button';

const cn = classNames.bind(styles);

export default function Hero() {
    return (
        <div className={cn('container')}>
            <article className={cn('article')}>
                <Heading tag='h1' style='big'>
                    meepley
                </Heading>
                <Heading tag='h2' style='medium'>
                    Board game renting platform
                </Heading>
                <Paragraph style='big--gray'>
                    Welcome to MEEPLEY, a delightful online platform dedicated to all things board games! If you're a
                    passionate board game enthusiast like us, this is the perfect place for you to indulge in your hobby
                    and connect with a vibrant community of like-minded gamers.
                </Paragraph>
                <Link to='/games' className={cn('link')}>
                    <Button theme='secondary'>See top games</Button>
                </Link>
            </article>
            <HeroImage />
        </div>
    );
}
