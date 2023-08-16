import { NavLink } from "react-router-dom";

import logo from '@images/logo.png'
import phone from "@images/phone.svg"
import telegram from "@images/telegram.svg"

import styles from "./Header.module.sass";
import { useSelector } from "react-redux";


const Header = () => {
    const isAuth = useSelector(state => state.user.isAuth);

    return (
        <div className={styles.header}>
            <NavLink className={styles.logo} to="/admin">
                <img src={logo} alt="" />
            </NavLink>

            {isAuth
                ? <div className={styles.links}>
                    <NavLink to="/admin">
                        Адмінка
                    </NavLink>
                </div>
                : <div className={styles.links}>
                    <NavLink to="tel:+380970000000">
                        <img src={phone} alt="" />
                        +38(097)-000-0000
                    </NavLink>
                    <NavLink target="_blank" rel="noopener noreferrer">
                        <img src={telegram} alt="" />
                        Телеграм
                    </NavLink>
                </div>
            }


        </div>
    );
}

export default Header;