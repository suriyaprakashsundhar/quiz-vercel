import { useEffect, useState } from 'react'
import './App.css'
import questionsData from "./questions.json";

function App() {
  const [currentQuestion, setcurrentQuestion] = useState(0);
  const [score,setScore]=useState(0);
  const [showCore,setShowScore]=useState(false);
  const [timer,setTimer]=useState(10);

  useEffect(()=>{
    let interval;
    if(timer>0 && !showCore)
    {
      interval=setInterval(() => {
        setTimer((prevTimer)=>prevTimer-1);
      }, 1000);
    }   
    else
    {
      clearInterval(interval);
      setShowScore(true);
    }

    return ()=>clearInterval(interval);
  },[timer,setTimer]);

  const handleAnswer=(selectedOption)=>{
    if(selectedOption===questionsData[currentQuestion].correctOption)
    {
      setScore((prevScore)=>prevScore+1);
    }

    if(currentQuestion<questionsData.length-1)
    {
      setcurrentQuestion((prevQuestion)=>prevQuestion+1);
      setTimer(10);
    }
    else
    {
      setShowScore(true);
    }
  }

  const handleRestart=()=>{
    setcurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimer(10);
  }

  return (
    <>
      <div className='quiz-app'>
      {showCore?(    <div className='scoresection'>
          <h2 className='scoretitle'>Your Score : {score}/{questionsData.length}</h2>
          <button className='restartbtn' onClick={handleRestart}>Restart</button>
        </div>):(
           <div className='question-section'>
           <h2>TECHNICAL QUESTIONS</h2>
           <p>{currentQuestion+1}.{questionsData[currentQuestion].question}</p>
           <div className='options'>
             {questionsData[currentQuestion].options.map((option,index)=>(
              <button key={index} onClick={()=>handleAnswer(option)}>{option}</button>
             ))}
           </div>
           <div className='timer'>Time Left: <span>{timer}</span></div>
         </div>
        )}
      </div>
    </>
  )
}

export default App
