import React, { useState, useEffect } from 'react';

// tuple for question and answer pair
type QuestionAnswerPair = [string, number];

// Interface for game stats
interface GameStats {
  total: number;
  correct: number;
}

// Our MathGame component
const MathGame: React.FC = () => {
  // State using let and const - ES6 features
  let [question, setQuestion] = useState<QuestionAnswerPair>(['', 0]); 
  const [answer, setAnswer] = useState<string>('');
  const [stats, setStats] = useState<GameStats>({ total: 0, correct: 0 });

  // Generate a random arithmetic question - ES6 features, functions
  const generateQuestion = (): void => {
    const operators = ['+', '-', '*', '/'];
    const num1 = Math.floor(Math.random() * 100);
    const num2 = Math.floor(Math.random() * 100);
    const operator = operators[Math.floor(Math.random() * operators.length)];

    // Use eval for quick calc - security concern in real apps
    const questionStr: string = `${num1} ${operator} ${num2}`;
    const correctAnswer: number = Math.floor(eval(questionStr));
    
    setQuestion([questionStr, correctAnswer]);
  };

  // Arrow function - ES6 feature
  useEffect(() => {
    generateQuestion();
  }, []);

  // Handle answer submission
  const handleSubmit = () => {
    const userAnswer = parseInt(answer);
    setStats(prev => ({
      total: prev.total + 1,
      correct: prev.correct + (userAnswer === question[1] ? 1 : 0)
    }));
    generateQuestion();
    setAnswer('');
  };

  // Input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  // JSX rendering
  return (
    <div>
      <div>
        <h2>Math Game</h2>
        <div>Question: {question[0]}</div>
        <input value={answer} onChange={handleChange} />
        <button onClick={handleSubmit}>Submit</button>
        <div>Total Questions: {stats.total}</div>
        <div>Correct Answers: {stats.correct}</div>
      </div>
    </div>
  );
};

export default MathGame;

