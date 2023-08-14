import Quiz from "./Components/Quiz";
import { useState, useEffect } from "react";
//import { jsQuizz } from "./constants";

function App() {

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    try {
      const response = await fetch("https://opentdb.com/api.php?amount=10&category=27&type=multiple");
      const questionsResponse = await response.json();
      const loadedQuestions = questionsResponse.results.map((result) => ({
        question: result.question,
      choices: result.incorrect_answers.concat(result.correct_answer),
      correctAnswer: result.correct_answer,
      }));
      //console.log(questionsResponse);
      setQuestions(loadedQuestions);
    } catch (error){
      console.log(error);
    }
  }

  return questions.length >0 ? <Quiz questions={questions} /> : <p>Loading...</p>;
}

export default App
