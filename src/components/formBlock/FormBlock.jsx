/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { useDispatch } from "react-redux";

import { setNotification } from '../../reducers/notificationReducer';
import { formatDate } from '../../utils';

import styles from './FormBlock.module.sass';

import copy from '@images/copy.svg';
import trash from '@images/trash.svg';
import edit from '@images/edit.svg';
import { setConfirm } from '../../reducers/commonReducer';
import { deleteForm } from '../../actions/forms';


const FormBlock = ({ name, createdAt, _id }) => {

    const dispatch = useDispatch();

    const handleCopy = () => {
        const text = `${window.location.host}/form/${_id}`

        clipboardCopy(text)
            .then(() => {
                dispatch(setNotification(`Текст скопійовано в буфер обміну`, true));
            })
            .catch(err => {
                dispatch(setNotification(`Помилка при копіюванні: ${err}`, false));
            });
    }

    const openConfirm = () => {
        dispatch(setConfirm("Ви впевнені?", "Видалити", () => deleteForm(_id)))
    }

    return (
        <div className={styles.block}>
            <NavLink to={"/form/" + _id} className={styles.name}>
                {name}
            </NavLink>
            <div className={styles.date}>
                {formatDate(createdAt)}
            </div>
            <div className={styles.btns}>
                <button onClick={handleCopy}>
                    <img src={copy} alt="" />
                </button>
                <button onClick={openConfirm}>
                    <img src={trash} alt="" />
                </button>

                <NavLink to={"/admin/edit/" + _id} >
                    <img src={edit} alt="" />
                </NavLink>
            </div>
        </div>
    );
}

export default FormBlock;