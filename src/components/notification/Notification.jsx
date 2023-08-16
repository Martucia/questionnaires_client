import { useState, useEffect } from 'react';
import styles from './Notification.module.sass';
import { useDispatch, useSelector } from 'react-redux';
import { closeNotification } from '../../reducers/notificationReducer';

const Notification = () => {
    const text = useSelector(state => state.notification.text);
    const status = useSelector(state => state.notification.status);
    const [notificationClass, setNotificationClass] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        setNotificationClass('show');

        const hideTimeout = setTimeout(() => {
            setNotificationClass('hide');
        }, 4000);

        const closeTimeout = setTimeout(() => {
            dispatch(closeNotification());
        }, 5000);

        return () => {
            clearTimeout(hideTimeout);
            clearTimeout(closeTimeout);
        };
    }, [dispatch]);

    return (
        <div className={`${styles.notification} ${styles[notificationClass]}`} style={{ borderLeft: `2px solid ${status ? "green" : "#d10404"}` }}>
            {text}
        </div>
    );
}

export default Notification;
