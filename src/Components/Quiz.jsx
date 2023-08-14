import { useState } from "react";
import { resultInitialState } from "../constants";
import "./Quiz.scss"

const Quiz = ({questions}) => {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answerIdx, setAnswerIdx] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [result, setResult] = useState(resultInitialState);
    const [showResult, setShowResult] = useState(false);

    const { question, choices, correctAnswer } = questions[currentQuestion];
    
    const onAnswerClick = (answer, index) => {
        setAnswerIdx(index);
        if (answer === correctAnswer) {
            setAnswer(true);
        } else {
            setAnswer(false);
        }
    };
   
    const onClickNext = () => {
        setAnswerIdx(null);
        setResult((prev) => 
            answer
            ?{
                ...prev,
                correctAnswers: prev.correctAnswers +1,
            } : {
                ...prev,
                wrongAnswers: prev.wrongAnswers +1,
            }
        );

        if(currentQuestion !== questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
        } else {
            setCurrentQuestion(0);
            setShowResult(true);
        }
    };

    const onTryAgain = () => {
        setResult(resultInitialState);
        setShowResult(false);
    }

    return(
        <div className="quiz-container">
            {!showResult ? (
            <>
            <h2>{question}</h2>
            <table>
                <tbody>
                    <tr>
                        {
                            choices.map((answer, index) => (
                                <td 
                                    onClick={() => onAnswerClick(answer, index)}
                                    key = {answer}
                                    className={answerIdx === index ? 'selected-answer' : null}
                                >
                                    {answer}
                                </td>
                            ))
                        }
                    </tr>
                </tbody>
            </table>
            <div className="footer-btn">
                <button onClick={onClickNext} disabled = {answerIdx === null}>
                    {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
                </button>
            </div>
            <footer>
            <span className="active-question-no">{currentQuestion+1}</span>
            <span className="total-question">/{questions.length}</span>
            </footer>
            </>) : <div className="result">
                <h3>Result</h3>
                <p>
                    Congradulations, you answered <strong><span className="span-correct">{result.correctAnswers}</span></strong>/<span className="span-total">{questions.length}</span> questions correctly.
                </p>
                <button onClick={onTryAgain}>Play one more time</button>
                </div>}
        </div>
    );
}

export default Quiz;