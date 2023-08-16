/* eslint-disable react/prop-types */
import styles from './Dropdown.module.sass';
import { useEffect, useState, useRef } from 'react';
import arrow from '@images/arrow.svg'
import { v4 as uuidv4 } from 'uuid';

const Dropdown = ({ label, options = [], value, setValue, error, setVacancyError = null }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(prev => !prev);
    };

    const handleOptionClick = (option) => {
        if (setVacancyError) {
            setVacancyError("");
        }

        setValue(option);
        setIsOpen(false);
    };

    useEffect(() => {
        setSelectedOption(value?.name);
    }, [value]);

    useEffect(() => {
        const handleClickOutSide = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutSide);

        return () => {
            document.removeEventListener('mousedown', handleClickOutSide);
        };
    }, []);

    return (
        <div className={styles.dropdown} ref={dropdownRef}>
            <div className={styles.name}>{label}</div>

            <div className={styles.input_block}>
                <button className={`${styles.toggle} ${error?.length > 0 ? styles.toggle_error : ""}`} style={{ color: selectedOption ? "#000" : "#C8C9CB" }} onMouseUp={toggleDropdown}>
                    <span>{selectedOption ? selectedOption : 'Обери вакансію'}</span>

                    <img style={{ transform: !isOpen ? 'rotate(360deg)' : 'rotate(180deg)' }} className={styles.arrow} src={arrow} alt="" />
                </button>

                {isOpen && (
                    <ul className={styles.list}>
                        {options?.map((option) => (
                            <li
                                key={option.id || uuidv4()}
                                className={styles.option}
                                onClick={() => handleOptionClick(option)}
                            >
                                {option.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className={styles.error}>{error}</div>
        </div>
    );
}

export default Dropdown;