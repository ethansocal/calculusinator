import nerdamer from "nerdamer-prime";
import {
    DefaultProblemGenerator,
    EnabledProblems,
    Problem,
    ProblemCategory,
    ProblemGenerator,
} from "../question";
import {
    derivative,
    integral,
    pickRandom,
    randomCoefficient,
    randomInt,
    randomPolynomial,
    simplifyToTeX,
} from "../utils";

const EOTLProblem: DefaultProblemGenerator = {
    generate(): Problem {
        const problem = randomPolynomial();
        const x = randomInt(-5, 10);
        return {
            question: `Find the equation of the tangent line to the curve $y = ${nerdamer(problem).toTeX()}$ at $x = ${x}$`,
            answer: `$y - ${nerdamer(problem).sub("x", x.toString())} = ${derivative(problem).sub("x", x.toString())}(x - ${x})$`,
        };
    },
};

export const EOTL: ProblemCategory = {
    defaultOptions: [EOTLProblem],
    options: [],
    name: "Equation of the Tangent Line",
};
