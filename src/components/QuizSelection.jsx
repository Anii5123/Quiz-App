import React from 'react';
import { useNavigate } from 'react-router-dom';
import './QuizSelection.css';

const QuizSelection = () => {
  const navigate = useNavigate();

  const handleQuizSelection = (quiz) => {
    const url = `/${quiz.toLowerCase()}`;
    navigate(url); 
  };

  return (
    <div className="container">
      <h1>Select a Quiz</h1>
      <button onClick={() => handleQuizSelection('Blockchain')}>Blockchain Quiz</button>
      <button onClick={() => handleQuizSelection('Bollywood')}>Bollywood Quiz</button>
      <button onClick={() => handleQuizSelection('Cricket')}>Cricket Quiz</button>
      <button onClick={() => handleQuizSelection('Gk')}>General Knowledge Quiz</button>
    </div>
  );
};

export default QuizSelection;
