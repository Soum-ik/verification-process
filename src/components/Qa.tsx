import { useState } from "react";
import { QuestionData } from "../interface/QA.interface";
import Button from "./shared/Button";
import LoadingDiv from "./shared/LoadingDiv";

const Qa = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);





    const [questions] = useState<QuestionData[]>([
        {
            id: 'q1',
            question: 'Have you had any accidents in the past 3-4 years?',
            options: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
            ],
        },
        {
            id: 'q2',
            question: 'Do you have a valid driving license?',
            options: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
            ],
        },
        // Remove duplicates or ensure each question has a unique ID
        {
            id: 'q3',
            question: 'Are you willing to drive for long distances?',
            options: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
            ],
        },
        {
            id: 'q4',
            question: 'Do you have any previous driving experience?',
            options: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
            ],
        },
        {
            id: 'q5',
            question: 'Have you ever received a traffic violation?',
            options: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
            ],
        },
    ]);

    const [answers, setAnswers] = useState<{ [key: string]: string }>({});

    console.log(answers);

    // Handler to update the answer
    const handleAnswerChange = (questionId: string, answer: string) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
    };

    return (
        <div className="min-h-[80vh] w-[360px] p-[20px] mt-[30px] flex items-center justify-center flex-col mx-auto  ">
            {isLoading && <div className='fixed inset-0 z-[100] flex items-center justify-center bg-black/60 mx-auto min-h-screen'>
                <LoadingDiv text='Finishing up' />
            </div>}
            <h1 className="font-Inter text-headingColor pb-[10px] font-bold text-[24px] text-center leading-[30px]">
                Quick Q&A
            </h1>
            <p className="text-center text-[#6F6464] font-Inter text-[14px] font-normal leading-[18px]">
                Just answer the questions and we are done
            </p>
            <div className=" space-y-[40px] mt-[32px]">
                {questions.map((question) => (
                    <QuestionComponent
                        handleAnswerChange={handleAnswerChange}
                        questionData={question}
                        key={question.id} // Use unique question ID as key
                        selectedAnswer={answers[question.id]} // Pass the selected answer
                    />
                ))}
            </div>
            <div className="flex items-start space-x-3 bg-white rounded-md max-w-md pt-[40px]">
                <input
                    type="checkbox"
                    className="form-checkbox size-[24px] text-blue-600 rounded-sm border-gray-300 focus:ring-blue-500"
                />
                <p className="text-paraColor text-[12px] font-normal leading-[16px] font-Inter">
                    To the best of my knowledge I have provided accurate information about myself.
                </p>
            </div>
            <Button text="Finish" link="/final-status" />
        </div>
    );
};

const QuestionComponent = ({ questionData, handleAnswerChange, selectedAnswer }: any) => {
    return (
        <div>
            <h1 className="text-headingColor self-stretch font-Inter w-full text-[14px] font-normal leading-[18px]">
                {questionData.question}
            </h1>
            {questionData.options?.map((option: any, index: number) => (
                <label
                    key={index}
                    className={`mt-[5px] flex  px-[16px] py-[12px] border-2 rounded-md ${selectedAnswer === option.value ? 'border-blue-600' : 'border-borderColor'
                        }`}
                >
                    <input
                        type="radio"
                        name={questionData.id}
                        value={option.value}
                        className="form-radio size-[18px] text-blue-600"
                        onChange={() => handleAnswerChange(questionData.id, option.value)}
                        checked={selectedAnswer === option.value} // Set checked state
                        required
                    />
                    <span className="ml-2 text-gray-700 text-[12px]">{option.label}</span>
                </label>
            ))}
        </div>
    );
};

export default Qa;
