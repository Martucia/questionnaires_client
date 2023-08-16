import styles from './Nav.module.sass';
import { NavLink } from 'react-router-dom';
import forms from '@images/forms.svg'

const Nav = () => {
    return (
        <nav className={styles.nav}>
            <NavLink className={({ isActive }) => (isActive ? styles.active : styles.link)} to="/admin">
                <img src={forms} alt="" />
                Анкети
            </NavLink>
            {/* <NavLink to="/admin/forms">
                <img src={forms} alt="" />
                Анкети
            </NavLink> */}
        </nav>
    );
}

export default Nav;