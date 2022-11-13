import React, { useState, useEffect } from 'react';
import './questionStyles.css';

export default function QuestionBlock() {
  const [data, setData] = useState(null);
  const [count, setCount] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [progFlag, setProgFlag] = useState(false);

  useEffect(() => {
    fetch('https://the-trivia-api.com/api/questions?limit=20')
      .then(response => response.json())
      .then((jsonData) => {
        setData(jsonData);
      })
      .catch((error) => {
        console.error('Something Went Wrong:', error);
      })
  }, []);
  
  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  const onAnsClick = (e, ans, correctAns) => {
    e.preventDefault();
    ans === correctAns ? setCorrect(correct + 1) : setIncorrect(incorrect + 1)

    count === 19 ? setProgFlag(true) : setCount(count + 1)
  }

  const showQuestion = (question) => {
    const answers = [question.incorrectAnswers[0], question.incorrectAnswers[1], question.incorrectAnswers[2], question.correctAnswer];
    const nuevoAns = shuffle(answers);
    return(
      <div>
        <h1 className='question-title' data-testid="question" >{question.question}</h1>
        <div className='answers'>
          <button className='button1' data-testid="button1" onClick={e => onAnsClick(e, nuevoAns[0], question.correctAnswer)}>{nuevoAns[0]}</button>
          <button className='button2' data-testid="button2" onClick={e => onAnsClick(e, nuevoAns[1], question.correctAnswer)}>{nuevoAns[1]}</button>
          <button className='button3' data-testid="button3" onClick={e => onAnsClick(e, nuevoAns[2], question.correctAnswer)}>{nuevoAns[2]}</button>
          <button className='button4' data-testid="button4" onClick={e => onAnsClick(e, nuevoAns[3], question.correctAnswer)}>{nuevoAns[3]}</button>
        </div>
      </div>
    )
  }

  const handleMoveOn = (e) => {
    setCorrect(0);
    setIncorrect(0);
    e.preventDefault();
    window.location.reload(false);
  }

  const results = () => {
    const acceptability = correct / 20;
    let message = 'Try';
    if(acceptability < 0.25 || acceptability === 0.25) message = 'You\'re helpless';
    if(acceptability > 0.25) message = 'Try harder next time';
    if(acceptability > 0.50) message = 'Not bad at all';
    if(acceptability === 1) message = 'Amazing, you\'ve aced it!';
    return (
      <>
        <h1 className='comment'>DONE!</h1>
        <h3 className='comment'> In the last 20 questions you have {correct} correct and {incorrect} wrong!</h3>
        <h3 className='comment'>{message}</h3>
        <button onClick={e => handleMoveOn(e)} className='break'>Play Again</button>
      </>
    )
  }

  const questionView = () => {
    return(
      <>
        {data ? showQuestion(data[count]) : <h1 className='question-title'>Loading...</h1>}
      </>
    )
  }

  return (
    <div>
        { progFlag ?  results() : questionView()}
    </div>
  );
}