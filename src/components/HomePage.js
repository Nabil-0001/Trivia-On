import QuestionBlock from './QuestionBlock';
import './homeStyles.css';

export default function HomePage() {
  return (
    <div className='main'>
      <div className='center-screen'>
        <h1 className='main-title'>Trivia-On!</h1>
        <QuestionBlock/>
      </div>
    </div>
  ) 
}