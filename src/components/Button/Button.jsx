import classNames from 'classnames/bind';
import styles from './button.module.scss';

const cn = classNames.bind(styles);

export default function Button({ children, onClick, theme, type = 'button' }) {
    return (
        <button onClick={onClick} type={type} className={cn('btn', theme)}>
            {children}
        </button>
    );
}
