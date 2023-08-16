import { NavLink } from 'react-router-dom';

import FormBlock from '../formBlock/FormBlock';
import styles from './Forms.module.sass';

import plus from '@images/plus.svg'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getForms } from '../../actions/forms';

const Forms = () => {
    const forms = useSelector(state => state.forms);

    const dispatch = useDispatch();

    useEffect(() => {
        if (forms == null) {
            dispatch(getForms());
        }
    }, [forms])

    return (
        <div className={styles.forms}>
            <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "12px" }}>
                <NavLink to="/admin/create" className={styles.btn}>
                    <img src={plus} alt="" />
                    Додати нову
                </NavLink>
            </div>
            <div className={styles.list}>
                {forms?.map(form => (
                    <FormBlock key={form._id} {...form} />
                ))}
            </div>
        </div>
    );
}

export default Forms;