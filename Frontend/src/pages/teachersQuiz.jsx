import { useState } from "react";
import { ApiData } from "../services/api"
import { useEffect } from "react";

export default function TeachersQuiz() {
    const [quix, setQuiz] = useState();

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
        <h1>helo</h1>
        </>
    )
};