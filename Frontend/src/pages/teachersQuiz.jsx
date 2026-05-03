import { useState, useEffect } from "react";
import { ApiData } from "../services/api";
import { jwtDecode } from "jwt-decode";

export default function TeachersQuiz() {
    const [quiz, setQuiz] = useState([]);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [resultStatus, setResultStatus] = useState(null);
    const [certificate, setCertificate] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        getQuizQuestions();
    }, []);

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
                id: item.id,
                text: item.option_text,
                is_correct: item.is_correct
            });
        });
        return result;
    };

    const getQuizQuestions = async () => {
        try {
            const token = localStorage.getItem("token");
            const decoded = jwtDecode(token);

            const response = await ApiData.post("/teachersQuiz", {
                teacher_code: decoded.teacher_code,
                teacher_name: decoded.teacher_name,
            });

            console.log("API Response:", response.data);

            if (response.data.resultData) {
                setCertificate(response.data.resultData);
                setSubmitted(true);
                return;
            }

            // Quiz data format 
            const formatted = formatQuizData(response.data.allData);
            setQuiz(formatted);

        } catch (err) {
            console.error("Quiz Error:", err.message);
        }
    };

    const handleSelect = (questionId, optionText) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: optionText
        }));
    };

    const handleSubmit = async () => {
        //Score calculate 
        let total = 0;
        quiz.forEach((q) => {
            const correct = q.options.find(opt => opt.is_correct);
            if (correct && answers[q.id] === correct.text) {
                total++;
            }
        });

        const status = total >= 7 ? "Pass" : "Fail";
        setScore(total);
        setResultStatus(status);
        setSubmitted(true);

        /// Result save
        try {
            const token = localStorage.getItem("token");
            const decoded = jwtDecode(token);

            const response = await ApiData.post("/teachersQuiz", {
                teacher_code: decoded.teacher_code,
                teacher_name: decoded.teacher_name,
                score: total,
                resultStatus: status,
                attempt: 1,
            });

            if (response.data.resultData) {
                setCertificate(response.data.resultData);
            }
        } catch (err) {
            console.error("Submit Error:", err.message);
        }
    };

    //  Certificate screen
    if (submitted && certificate) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
                <div className="bg-white w-[600px] p-8 border-4 border-blue-500 rounded-xl shadow-lg text-center">
                    <h1 className="text-3xl font-bold text-blue-600 mb-4">
                        Certificate of Achievement
                    </h1>
                    <p className="text-gray-600 mb-2">This is to certify that</p>
                    <h2 className="text-2xl font-semibold text-red-500 mb-4">
                        {certificate.teacher_name || certificate.teacher_code}
                    </h2>
                    <p className="text-gray-600 mb-4">
                        has successfully completed the Quiz
                    </p>
                    <p className="text-xl font-bold text-green-600 mb-6">
                        Score: {certificate.score} / {quiz.length || 20}
                    </p>
                    <p className="text-lg font-bold text-yellow-500 mb-2">
                        Result: {certificate.score >= 7 ? "✅ Pass" : "❌ Fail"}
                    </p>
                    <p className="text-lg text-gray-700">🎉 Congratulations!</p>
                </div>
            </div>
        );
    }

    // Quiz screen
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Quiz Questions</h1>

            {quiz.length > 0 ? (
                <div className="space-y-4 max-w-2xl mx-auto">
                    {quiz.map((q, index) => (
                        <div key={q.id} className="bg-white shadow-md rounded-xl p-5">
                            <h2 className="text-lg font-semibold mb-4">
                                {index + 1}. {q.question}
                            </h2>

                            {/* q.options use karo, q.option_text nahi */}
                            <div className="space-y-2">
                                {q.options.map((opt) => (
                                    <label
                                        key={opt.id}
                                        className={`flex items-center gap-2 p-2 rounded cursor-pointer border
                                            ${score !== null && opt.is_correct
                                                ? "bg-green-100 border-green-500"
                                                : ""}
                                            ${score !== null && answers[q.id] === opt.text && !opt.is_correct
                                                ? "bg-red-100 border-red-400"
                                                : ""}
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
                            disabled={score !== null}
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-600 disabled:opacity-50"
                        >
                            {score !== null ? "Submitted ✅" : "Submit Quiz"}
                        </button>
                    </div>

                    {score !== null && (
                        <h2 className="text-center text-xl font-bold mt-4">
                            Score: {score} / {quiz.length} — Result: {score >= 7 ? "✅ Pass" : "❌ Fail"}
                        </h2>
                    )}
                </div>
            ) : (
                <p className="text-center text-gray-500">Loading questions...</p>
            )}
        </div>
    );
}