/* eslint-disable react/prop-types */
import Input from '../../components/input/Input';
import styles from './FormPage.module.sass';

const FormPage = ({ name, questions, setValue, page, lastPage, prevPage, nextPage, setError }) => {
    return (
        <div className={styles.wrapper}>
            <div style={{ display: "flex", alignItems: "center", gap: "20px", justifyContent: "space-between", marginBottom: "30px" }}>
                <h3 className={styles.name}>
                    Анкета на вакансію {name}
                </h3>
                <div className={styles.page_number}>
                    {page}/{lastPage}
                </div>
            </div>

            <div className={styles.questions}>
                {questions?.map((question, index) => (
                    <Input
                        key={question.order}
                        label={question.question}
                        placeholder='Відповідь'
                        value={question.answear || ''}
                        setValue={(val) => setValue(val, index)}
                        error={question?.error}
                        setError={(error) => setError(error, index)}
                        required={true}
                        id={question.name}
                        type={question?.type?.value}
                    />
                ))}
            </div>

            <div className={styles.btns}>
                <button disabled={page == 1} onClick={prevPage} className={styles.btn}>Назад</button>
                <button onClick={nextPage} className={styles.btn}>{lastPage == page ? "Надіслати" : "Далі"}</button>
            </div>

        </div>
    );
}

export default FormPage;