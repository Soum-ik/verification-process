import { useState, useEffect } from "react";
import Button from "./shared/Button";
import LoadingDiv from "./shared/LoadingDiv";

interface QuestionData {
    id: string;
    question: string;
    options: { label: string; value: string }[];
    compatibleAnswer: string; // Add the correct answer to the structure
}

const Qa = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [questions, setQuestions] = useState<QuestionData[]>([]);
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [results, setResults] = useState<{ right: number; wrong: number }>({
        right: 0,
        wrong: 0,
    });
    const [score, setScore] = useState<number | null>(null); // Store score

    localStorage.setItem('score', JSON.stringify(score));
    localStorage.setItem('results', JSON.stringify(results));


    // Fetch questions from API
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8000/api/brands/compatibility-questions/1"
                );
                const data = await response.json();
                console.log(data, "questions data checking");

                // Transform the API response to match the component's state structure
                const formattedQuestions = data.data.map((item: { id: number; question: string; answer01: string; answer02: string; compatibleAnswer: string }) => ({
                    id: item.id.toString(),
                    question: item.question,
                    options: [
                        { label: item.answer01, value: item.answer01.toLowerCase() },
                        { label: item.answer02, value: item.answer02.toLowerCase() },
                    ],
                    compatibleAnswer: item.compatibleAnswer.toLowerCase(), // Correct answer
                }));

                setQuestions(formattedQuestions);
            } catch (error) {
                console.error("Error fetching questions:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    // Handler to update the answer
    const handleAnswerChange = (questionId: string, answer: string) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
    };

    // Calculate right and wrong answers
    const calculateResults = () => {
        let right = 0;
        let wrong = 0;

        questions.forEach((question) => {
            const userAnswer = answers[question.id];
            if (userAnswer) {
                if (userAnswer === question.compatibleAnswer) {
                    right++;
                } else {
                    wrong++;
                }
            }
        });
        let correctAnswers = 0;

        questions.forEach((question) => {
            if (answers[question.id] === question.compatibleAnswer) {
                correctAnswers++;
            }
        });

        const percentage = (correctAnswers / questions.length) * 100;
        setScore(percentage);
        setResults({ right, wrong });

    };

    if (isLoading) {
        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 mx-auto min-h-screen">
                <LoadingDiv text="Loading questions..." />
            </div>
        );
    }

    return (
        <div className="min-h-[80vh] w-[360px] p-[20px] mt-[30px] flex items-center justify-center flex-col mx-auto">
            <h1 className="font-Inter text-headingColor pb-[10px] font-bold text-[24px] text-center leading-[30px]">
                Quick Q&A
            </h1>
            <p className="text-center text-[#6F6464] font-Inter text-[14px] font-normal leading-[18px]">
                Just answer the questions and we are done
            </p>
            <div className="space-y-[40px] mt-[32px]">
                {questions.map((question) => (
                    <QuestionComponent
                        handleAnswerChange={handleAnswerChange}
                        questionData={question}
                        key={question.id}
                        selectedAnswer={answers[question.id]}
                    />
                ))}
            </div>
            <div className="flex items-start space-x-3 bg-white rounded-md max-w-md pt-[40px]">
                <input
                    type="checkbox"
                    className="form-checkbox size-[24px] text-blue-600 rounded-sm border-gray-300 focus:ring-blue-500"
                />
                <p className="text-paraColor text-[12px] font-normal leading-[16px] font-Inter">
                    To the best of my knowledge I have provided accurate information about
                    myself.
                </p>
            </div>
            <Button
                text="Finish"
                link="/final-status"
                onClick={() => calculateResults()}
            />
        </div>
    );
};

interface QuestionComponentProps {
    questionData: QuestionData;
    handleAnswerChange: (questionId: string, answer: string) => void;
    selectedAnswer: string;
}

const QuestionComponent = ({
    questionData,
    handleAnswerChange,
    selectedAnswer,
}: QuestionComponentProps) => {
    return (
        <div>
            <h1 className="text-headingColor self-stretch font-Inter w-full text-[14px] font-normal leading-[18px]">
                {questionData.question}
            </h1>
            {questionData.options?.map((option, index) => (
                <label
                    key={index}
                    className={`mt-[5px] flex px-[16px] py-[12px] border-[1px] rounded-md ${selectedAnswer === option.value
                        ? "border-[#B8CBFC] bg-custom-blue"
                        : "border-borderColor"
                        }`}
                >
                    <input
                        type="radio"
                        name={questionData.id}
                        value={option.value}
                        className="form-radio size-[18px] text-blue-600"
                        onChange={() => handleAnswerChange(questionData.id, option.value)}
                        checked={selectedAnswer === option.value}
                        required
                    />
                    <span className={`ml-2  leading-[16px] text-[12px]  ${selectedAnswer === option.value ? 'text-headingColor' : ' text-[#6F6464]'}`}> {option.label}</span>
                </label>
            ))
            }
        </div >
    );
};

export default Qa;
