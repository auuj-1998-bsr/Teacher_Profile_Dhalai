import { useState } from "react";
import { ApiData } from "../services/api"
import { useEffect } from "react";

export default function TeachersQuiz() {
    const [quiz, setQuiz] = useState([]);
    const [options,setOptions] =useState([]);

    useEffect(() => {
        getQuizQuestions();
    }, []);

    const getQuizQuestions = async () => {
        try{
        const response = await ApiData.post("/teachersQuiz");
        console.log("hello quiz");
        console.log(response.data.allQuestion);
        setQuiz(response.data.allQuestion);
        setOptions(response.data.allOptions);
        }
        catch(err){
           console.error(err.message);
        }
    }
    console.log(quiz);
    console.log(options);
    return (
        <>
        <h1>Quiz Questions</h1>
        <div>
             {quiz.map((q)=>(
            <div key={q.id}>
                <p><span>{q.id}</span>. {q.question}</p>
            </div>
        ))}
        </div>
        </>
    )
};