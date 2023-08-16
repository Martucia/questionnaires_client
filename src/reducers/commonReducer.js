const SET_CONFIRM = 'SET_CONFIRM';
const CLOSE_CONFIRM = 'CLOSE_CONFIRM';
const SET_VACANCIES = 'SET_VACANCIES';

const defaultState = {
    confirm: {
        isOpen: false,
        alert: "",
        btnText: "",
        onSubmit: null
    },
    vacancies: null,
    site: "panda"
};

export default function commonReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_CONFIRM:
            return {
                ...state,
                confirm: { ...action.payload, isOpen: true },
            }
        case CLOSE_CONFIRM:
            return {
                ...state,
                confirm: { ...state.confirm, isOpen: false },
            }
        case SET_VACANCIES:
            return {
                ...state,
                vacancies: action.payload
            }
        default:
            return state;
    }
}

export const setConfirm = (alert, btnText, onSubmit) => ({
    type: SET_CONFIRM,
    payload: { alert, btnText, onSubmit },
});

export const closeConfirm = () => ({
    type: CLOSE_CONFIRM
});

export const setVacancys = (vacancies) => ({
    type: SET_VACANCIES,
    payload: vacancies
})