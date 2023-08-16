import styles from './Login.module.sass';
import Input from '../../components/input/Input';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/users';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const isAuth = useSelector(state => state.user.isAuth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) {
            navigate('/admin');
        }
    }, [isAuth, navigate])

    const validate = () => {
        let isValid = true;

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (email.length === 0) {
            isValid = false;
            setEmailError("Не може бути пустим");
        }

        if (password.length === 0) {
            isValid = false;
            setPasswordError("Не може бути пустим");
        }

        if (!emailRegex.test(email)) {
            setEmailError("Некоректна пошта");
        }

        return isValid;
    }

    const handleSubmit = () => {
        if (validate()) {
            dispatch(login({ email, password })).then(res => {
                if (res.token) {
                    navigate('/admin');
                }
            });
        }
    }

    return (
        <div className={styles.auth}>
            <h3 className={styles.title}>
                Авторизація
            </h3>

            <Input
                placeholder='Електрона пошта'
                value={email}
                setValue={setEmail}
                error={emailError}
                setError={setEmailError}
            />

            <Input
                placeholder='Пароль'
                value={password}
                setValue={setPassword}
                error={passwordError}
                setError={setPasswordError}
                type="password"
            />

            <button onClick={handleSubmit} className={styles.btn}>
                Увійти
            </button>
        </div>
    );
}

export default Login;