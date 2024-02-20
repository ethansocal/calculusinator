import { ReactElement } from "react";

const questions: Record<string, QuestionFile<unknown>> = import.meta.glob(
    "./questions/*.tsx",
    {
        eager: true,
    },
);

export function Question({ type, data }: { type: string; data: any }) {
    return questions[type]!.question(data);
}

export function Answer({ type, data }: { type: string; data: any }) {
    return questions[type]!.answer(data);
}
export interface QuestionFile<T> {
    createData: () => T;
    question: (data: T) => ReactElement;
    answer: (data: T) => ReactElement;
}

function randomQuestion() {
    let keys = Object.keys(questions);
    return keys[(keys.length * Math.random()) << 0];
}

export function generateQuestions(num: number) {
    return Array(num)
        .fill(0)
        .map((_) => {
            const question = randomQuestion();
            return { type: question, data: questions[question]!.createData() };
        });
}