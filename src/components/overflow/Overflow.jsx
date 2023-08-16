/* eslint-disable react/prop-types */
import styles from './Overflow.module.sass';
import { useState } from 'react';

const Overflow = ({ children, close = null, isCenter = false, zIndex = 10 }) => {
    const [isMouseReleasedOnOverflow, setIsMouseReleasedOnOverflow] = useState(false);

    const handleMouseDown = (e) => {
        if (e.target == e.currentTarget && e.button === 0) {
            setIsMouseReleasedOnOverflow(true);
        }
    };

    const handleClose = (e) => {
        if (e.target === e.currentTarget && e.target.id == "overflow" && isMouseReleasedOnOverflow && close) {
            close();
        } else {
            setIsMouseReleasedOnOverflow(false);
        }
    }

    return (
        <div
            id="overflow"
            className={`${styles.overflow} ${isCenter && styles.overflow_center}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleClose}
            style={{ zIndex: zIndex }}
        >
            {children}
        </div>
    );
}

export default Overflow;