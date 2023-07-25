import classNames from 'classnames/bind';
import styles from './loader.module.scss';

const cn = classNames.bind(styles);

export default function Loader({ message = 'Loading... Please wait' }) {
    return (
        <div className={cn('container')}>
            <div className={cn('spinner')}></div>
            <div className={cn('text')}>{message}</div>
        </div>
    );
}
