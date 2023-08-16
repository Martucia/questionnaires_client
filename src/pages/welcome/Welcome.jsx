/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";

import styles from './Welcome.module.sass';

const Welcome = ({ name, setPage }) => {
    return (
        <div className={styles.welcome}>
            <h2 className={styles.title}>
                Анкета на вакансію {name}
            </h2>
            <h3 className={styles.subtitle}>
                Вітаємо Вас в центрі тестування і оцінки персоналу компанії "Пандарум"
            </h3>
            <p className={styles.description}>
                <span>
                    Ми дякуємо Вам за увагу до нашої пропозиції про роботу. На цій сторінці Ви можете заповнити анкету.
                </span>

                <span>
                    Всі пункти меню обов'язкові до заповнення, якщо у Вас немає чого написати, тоді так і пишіть "відсутня інформація з цього питання", якщо поле залишити порожнім, анкета не відправиться. Заповнення анкети триватиме близько 15 хвилин.
                </span>

                <span>
                    Якщо виникли питання або проблеми в проходженні анкети зателефонуйте <NavLink to="tel:+380970000000">+38(097)-000-0000</NavLink>  або напишіть нам в телеграм <NavLink target="_blank" rel="noopener noreferrer" to="">@robota</NavLink>.
                </span>
            </p>

            <button className={styles.btn} onClick={() => setPage(0)}>
                Розпочати
            </button>
        </div>
    );
}

export default Welcome;