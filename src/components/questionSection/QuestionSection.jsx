/* eslint-disable react/prop-types */
import { Reorder } from "framer-motion";

import styles from './QuestionSection.module.sass'

import plus from '@images/plus.svg'
import trash from '@images/trash.svg'
import Question from '../question/Question';

const QuestionSection = ({ questions, changeValue, deleteQuestion, addQuestion, deleteBlock, reorderQuestions, changeType }) => {
    return (
        <div className={styles.block}>
            <Reorder.Group axis="y" onReorder={newOrder => reorderQuestions(newOrder)} values={questions}>
                {questions.map((quest, questIndex) => (
                    <Question
                        quest={quest}
                        key={quest.order}
                        changeValue={(val) => changeValue(val, questIndex)}
                        changeType={(type) => changeType(type, questIndex)}
                        deleteQuestion={() => deleteQuestion(questIndex)}
                    />
                ))}
            </Reorder.Group>


            <div style={{ width: "100%", paddingTop: "20px", display: "flex", justifyContent: "flex-end", gap: "16px" }}>
                <button onClick={addQuestion} className={styles.btn}>
                    <img style={{ width: "16px" }} src={plus} alt="" />
                </button>
                <button onClick={deleteBlock} className={styles.btn}>
                    <img src={trash} alt="" />
                </button>
            </div>
        </div>
    );
}

export default QuestionSection;