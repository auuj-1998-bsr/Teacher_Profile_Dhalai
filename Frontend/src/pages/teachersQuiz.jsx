import { useState } from "react";
import { ApiData } from "../services/api"
import { useEffect } from "react";

export default function TeachersQuiz() {
    const [quix, setQuiz] = useState();

    useEffect(() => {
        getQuizQuections();
    }, []);

    const getQuizQuections = async () => {
        try{
        const response = await ApiData.post("/teachersQuiz");
        console.log(response.data.allQuection);
        setQuiz(response.data.allQuection);
        }
        catch(err){
           console.error(err.message);
        }
    }
    return (
        <>
        </>
    )
};