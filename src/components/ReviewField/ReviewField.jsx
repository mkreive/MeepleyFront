import classNames from 'classnames/bind';
import styles from './review-field.module.scss';
import Button from '../Button/Button';
import Card from '../Card/Card';

const cn = classNames.bind(styles);

export default function ReviewField({ onReviewSubmit }) {
    return (
        <div className={cn('container')}>
            <Card>
                <input>Leave a review...</input>
                <Button theme='primary'>Submit</Button>
            </Card>
        </div>
    );
}
