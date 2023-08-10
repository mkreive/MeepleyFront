import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import styles from './hero.module.scss';
import HeroImage from './HeroImage';
import Heading from '../Heading/Heading';
import Paragraph from '../Paragraph/Paragraph';
import Button from '../Button/Button';

const cn = classNames.bind(styles);

export default function Hero() {
    const { t } = useTranslation();
    return (
        <div className={cn('container')}>
            <article className={cn('article')}>
                <Heading tag='h1' style='big'>
                    meepley
                </Heading>
                <Heading tag='h2' style='medium'>
                    {t('home_hero_heading')}
                </Heading>
                <Paragraph style='big--gray'>{t('home_hero_paragraph')}</Paragraph>
                <Link to='/games' className={cn('link')}>
                    <Button theme='secondary'>{t('home_hero_button')}</Button>
                </Link>
            </article>
            <HeroImage />
        </div>
    );
}
