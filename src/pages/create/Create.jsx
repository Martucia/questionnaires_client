/* eslint-disable react/prop-types */
import Input from '../../components/input/Input';
import styles from './Create.module.sass';
import plus from '@images/plus.svg'
import blocks from '@images/blocks.svg'
import done from '@images/done.svg'
import { useEffect, useState } from 'react';
import { Reorder } from "framer-motion"
import QuestionSection from '../../components/questionSection/QuestionSection';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from "react-redux";
import { createForm, getForm, editForm, getVacancies } from '../../actions/forms';
import { setNotification } from '../../reducers/notificationReducer';
import { useNavigate, useParams } from 'react-router-dom';
import Dropdown from '../../components/dropdown/Dropdown';

const Create = ({ method }) => {
    const vacancies = useSelector(state => state.common.vacancies);
    const form = useSelector(state => state.form);

    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const [vacancy, setVacancy] = useState(null);
    const [vacancieError, setVacancyError] = useState("");
    const [questions, setQuestions] = useState([
        {
            order: uuidv4(),
            values: [
                {
                    question: "Ваше ім'я",
                    order: uuidv4(),
                    name: "name"
                },
                {
                    question: "Ваше прізвище",
                    order: uuidv4(),
                    name: "lastname"
                },
                {
                    question: "Номер телефону",
                    order: uuidv4(),
                    name: "phone",
                    type: {
                        "name": "Номер телефону",
                        "value": "phone",
                    }
                },
                {
                    question: "Електронна пошта",
                    order: uuidv4(),
                    name: "email",
                    type: {
                        "name": "Пошта",
                        "value": "email",
                    }
                },
                {
                    question: "Дата народження",
                    order: uuidv4(),
                    name: "brday",
                    type: {
                        "name": "Дата",
                        "value": "date",
                    }
                },
                {
                    question: "В якому місті шукаєте роботу?",
                    order: uuidv4(),
                    name: "city"
                },
                {
                    question: "Звідки ви дізналися про нашу вакансію?",
                    order: uuidv4()
                },
            ]
        }
    ]);

    const [reorderEnabled, setReorderEnabled] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        if (!vacancies) {
            dispatch(getVacancies());
        }
    }, [dispatch, vacancies]);


    useEffect(() => {
        if (method == "edit") {
            dispatch(getForm(id))
        }
    }, [dispatch, method, id]);

    useEffect(() => {
        if (form && method == "edit") {
            setName(form.name);
            setVacancy(form.vacancy)
            setQuestions(form.questions);
        }
    }, [form, method])

    const handleNewBlock = () => {
        setQuestions(prev => ([...prev, {
            order: uuidv4(),
            values: [
                {
                    question: "",
                    order: uuidv4(),
                }
            ]
        }]));
    }

    const handleNewQuestion = (blockIndex) => {
        setQuestions(prev => prev.map((block, index) => index == blockIndex
            ? {
                ...block, values: [
                    ...block.values, {
                        question: "",
                        order: uuidv4(),
                    }
                ]
            }
            : block
        ));
    }

    const handleDeleteBlock = (index) => {
        setQuestions(prev => prev.filter((bl, i) => i !== index));
    }

    const handleDeleteQuestion = (blockIndex, questIndex) => {
        setQuestions(prev => prev.map((bl, i) =>
            i === blockIndex
                ? bl.values.length === 1
                    ? null
                    : {
                        ...bl,
                        values: bl.values.filter((qst, qstIndex) => qstIndex !== questIndex),
                    }
                : bl
        ).filter(Boolean));
    };


    const handleChangeValue = (val, blockIndex, questIndex) => {
        setQuestions(prev => prev.map((bl, i) =>
            i === blockIndex
                ? {
                    ...bl, values: bl.values.map((qst, qstIndex) =>
                        qstIndex === questIndex ? { ...qst, question: val } : qst
                    )
                }
                : bl
        ));
    }

    const handleChangeType = (type, blockIndex, questIndex) => {
        setQuestions(prev => prev.map((bl, i) =>
            i === blockIndex
                ? {
                    ...bl, values: bl.values.map((qst, qstIndex) =>
                        qstIndex === questIndex ? { ...qst, type: type } : qst
                    )
                }
                : bl
        ));
    }

    const isValid = () => {
        let isEmpty = true;

        if (name.length == 0) {
            setNameError("Це поле не може бути пустим");
            isEmpty = false;
        }

        if (!vacancy) {
            setVacancyError("Це поле не може бути пустим");
            isEmpty = false;
        }

        if (questions.length == 0) {
            dispatch(setNotification("Потрібно заповнити принаймні одну сторінку анкети", false));

            isEmpty = false;
        }

        questions.forEach(bl => bl.values.forEach(qst => qst.length == 0 ? isEmpty = false : null));

        return isEmpty;
    }

    const handleCreate = async () => {
        if (isValid()) {
            if (method === "edit") {
                dispatch(editForm({ _id: form._id, vacancy, name: name.trim(), questions })).then(res => {
                    if (res) {
                        navigate("/admin");
                    }
                });
            } else {
                dispatch(createForm({ name: name.trim(), vacancy, questions })).then(res => {
                    if (res) {
                        navigate("/admin");
                    }
                });
            }
        }
    }

    if (method == "edit" && form && vacancy || method !== "edit") return (
        <div className={styles.create}>
            <div className={styles.wrapper}>
                <div className={styles.block}>
                    <Input
                        placeholder='Назва анкети'
                        value={name}
                        setValue={setName}
                        style={{ fontWeight: 700, fontSize: "24px" }}
                        error={nameError}
                        setError={setNameError}
                    />
                    <Dropdown
                        options={vacancies}
                        value={vacancy}
                        setValue={val => setVacancy(val)}
                        error={vacancieError}
                        setVacancyError={() => setVacancyError("")}

                    />
                </div>

                {reorderEnabled
                    ? (
                        <Reorder.Group
                            axis="y"
                            values={questions}
                            onReorder={setQuestions}
                        >
                            {questions.map((block, blockIndex) => (
                                <Reorder.Item
                                    key={block.order}
                                    value={block}
                                    identifier={block.order}
                                    whileDrag={{ scale: 1.05 }}
                                    style={{ marginBottom: "12px" }}
                                >
                                    <QuestionSection
                                        questions={block.values}
                                        blockIndex={blockIndex}
                                        changeValue={(val, questIndex) => handleChangeValue(val, blockIndex, questIndex)}
                                        deleteQuestion={(questIndex) => handleDeleteQuestion(blockIndex, questIndex)}
                                        addQuestion={() => handleNewQuestion(blockIndex)}
                                        deleteBlock={() => handleDeleteBlock(blockIndex)}
                                        setBlockReorderEnabled={() => setReorderEnabled(false)}
                                    />
                                </Reorder.Item>

                            ))}
                        </Reorder.Group>
                    )
                    : questions.map((block, blockIndex) => (
                        <QuestionSection
                            key={block.order}
                            questions={block.values}
                            blockIndex={blockIndex}
                            changeValue={(val, questIndex) => handleChangeValue(val, blockIndex, questIndex)}
                            changeType={(type, questIndex) => handleChangeType(type, blockIndex, questIndex)}
                            deleteQuestion={(questIndex) => handleDeleteQuestion(blockIndex, questIndex)}
                            addQuestion={() => handleNewQuestion(blockIndex)}
                            deleteBlock={() => handleDeleteBlock(blockIndex)}
                            setBlockReorderEnabled={() => setReorderEnabled(false)}
                            reorderQuestions={(newOrder) => setQuestions(prev => prev.map(bl => bl.order == block.order
                                ? { ...bl, values: newOrder }
                                : bl
                            ))}
                        />
                    ))
                }




            </div>
            <div className={styles.functional}>
                <button onClick={handleNewBlock} className={styles.plus}>
                    <img alt="Новий блок" src={plus} />
                </button>
                <button className={reorderEnabled ? styles.active : null} onClick={() => setReorderEnabled(!reorderEnabled)}>
                    <img src={blocks} alt="" />
                </button>
                <button onClick={handleCreate}>
                    <img src={done} alt="" />
                </button>
            </div>
        </div >
    );
}

export default Create;
