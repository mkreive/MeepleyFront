import { createPortal } from 'react-dom';
import classNames from 'classnames/bind';
import styles from './modal.module.scss';

const cn = classNames.bind(styles);

export default function Modal() {
    return <>{createPortal(<div className={cn('container')}></div>, document.body)}</>;
}
