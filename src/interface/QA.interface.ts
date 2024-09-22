// Interface for an option in the question
interface Option {
    label: string; // The display label of the option (e.g., 'Yes' or 'No')
    value: string; // The value to be stored/sent (e.g., 'yes' or 'no')
}

// Interface for the question data
export interface QuestionData {
    id: string; // Unique identifier for the question
    question: string; // The question text
    options: Option[]; // Array of options available for this question
}

// Type for the handleAnswerChange function
export type HandleAnswerChange = (questionId: string, answer: string) => void;

// Props interface for QuestionComponent
export interface QuestionComponentProps {
    questionData: QuestionData;
    handleAnswerChange: HandleAnswerChange;
}