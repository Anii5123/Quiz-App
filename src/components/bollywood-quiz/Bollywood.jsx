import React, { useState, useRef, useEffect } from 'react';
import './Quiz.css';
import { bollywood } from '../../assets/data';
import { useNavigate } from 'react-router-dom';

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const getRandomQuestions = (bollywood) => {
  const shuffled = shuffleArray([...bollywood]);
  return shuffled.slice(0, 5);
};

const Bollywood = () => {
  const [questions, setQuestions] = useState(getRandomQuestions(bollywood));
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(questions[0]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);

  const optionArray = [Option1, Option2, Option3, Option4];

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    if (timeLeft === 0) {
      clearInterval(timer);
      setResult(true);
    }

    return () => clearInterval(timer);
  }, [timeLeft]);

  const checkAns = (e, ans) => {
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add('correct');
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add('wrong');
        optionArray[question.ans - 1].current.classList.add('correct');
      }
      setLock(true);
    }
  };

  const next = () => {
    if (lock) {
      if (index === questions.length - 1) {
        setResult(true);
        return;
      }
      setIndex((prevIndex) => prevIndex + 1);
      setQuestion(questions[index + 1]);
      setLock(false);
      optionArray.forEach((option) => {
        option.current.classList.remove('wrong');
        option.current.classList.remove('correct');
      });
    }
  };

  const reset = () => {
    const newQuestions = getRandomQuestions(bollywood);
    setQuestions(newQuestions);
    setIndex(0);
    setQuestion(newQuestions[0]);
    setScore(0);
    setLock(false);
    setResult(false);
    setTimeLeft(60);
  };

  const backToSelection = () => {
    navigate('/');
  };

  return (
    <div className='container'>
      <div className='timer'>Time left: {timeLeft} seconds</div>
      <h1>BOLLYWOOD-QUIZ</h1>
      <hr />
      {result ? (
        <>
          <h2>Your Score {score} out of {questions.length}</h2>
          <button onClick={reset}>Reset</button>
          <button onClick={backToSelection}>Back to Selection</button>
        </>
      ) : (
        <>
          <h2>{index + 1}. {question.question}</h2>
          <ul>
            <li ref={Option1} onClick={(e) => checkAns(e, 1)}>{question.Option1}</li>
            <li ref={Option2} onClick={(e) => checkAns(e, 2)}>{question.Option2}</li>
            <li ref={Option3} onClick={(e) => checkAns(e, 3)}>{question.Option3}</li>
            <li ref={Option4} onClick={(e) => checkAns(e, 4)}>{question.Option4}</li>
          </ul>
          <button onClick={next}>Next</button>
          <div className='index'>{index + 1} to {questions.length} questions</div>
        </>
      )}
    </div>
  );
};

export default Bollywood;
