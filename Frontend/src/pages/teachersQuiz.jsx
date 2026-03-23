import { useState } from "react";
import { ApiData } from "../services/api"
import { useEffect } from "react";

export default function TeachersQuiz() {
    const [quiz, setQuiz] = useState([]);

    useEffect(() => {
        getQuizQuestions();
    }, []);

    const getQuizQuestions = async () => {
        try {
            const response = await ApiData.post("/teachersQuiz");
            console.log("hello quiz");
            console.log(response.data.alldata);
            setQuiz(response.data.alldata);
        }
        catch (err) {
            console.error(err.message);
        }
    }
    console.log(quiz);
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold text-center mb-6">
                Quiz Questions
            </h1>
            <div className="max-w-2xl mx-auto space-y-6">
                {quiz.map((q, index) => (
                    <div key={q.id} className="bg-white shadow-md rounded-xl p-5">
                        <h2 className="text-lg font-semibold mb-4">
                            {index + 1}. {q.question}
                        </h2>
                        <div className="space-y-2">
                            {q?.map((opt) => (
                                <label
                                    key={opt.id}
                                    className="flex items-center gap-2 p-2 border rounded-lg"
                                >
                                    <input
                                        type="radio"
                                        name={`question-${q.id}`}
                                    />
                                    <span>{opt.option_text}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};