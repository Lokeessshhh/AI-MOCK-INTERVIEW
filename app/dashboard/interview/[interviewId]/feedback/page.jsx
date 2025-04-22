"use client"
import { eq} from 'drizzle-orm';
import { db } from '../../../../../utils/db'
import { UserAnswer } from '../../../../../utils/schema'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'; //
import { Button } from '../../../../../components/ui/button';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "../../../../../components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
  


function Feedback() {

    const params = useParams(); // ✅ Get params object
    

    const [FeedbackList , setFeedbackList] = useState([]);
    const router=useRouter();
    useEffect(()=>{
        GetFeedback();
    },[])

    const GetFeedback=async()=>{
        const result=await db.select()
        .from (UserAnswer)
        .where(eq(UserAnswer.mockIdRef,params.interviewId))
        .orderBy(UserAnswer.id);

        console.log(result);
        setFeedbackList(result);
    }
  return (
    <div className='p-10'>
        
        {FeedbackList?.length==0?
        <h2 className='font-bold text-xl text-gray-500'>No Interview Record Found</h2>
          :
        <>
        <h2 className='text-3xl font-bold text-green-500'>Congratulations</h2>
        <h2 className='font-bold text-2xl'>Here Is Your Interview Feedback : </h2>
        
        <h2 className='text-purple-600 text-2xl my-3'>
          Your Overall Interview Rating :  
          <strong>
            {FeedbackList.length > 0 
              ? (FeedbackList.reduce((sum, item) => sum + Number(item.rating), 0) / FeedbackList.length).toFixed(1) + "/10"
              : "N/A"}
          </strong>
        </h2>



        <h2 className='text-sm text-gray-500'>Find Below Interview Question With Correct Answer , Your Answer & Feedback For Improvement</h2>
        {FeedbackList&&FeedbackList.map((item,index)=>(
            <Collapsible key={index} className='mt-7'>
            <CollapsibleTrigger className='cursor-pointer p-2  flex justify-between bg-secondary rounded-lg my-2 text-left gap-7 w-full'>
            {item.question} <ChevronsUpDown className='h-5 w-5'/>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className='flex flex-col gap-2'>
                <h2 className='text-red-500 p-2 border rounded-lg '><strong>Rating : </strong>{item.rating}</h2>
                <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer : </strong>{item.UserAns}</h2>
                <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct Answer : </strong>{item.correctAns}</h2>
                <h2 className='p-2 border rounded-lg bg-purple-50 text-sm text-purple-600'><strong>Feedback : </strong>{item.feedback}</h2>

              </div>
            </CollapsibleContent>
          </Collapsible>
          
        ))}

      </>}   

        <Button onClick={()=>router.replace('/dashboard')}>Go Home</Button>
    </div>

  )
}

export default Feedback