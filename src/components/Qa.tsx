import { useState } from "react";
import { QuestionComponentProps, QuestionData } from "../interface/QA.interface";
import Button from "./shared/Button";

const Qa = () => {
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
        {
            id: 'q2',
            question: 'Do you have a valid driving license?',
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
        {
            id: 'q2',
            question: 'Do you have a valid driving license?',
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


    return <div className="min-h-[80vh] mt-[30px]  flex  items-center  justify-center  flex-col mx-auto w-[360px] mb-[20px]">
        <h1 className=" font-Inter text-headingColor  pb-[10px] font-bold text-[24px] text-center leading-[30px]">Quick Q&A</h1>
        <p className=" text-center text-[#6F6464] font-Inter text-[14px] font-normal leading-[18px]">Just answer the questions and we are done</p>
        <div className=" space-y-[40px] mt-[32px]">
            {
                questions.map((question, idx) => (
                    <QuestionComponent handleAnswerChange={handleAnswerChange} questionData={question} key={idx} />
                ))
            }
        </div>
        <div className="flex items-start space-x-3 bg-white rounded-md max-w-md pt-[40px] ">
            <input
                type="checkbox"
                className="form-checkbox  size-[24px] text-blue-600 rounded-sm border-gray-300 focus:ring-blue-500"
            />
            <p className="text-paraColor text-[12px] font-normal leading-[16px] font-Inter">
                To the best of my knowledge I have provided accurate information about myself.
            </p>
        </div>
        <Button text="Finish" link="/final-status" />
    </div>;
};

export default Qa;




const QuestionComponent = ({ questionData, handleAnswerChange }: QuestionComponentProps) => {

    return (
        <div className="">
            <h1 className="text-headingColor self-stretch font-Inter text-[14px] font-normal leading-[18px]">
                {questionData.question}
            </h1>
            {questionData.options?.map((option: any, index: any) => (
                <label
                    key={index}
                    className="mt-[5px] flex items-center px-[16px] py-[12px] border-2 rounded-md border-borderColor"
                >
                    <input
                        type="radio"
                        name={questionData.id}
                        value={option.value}
                        className="form-radio size-[18px] text-blue-600"
                        onChange={() => handleAnswerChange(questionData.id, option.value)}
                        required
                    />
                    <span className="ml-2 text-gray-700 text-[12px]">{option.label}</span>
                </label>
            ))}
        </div>

    );
};


