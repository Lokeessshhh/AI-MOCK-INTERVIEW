import { Lightbulb , Volume2 } from 'lucide-react'
import React from 'react'

function QuestionsSection({ MockInterviewQuestion, ActiveQuestionIndex }) {

  const textToSpeech=(text)=>{
    if('speechSynthesis' in window){
      const speech= new SpeechSynthesisUtterance(text)
      window.speechSynthesis.speak(speech)
    }
    else{
      alert('Sorry , Your browser does not support text-to-speech')
    }
  }

  return MockInterviewQuestion&&(
    <div className='p-5 border rounded-lg my-10'>
      <div className='grid grid-cols-2 mid:grid-cols-3 lg:grid-cols-4 gap-5'>
        {MockInterviewQuestion && MockInterviewQuestion.map((question, index) => (
          <h2
            key={index}
            className={`p-2 border-2 border-black rounded-full
              text-xs md:text-sm text-center cursor-pointer
              ${ActiveQuestionIndex==index&&'bg-purple-600 text-white'}
            `}
          >
            Question #{index + 1}
          </h2>
        ))}
      </div>
      <h2 className='my-5 text-md md:text-lg'>{MockInterviewQuestion[ActiveQuestionIndex]?.question}</h2>
      <Volume2 className='cursor-pointer' onClick={()=>textToSpeech(MockInterviewQuestion[ActiveQuestionIndex]?.question)}/>



      <div className='border rounded-lg p-5 bg-blue-100 my-10  border-black'>
        <h2 className='flex gap-2 items-center text-purple-600'>
            <Lightbulb/>
            <strong>Note: </strong>
        </h2>
        <h2 className='text-sm text-purple-800 my-2'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
      </div>


    </div>
  )
}

export default QuestionsSection
