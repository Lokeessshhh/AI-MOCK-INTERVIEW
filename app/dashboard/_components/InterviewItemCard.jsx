import React from 'react'
import { Button } from "../../../components/ui/button.jsx";
import Link from 'next/link'
import { useRouter } from 'next/navigation';
function InterviewItemCard({interview}) {
    
    const router = useRouter();

    const onStart=()=>{
        router.push("/dashboard/interview/"+interview?.mockId)
    }

    const onFeedbackPress=()=>{
        router.push("/dashboard/interview/"+interview?.mockId+"/feedback")
    }

  return (
    <div className='border shadow-sm rounded-lg p-3 '>
        <h2 className='font-bold text-purple-600 text-3xl'>{interview?.jobPosition}</h2>
        <h2 className=' text-sm text-gray-600'>{interview?.jobExperience} Years Of Experience</h2>
        <h2 className='text-xs text-gray-400'>Created At : {interview.createdAt}</h2>
        <div className='flex justify-between mt-2 gap-5'>

            <Button size="sm" variant="outline" className='w-35'
            onClick={onFeedbackPress}
            >feedback</Button>
            
            <Button size="sm"  className='w-35 bg-purple-600'
            onClick={onStart}
            >Start</Button>
        </div>
    </div>
  )
}

export default InterviewItemCard