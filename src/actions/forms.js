import axios from 'axios';
import { addForm, removeForm, setForms, updateForm } from '../reducers/formsReducer.js';
import { config } from '../common/config.js';
import { setForm } from '../reducers/formReducer.js';
import { setNotification } from '../reducers/notificationReducer.js';
import { setVacancys } from '../reducers/commonReducer.js';
import { getConfig } from '../utils/index.js';

const { GATEWAY, ROUTES } = config;

const {
    FORMS,
    VACANCIES,
    SEND
} = ROUTES;


export const createForm = (data) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(
                `${GATEWAY}/${FORMS}/`,
                data,
                getConfig()
            );

            dispatch(addForm(response.data));
            dispatch(setNotification("Анкету успішно збережено!", true));

            return true;
        } catch (e) {
            console.log(e);
            dispatch(setNotification("Помилка створення анкети", false));
            return false;
        }
    };
};

export const getForms = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(
                `${GATEWAY}/${FORMS}/`,
                getConfig()
            );

            dispatch(setForms(response.data));
        } catch (e) {
            console.log(e);
        }
    };
};

export const getForm = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(
                `${GATEWAY}/${FORMS}/${id}`
            );

            dispatch(setForm(response.data));
        } catch (e) {
            console.log(e);
        }
    }
}

export const editForm = (data) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(
                `${GATEWAY}/${FORMS}/${data._id}`,
                data,
                getConfig()
            );

            dispatch(updateForm(response.data));
            dispatch(setNotification("Анкету успішно збережено!", true));

            return true;
        } catch (e) {
            console.log(e);
            dispatch(setNotification("Помилка збереження анкети", false));
            return false;
        }
    }
}

export const deleteForm = (id) => {
    return async (dispatch) => {
        try {
            await axios.delete(
                `${GATEWAY}/${FORMS}/${id}`,
                getConfig()
            );

            dispatch(removeForm(id));
            dispatch(setNotification("Анкету успішно видалино!", true));
        } catch (e) {
            console.log(e);
            dispatch(setNotification("Помилка видалення анкети", false));
        }
    }
}

export const getVacancies = () => {
    return async (dispatch) => {
        try {
            const response = await axios.post(
                `${GATEWAY}/${FORMS}/${VACANCIES}`,
                getConfig()
            );

            dispatch(setVacancys(response.data));

        } catch (e) {
            console.log(e);
            dispatch(setNotification(`Помилка ${e}`, false));
        }
    }
}

export const sendForm = (data) => {
    return async (dispatch) => {
        try {
            await axios.post(
                `${GATEWAY}/${FORMS}/${SEND}`,
                { ...data, new: "true" }
            );

            return true;
        } catch (e) {
            console.log(e);
            dispatch(setNotification(`Помилка ${e}`, false));
            return true;
        }
    }
}

