"use client"
import { db } from '../../../../../utils/db';
import { MockInterview } from '../../../../../utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '../../../../../components/ui/button';
import Link from 'next/link';

function StartInterview({params}) {

    const [InterviewData,setInterviewData] = useState();
    const [MockInterviewQuestion,setMockInterviewQuestion] =useState();
    const [ActiveQuestionIndex,setActiveQuestionIndex] = useState(0);
    useEffect(()=>{
        GetInterviewDetails();
    },[]);

    const GetInterviewDetails = async () => {
            const result = await db.select().from(MockInterview)
            .where(eq(MockInterview.mockId, params.interviewId));
            

            const jsonMockResponse =JSON.parse(result[0].jsonMockResponse)
            console.log(jsonMockResponse)
            setMockInterviewQuestion(jsonMockResponse);
            setInterviewData(result[0]);
        }
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        {/* Questions */}
        <QuestionsSection 
        MockInterviewQuestion={MockInterviewQuestion}
        ActiveQuestionIndex={ActiveQuestionIndex}
        />


        {/* Audio And Video */}
        <RecordAnswerSection
        MockInterviewQuestion={MockInterviewQuestion}
        ActiveQuestionIndex={ActiveQuestionIndex}
        InterviewData={InterviewData}
        />
      </div>
      <div className='flex justify-end gap-6'> 
       { ActiveQuestionIndex>0 && 
       <Button onClick={()=>setActiveQuestionIndex(ActiveQuestionIndex-1)}>Previous Question</Button>}
       { ActiveQuestionIndex!=MockInterviewQuestion?.length-1 && 
       <Button onClick={()=>setActiveQuestionIndex(ActiveQuestionIndex+1)}>Next Question</Button>}
       { ActiveQuestionIndex==MockInterviewQuestion?.length-1 && 
       <Link href={'/dashboard/interview/'+InterviewData?.mockId+'/feedback'}>
       <Button>End Interview</Button>
       </Link>}
      </div>
    </div>
  )
}

export default StartInterview