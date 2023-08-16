/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import IMask from 'imask';

import styles from './Input.module.sass';

const Input = ({
    label = "",
    value,
    placeholder = "",
    type = "text",
    name,
    setValue,
    error = "",
    setError,
    style = {},
    required = false,
    id
}) => {
    const handleChange = (e) => {
        setValue(e.target.value);

        if (error.length > 0) {
            setError("");
        }
    }

    useEffect(() => {
        if (id == "phone") {
            const element = document.getElementById('phone');

            const maskOptions = {
                mask: '+{38}{\\0}000000000'
            };
            const mask = IMask(element, maskOptions);

            return () => {
                mask.destroy();
            };
        }
    }, [id]);

    return (
        <label className={styles.label} htmlFor={name}>
            <div className={styles.name}>{label} {required && label.length > 0 && <span className={styles.required}>*</span>}</div>

            <div className={styles.block}>
                {type == "textarea" && id !== "phone"
                    ? (
                        <textarea
                            className={`${styles.input} ${error.length > 0 ? styles.input_error : ""}`}
                            onChange={handleChange}
                            value={value}
                            placeholder={placeholder}
                            name={name}
                            rows={3}
                        />
                    )
                    : (

                        <input
                            style={style}
                            className={`${styles.input} ${error.length > 0 ? styles.input_error : ""}`}
                            onChange={handleChange}
                            value={value}
                            placeholder={placeholder}
                            name={name}
                            id={id}
                            type={type}
                        />
                    )}
            </div>

            <div className={styles.error}>{error}</div>
        </label>

    );
}

export default Input;