import Nav from '../../components/nav/Nav';
import styles from './Admin.module.sass';
import { Route, Routes, useNavigate } from "react-router-dom";
import Create from "../create/Create";
import Forms from '../../components/forms/Forms';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Admin = () => {
    const isAuth = useSelector(state => state.user.isAuth);

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth !== true) {
            navigate("/login");
        }
    }, [isAuth, navigate])

    if (isAuth) return (
        <div className={styles.admin}>
            <Nav />

            <div className={styles.wrapper}>
                <Routes>
                    <Route exact path="/" element={<Forms />} />
                    <Route exact path="/create" element={<Create />} />
                    <Route exact path="/edit/:id" element={<Create method="edit" />} />
                </Routes>


            </div>
        </div>
    );
}

export default Admin;