import { EnabledProblems, Problem, ProblemGenerator } from "../question";

export const Integral: ProblemGenerator = {
    generate(enabledProblems: EnabledProblems): Problem {
        return {
            question: "What is the integral of $x^2$?",
            answer: "$1/3 x^3 + C$",
        };
    },
    options: ["U-Substitution", "Integration by Parts"],
    name: "Integral",
};
