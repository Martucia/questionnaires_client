import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Form.module.sass';

import { getForm, sendForm } from '../../actions/forms';
import { useParams } from 'react-router-dom';
import Welcome from '../welcome/Welcome';
import FormPage from '../formPage/FormPage.jsx';
import Finish from '../finish/Finish';

const Form = () => {
    const [page, setPage] = useState(false);
    const [answer, setAnswer] = useState([]);

    const form = useSelector(state => state.form);

    const dispatch = useDispatch();

    const { id } = useParams();

    useEffect(() => {
        if (id && !form || id !== form._id) {
            dispatch(getForm(id));
        } else {
            setAnswer(form.questions);
        }
    }, [dispatch, form, id])

    const handlePrevPage = () => {
        if (page > 0) {
            setPage(prev => prev - 1);
        }
    }

    const setError = (error, blIndex, qstIndex) => {
        setAnswer(prev => prev.map((bl, i) => i == blIndex ? { ...bl, values: bl.values.map((qst, index) => index == qstIndex ? { ...qst, error: error } : qst) } : bl))
    }

    const isValid = (data) => {
        let isValid = true;

        data.forEach((question, index) => {
            if (question?.type?.value === "email") {
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

                if (!emailRegex.test(question.answear)) {
                    setError("Некоректна пошта", page, index);
                    isValid = false;
                }

            } else if (!question.answear || question.answear.trim() === "") {
                setError("Не може бути пустим", page, index);
                isValid = false;
            }
        });

        return isValid;
    }

    const handleNextPage = () => {
        if (page + 1 < form.questions.length) {
            if (isValid(answer[page].values)) {
                setPage(prev => prev + 1);
            }
        } else {
            if (isValid(answer[page].values)) {
                dispatch(sendForm({ answer, formId: id })).then(res => {
                    if (res) {
                        setPage("finish");
                    }
                })
            }
        }
    }

    const handleChangleValue = (val, qstIndex, blIndex) => {
        setAnswer(prev => prev.map((bl, i) => i == blIndex ? { ...bl, values: bl.values.map((qst, index) => index == qstIndex ? { ...qst, answear: val } : qst) } : bl))
    }

    if (form) return (
        <div className={page !== "finish" && styles.form}>
            {!page && page !== 0
                ? <Welcome name={form.name} setPage={setPage} />
                : page === "finish"
                    ? <Finish />
                    : <FormPage
                        name={form.name}
                        questions={answer[page].values}
                        page={page + 1}
                        lastPage={form.questions.length}
                        prevPage={handlePrevPage}
                        nextPage={handleNextPage}
                        setValue={(val, qstIndex) => handleChangleValue(val, qstIndex, page)}
                        setError={(error, qstIndex) => setError(error, page, qstIndex)}
                    />
            }
        </div>
    );
}

export default Form;