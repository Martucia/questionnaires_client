/* eslint-disable react/prop-types */
import { Reorder, useDragControls } from "framer-motion";

import { ReorderIcon } from '../reorderIcon/ReorderIcon';
import Input from '../input/Input';

import plus from '@images/plus.svg'
import Dropdown from "../dropdown/Dropdown";

import styles from './Question.module.sass';

const types = [
    {
        "name": "Рядок",
        "value": "text",
    },
    {
        "name": "Поле",
        "value": "textarea",
    },
    {
        "name": "Дата",
        "value": "date",
    },
    {
        "name": "Номер телефону",
        "value": "phone",
    },
    {
        "name": "Пошта",
        "value": "email",
    }
]

const Question = ({ quest, changeValue, deleteQuestion, changeType }) => {

    const dragControls = useDragControls();

    return (
        <Reorder.Item
            value={quest}
            id={quest}
            dragListener={false}
            dragControls={dragControls}
            style={{ display: "flex", width: "100%", gap: "5px", marginBottom: "20px" }}
        >
            <ReorderIcon
                dragControls={dragControls}
            />
            <div className={styles.block}>
                <div className={styles.input}>
                    <Input
                        placeholder='Запитання'
                        value={quest.question}
                        setValue={(val) => changeValue(val)}
                    />
                </div>

                <div className={styles.drop}>
                    <Dropdown
                        options={types}
                        value={quest.type || types[0]}
                        setValue={type => changeType(type)}
                    />
                </div>


                <button className={styles.btn} onClick={deleteQuestion}>
                    <img style={{ width: "12px", transform: "rotate(45deg)" }} src={plus} alt="" />
                </button>


            </div>
        </Reorder.Item>
    );
}

export default Question;