import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuizSelection from './components/QuizSelection';
import Blockchain from './components/blockchain-quiz/Blockchain';
import Bollywood from './components/bollywood-quiz/Bollywood';
import Cricket from './components/cricket-quiz/Cricket';
import Gk from './components/Gk-quiz/Gk';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizSelection />} />
        <Route path="/blockchain" element={<Blockchain />} />
        <Route path="/bollywood" element={<Bollywood />} />
        <Route path="/cricket" element={<Cricket />} />
        <Route path="/gk" element={<Gk />} />
      </Routes>
    </Router>
  );
};

export default App;
