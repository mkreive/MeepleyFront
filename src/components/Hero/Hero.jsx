import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './hero.module.scss';
import HeroImage from './HeroImage';

const cn = classNames.bind(styles);

export default function Hero() {
    return (
        <div className={cn('container')}>
            <article className={cn('article')}>
                <h1>MEEPLEY</h1>
                <h2>Board game renting platform</h2>
                <p>
                    Welcome to MEEPLEY, a delightful online platform dedicated to all things board games! If you're a
                    passionate board game enthusiast like us, this is the perfect place for you to indulge in your hobby
                    and connect with a vibrant community of like-minded gamers.
                </p>
                <Link to='/games' className={cn('link')}>
                    <button>See top games</button>
                </Link>
            </article>
            <HeroImage />
        </div>
    );
}
