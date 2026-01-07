"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog.jsx";
import { Button } from "../../../components/ui/button.jsx";
import { Input } from "../../../components/ui/input.jsx";
import { Textarea } from "../../../components/ui/textarea.jsx";
import { chatSession } from "../../../utils/GeminiAIModel.js";
import { LoaderCircle } from "lucide-react";
import { db } from "../../../utils/db.js";
import { MockInterview } from "../../../utils/schema.js";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation.js";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonresponse, setJsonResponse] = useState([]);
  const [error, setError] = useState("");
  const { user } = useUser();
  const router=useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years Of Experience: ${jobExperience}. 
    Based on the job position, description, and experience, give us ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions with answers in JSON format. 
    Use fields "question" and "answer" for each item.`;

    let parsedResponse = null;

try {
  const result = await chatSession.sendMessage(InputPrompt);
  const responseText = await result.response.text();
  const cleanedText = responseText.replace(/```json|```/g, "").trim();

  // Safely attempt to parse
  try {
    parsedResponse = JSON.parse(cleanedText);
  } catch (parseErr) {
    console.error("JSON parse error:", parseErr);
    setError("AI returned invalid JSON. Please try again.");
    setLoading(false);
    return;
  }

  setJsonResponse(parsedResponse);
} catch (error) {
  console.error("Error generating interview questions:", error);
  setError("Failed to generate interview questions. Please try again.");
  setLoading(false);
  return;
}

    if (parsedResponse) {
      try {
        const resp = await db.insert(MockInterview).values({
          mockId: uuidv4(),
          jsonMockResponse:  JSON.stringify(parsedResponse),
          jobPosition: jobPosition,
          jobDesc: jobDesc,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-YYYY"),
        }).returning({ mockId: MockInterview.mockId });

        console.log("Inserted Id:", resp);
        setJobPosition("");
        setJobDesc("");
        setJobExperience("");
        setOpenDialog(false);
        router.push('/dashboard/interview/'+resp[0]?.mockId)
      } catch (dbError) {
        console.error("Error inserting into database:", dbError);
        setError("Failed to save data. Please try again.");
      }
    } else {
      setError("No response received from AI. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg text-center">+ Add New</h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">
              Tell Us More About Your Job Interviewing?
            </DialogTitle>
            <DialogDescription>
              Add details about your job role, tech stack and experience so we can generate relevant interview questions.
            </DialogDescription>
          </DialogHeader>

          {/* ✅ Moved the form OUTSIDE of DialogDescription to avoid nesting issues */}
          <form onSubmit={onSubmit}>
            <div>
              <div className="mt-7 my-3">
                <label>Job Role/Job Position</label>
                <Input
                  placeholder="Ex. Full Stack Developer"
                  required
                  value={jobPosition}
                  onChange={(event) => setJobPosition(event.target.value)}
                />
              </div>

              <div className="my-3">
                <label>Job Description / Tech Stack (In Short)</label>
                <Textarea
                  placeholder="Ex. React, Angular, NodeJs, MySql"
                  required
                  value={jobDesc}
                  onChange={(event) => setJobDesc(event.target.value)}
                />
              </div>

              <div className="my-3">
                <label>Years of Experience</label>
                <Input
                  placeholder="Ex. 5"
                  type="number"
                  max="50"
                  required
                  value={jobExperience}
                  onChange={(event) => setJobExperience(event.target.value)}
                />
              </div>

              {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            </div>

            <div className="flex gap-5 justify-end mt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <LoaderCircle className="animate-spin mr-2" />
                    Generating From AI
                  </>
                ) : (
                  "Start Interview"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
