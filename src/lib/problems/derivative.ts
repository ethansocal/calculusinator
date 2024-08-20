import { EnabledProblems, Problem, ProblemGenerator } from "../question";

export const Derivative: ProblemGenerator = {
    generate(enabledProblems: EnabledProblems): Problem {
        return {
            question: "What is the derivative of $x^2$?",
            answer: "$2x$",
        };
    },
    name: "Derivative",
};
