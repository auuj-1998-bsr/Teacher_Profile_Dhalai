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

            console.log(response.data.allData);

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

                    question.options.push(item.option_text);
                });

                return result;
            };

            const formatted = formatQuizData(response.data.allData);

            console.log("formatted:", formatted);

            setQuiz(formatted);

        } catch (err) {
            console.error(err.message);
        }
    };
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
          {q.options.map((opt, i) => (
            <label
              key={i}
              className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <input
                type="radio"
                name={`question-${q.id}`}
                className="accent-blue-500"
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>

      </div>
    ))}
  </div>
</div>
  )
};