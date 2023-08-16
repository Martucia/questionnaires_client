import axios from 'axios';
import { config } from '../common/config.js';
import { logout, setUser } from '../reducers/usersRudecur.js';
import { setNotification } from '../reducers/notificationReducer.js';
import { getConfig } from '../utils/index.js';

const { GATEWAY, ROUTES } = config;

const {
    AUTH,
    LOGIN
} = ROUTES;

export const login = (data) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${GATEWAY}/${AUTH}/${LOGIN}`, data)

            dispatch(setUser(response.data.user))

            localStorage.setItem('token', response.data.token)
            return response.data;
        } catch (e) {
            dispatch(setNotification(e.response.data.message, false));
            return e;
        }
    }
}

export const auth = () => {
    return async dispatch => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${GATEWAY}/${AUTH}/`, getConfig())

                dispatch(setUser(response.data.user))

                localStorage.setItem('token', response.data.token)
            } else {
                dispatch(logout());
            }
        } catch (e) {
            localStorage.removeItem('token');
            dispatch(logout());
        }
    }
}