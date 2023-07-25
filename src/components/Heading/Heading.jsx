import classNames from 'classnames/bind';
import styles from './heading.module.scss';

const cn = classNames.bind(styles);

export default function Heading({ tag, style, children }) {
    const Tag = tag;
    return <Tag className={cn(style)}>{children}</Tag>;
}
