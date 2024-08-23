import nerdamer from "nerdamer-prime";
import {
    EnabledProblems,
    Problem,
    ProblemCategory,
    ProblemGenerator,
} from "../question";
import {
    integral,
    pickRandom,
    randomCoefficient,
    randomInt,
    randomPolynomial,
    simplifyToTeX,
} from "../utils";

const Polynomial: ProblemGenerator = {
    generate(): Problem {
        const problem = randomPolynomial();
        return {
            question: `Evaluate the following integral: $${nerdamer(problem).toTeX()}$`,
            answer: `$${integral(problem).toTeX()}$`,
        };
    },
    name: "Polynomial",
};

const USubstitution: ProblemGenerator = {
    generate(): Problem {
        return {
            question: "Missing?",
            answer: "$Missing$",
        };
    },
    name: "U-Substitution",
};

const IBP: ProblemGenerator = {
    generate(): Problem {
        function randomIBPFunction() {
            return pickRandom(["e^x", "cos(x)", "sin(x)"]).replace(
                "x",
                `(${randomCoefficient()}x)`,
            );
        }
        const chosen = `${randomCoefficient()}x^${randomInt(2, 4)} ${randomIBPFunction()}`;

        return {
            question: `Evaluate the following integral:\n$\\int ${simplifyToTeX(chosen)} dx$`,
            answer: `$${integral(chosen).toTeX()} + C$`,
        };
    },
    name: "Integration by Parts",
};

export const Integral: ProblemCategory = {
    options: [IBP],
    defaultOptions: [Polynomial],
    name: "Integral",
};
