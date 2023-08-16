import Overflow from '../../components/overflow/Overflow';
import styles from './Finish.module.sass';

import { NavLink } from 'react-router-dom';

const Finish = () => {
    return (
        <Overflow isCenter={true}>
            <div className={styles.finish}>
                <h3 className={styles.title}>
                    Ваша анкета успішно надіслана!
                </h3>
                <div className={styles.desc}>
                    Очікуйте дзвінка нашого HR менеджера
                </div>
                <NavLink className={styles.btn} to="/admin">
                    Повернутись на сайт
                </NavLink>
            </div>
        </Overflow>

    );
}

export default Finish;