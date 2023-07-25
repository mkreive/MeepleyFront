import classNames from 'classnames/bind';
import styles from './paragraph.module.scss';

const cn = classNames.bind(styles);

export default function Paragraph({ style, children }) {
    return <p className={cn(style)}>{children}</p>;
}
