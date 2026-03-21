import { useState } from "react";
import { ApiData } from "../services/api"
import { useEffect } from "react";

export default function TeachersQuiz() {
    const [quiz, setQuiz] = useState();

    useEffect(() => {
        getQuizQuestions();
    }, []);

    const getQuizQuestions = async () => {
        try{
        const response = await ApiData.post("/teachersQuiz");
        console.log("hello quiz");
        console.log(response.data.allQuestion);
        setQuiz(response.data.allQuestion);
        }
        catch(err){
           console.error(err.message);
        }
    }
    return (
        <>
        <h1>hwlll</h1>
        {/* <h1>Quiz Questions</h1>
        {quiz.map((q)=>{
            <div key={q.id}>
                <p>{q.Questions}</p>
            </div>
        })} */}
        </>
    )
};