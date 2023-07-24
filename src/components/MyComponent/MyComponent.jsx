import classNames from 'classnames/bind';
import styles from './my-component.module.scss';

const cn = classNames.bind(styles);

export default function MyComponent() {
    return (
        <div className={cn('container')}>
            <p>My component!</p>
        </div>
    );
}
