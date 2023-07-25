import classNames from 'classnames/bind';
import styles from './card.module.scss';

const cn = classNames.bind(styles);

export default function Card(props) {
    const { children } = props;

    return <div className={cn('container')}>{children}</div>;
}
