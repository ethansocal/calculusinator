import { EnabledProblems, Problem, ProblemGenerator } from "@/lib/question";
import * as utils from "@/lib/utils";

export const Template: ProblemGenerator = {
    generate(enabledProblems: EnabledProblems): Problem {
        return {
            question: "What is the derivative of $x^2$?",
            answer: "$2x$",
        };
    },
    name: "Derivative",
    options: ["Trigonometric", "Chain Rule"],
};
