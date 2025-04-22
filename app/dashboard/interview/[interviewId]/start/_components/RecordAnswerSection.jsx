"use client"
import  Webcam  from 'react-webcam'
import React, { useEffect , useState } from 'react'
import  Image  from 'next/image'
import { Button } from '../../../../../../components/ui/button'
import { Mic } from 'lucide-react'
import useSpeechToText from 'react-hook-speech-to-text'
import { toast } from 'sonner'
import { chatSession } from '../../../../../../utils/GeminiAIModel'
import { db } from '../../../../../../utils/db'
import { useUser } from '@clerk/nextjs'
import moment from 'moment';


function RecordAnswerSection({MockInterviewQuestion,ActiveQuestionIndex,InterviewData}) {
    const [UserAnswer,setUserAnswer] = useState('');
    const {user}=useUser();
    const [Loading,setLoading]= useState(false);
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });

      useEffect(()=>{
        results.map((result)=>(
            setUserAnswer(prevAns=>prevAns+result?.transcript)
        ))
      },[results])

      useEffect(()=>{
        if(!isRecording&&UserAnswer.length>10)
        {
          UpdateUserAnswer();
        }
        // if(UserAnswer?.length<10){
        //   setLoading(false);
        //   toast('Error While Saving Your Answer, Please Record Your Answer Again.')
        //   return;
        // }
      },[UserAnswer])

      const StartStopRecording=async()=>{
        if(isRecording){
          
          stopSpeechToText()

          

        }else{
          startSpeechToText();
        }
      }
      
      const UpdateUserAnswer=async()=>{
        console.log("⚡ Debug: UpdateUserAnswer function triggered.");
    
        // Log InterviewData to confirm its existence
        console.log("🧐 InterviewData:", InterviewData);

        if (!InterviewData || !InterviewData.mockId) {
            console.error("❌ Error: Interview data is missing or mockId is undefined.");
            toast("Error: Interview data is missing. Stopping the interview.");
            return;
        }

        if (!UserAnswer || UserAnswer.trim().length < 5) {
            console.warn("⚠️ Warning: User did not provide a valid answer.");
            toast("You did not provide an answer. The interview is stopping.");
            return;
        }

    console.log("✅ Passed initial checks. Proceeding with AI feedback request...");

        console.log(UserAnswer)
        setLoading(true)
        const feedbackPrompt="Question:"+MockInterviewQuestion[ActiveQuestionIndex]?.question+", User Answer"+UserAnswer+"Depends On Question And User Answer For Given Interview Question"+"Please Give Us Rating For Answer And Feedback As Area For Improvement, If Any"+"In Just 3 To 5 Lines TO Improve It In JSON Format With Rating Field And Feedback Field"

          const result=await chatSession.sendMessage(feedbackPrompt);

          const jsonMockResponse=(result.response.text()).replace(/```json|```/g, "").trim();
          console.log(jsonMockResponse);
          const jsonFeedbackResponse = JSON.parse(jsonMockResponse);

          const mockId = InterviewData?.mockId || "UNKNOWN_MOCK_ID"; // Default value
          console.log("🆔 Using Mock ID:", mockId); // Debugging Log


          const userAnswerData = {
            mockId: mockId,
            question: MockInterviewQuestion[ActiveQuestionIndex]?.question,
            correctAns: MockInterviewQuestion[ActiveQuestionIndex]?.answer,
            UserAns: UserAnswer,
            feedback: jsonFeedbackResponse?.feedback,
            rating: jsonFeedbackResponse?.rating,
            UserEmail: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format('DD-MM-yyyy')
            };
            
            console.log("📌 Final Data to Insert:", userAnswerData);
            

            const safeUserAnswer = UserAnswer.replace(/'/g, "''"); // Escapes single quotes
            const safeQuestion = MockInterviewQuestion[ActiveQuestionIndex]?.question.replace(/'/g, "''");
            const safeCorrectAnswer = MockInterviewQuestion[ActiveQuestionIndex]?.answer.replace(/'/g, "''");
            const safeFeedback = jsonFeedbackResponse?.feedback.replace(/'/g, "''");
            

            
            await db.execute(`
              INSERT INTO "UserAnswer" 
              ("mockId", "question", "correctAns", "UserAns", "feedback", "rating", "UserEmail", "createdAt") 
              VALUES ('${mockId}', '${safeQuestion}', '${safeCorrectAnswer}', '${safeUserAnswer}', '${safeFeedback}', '${jsonFeedbackResponse?.rating}', '${user?.primaryEmailAddress?.emailAddress}', '${moment().format('YYYY-MM-DD')}')
            `);
        


          if(Response)
          {
            toast('User Answer Recorded Successfully');
            setUserAnswer('');
            setResults([]);
          }
          setResults([]);
          
          setLoading(false);
      }


  return (
    <div className='flex items-center justify-center flex-col'>
        <div className='flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5'>
        <Image src={'/webcam.png'} width={200} height={200} 
            className='absolute'
            alt='Webcam Icon'/>
            <Webcam
            mirrored={true}
            style={{
                height:300,
                width:'100%',
                zIndex:10,
            }}
            
            /> 

            
        </div>
        <Button 
        disabled={Loading}
        variant="outline" className='my-10'
        onClick={StartStopRecording}
        >
            {isRecording?
            
            <h2 className='text-red-600 flex gap-2'>
                <Mic/>Stop Recording
            </h2>
            :
            'Record Answer'}</Button>
            
    </div>
  )
}

export default RecordAnswerSection