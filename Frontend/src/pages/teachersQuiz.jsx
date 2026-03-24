import { useState, useEffect } from "react";
import { ApiData } from "../services/api";

export default function TeachersQuiz() {
    const [quiz, setQuiz] = useState([]);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [resultStatus, setResultStatus] = useState(null);

    useEffect(() => {
        getQuizQuestions();
    }, [resultStatus]);
    console.log(answers);
    const getQuizQuestions = async () => {
        try {
            const response = await ApiData.post("/teachersQuiz", resultStatus,score);
            const formatQuizData = (data) => {
                const result = [];
                data.forEach((item) => {
                    let question = result.find(q => q.id === item.question_id);
                    if (!question) {
                        question = {
                            id: item.question_id,
                            question: item.question,
                            options: []
                        };
                        result.push(question);
                    }
                    question.options.push({
                        text: item.option_text,
                        is_correct: item.is_correct
                    });
                });
                return result;
            };

            const formatted = formatQuizData(response.data.allData);
            setQuiz(formatted);
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleSelect = (questionId, optionText) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: optionText
        }));
    };

    const handleSubmit = () => {
        let total = 0;
        quiz.forEach((q) => {
            const correct = q.options.find(opt => opt.is_correct);
            if (correct && answers[q.id] === correct.text) {
                total++;
            }
        });
        setScore(total);
        setResultStatus(total == null ? "Panding" : total >= 7 ? "Pass" : "Fail");
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <h1 className="text-2xl font-bold text-center mb-6">
                Quiz Questions
            </h1>
            <div className="space-y-4">
                {quiz.map((q, index) => (
                    <div key={q.id} className="bg-white shadow-md rounded-xl p-5">

                        <h2 className="text-lg font-semibold mb-4">
                            {index + 1}. {q.question}
                        </h2>

                        <div className="space-y-2">
                            {q.options.map((opt, i) => (
                                <label
                                    key={i}
                                    className={`flex items-center gap-2 p-2 cursor-pointer 
                  ${score !== null && opt.is_correct ? "bg-green-100 border-green-500" : ""}
                  ${score !== null && answers[q.id] === opt.text && !opt.is_correct ? "bg-red-100 border-red-400" : ""}
                  hover:bg-gray-50`}
                                >
                                    <input
                                        type="radio"
                                        name={`question-${q.id}`}
                                        value={opt.text}
                                        checked={answers[q.id] === opt.text}
                                        onChange={() => handleSelect(q.id, opt.text)}
                                        disabled={score !== null}
                                        className="accent-blue-500"
                                    />
                                    <span>{opt.text}</span>
                                </label>
                            ))}
                        </div>

                    </div>
                ))}

                <div className="text-center">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-600"
                    >
                        Submit Quiz
                    </button>
                </div>


                {score !== null && (
                    <h2 className="text-center text-xl font-bold mt-4">
                        Score: {score} / {quiz.length}  Result: {score > 7 ? "Pass" : "Fail"}
                    </h2>
                )}

            </div>
        </div>
    );
}