import { Derivative } from "./problems/derivative";
import { Integral } from "./problems/integral";

export interface Problem {
    question: string;
    answer: string;
}

export interface ProblemGenerator {
    generate(enabledProblems: EnabledProblems): Problem;
    options: (string | ProblemGenerator)[];
    name: string;
}

const problems = [Derivative, Integral];

export const TopLevelProblemGenerator: ProblemGenerator = {
    generate(enabledProblems: EnabledProblems): Problem {
        const generator = problems[Math.floor(Math.random() * problems.length)];
        return generator.generate(enabledProblems);
    },
    options: [Derivative, Integral],
    name: "Top Level",
};

export type EnabledProblems = {
    [key: string]: boolean | EnabledProblems;
};

export function generateProblems(
    amount: number,
    enabledProblems: EnabledProblems,
): Problem[] {
    return Array.from({ length: amount }, () =>
        TopLevelProblemGenerator.generate(enabledProblems),
    );
}
