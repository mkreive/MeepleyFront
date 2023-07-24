import classNames from 'classnames/bind';
import styles from './footer.module.scss';

const cn = classNames.bind(styles);

export default function Footer() {
    return (
        <footer className={cn('container')}>
            <p>Footer</p>
        </footer>
    );
}
