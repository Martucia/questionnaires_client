/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';

import styles from './Confirm.module.sass';
import Overflow from '../overflow/Overflow'

import { closeConfirm } from '../../reducers/commonReducer';

const Confirm = () => {
    const confirm = useSelector(state => state.common.confirm);

    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(closeConfirm());
    }

    const handleOnSumbit = () => {
        dispatch(confirm.onSubmit());

        dispatch(closeConfirm());
    }

    return (
        <Overflow isCenter={true}>
            <div className={styles.confirm}>
                <h4 className={styles.title}>Точно?</h4>

                <div className={styles.text} style={{ textAlign: "center" }}>
                    {confirm.alert}
                </div>

                <div className={styles.btns}>
                    <button onClick={handleClose} className={`${styles.btn} ${styles.cancel}`}>
                        Скасувати
                    </button>

                    <button onClick={handleOnSumbit} className={`${styles.btn} ${styles.accept}`}>
                        {confirm.btnText}
                    </button>
                </div>
            </div>
        </Overflow>
    );
}

export default Confirm;