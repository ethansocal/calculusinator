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
    randomNonZeroInt,
    randomPolynomial,
    simplifyToTeX,
} from "../utils";

const EOTLProblem: DefaultProblemGenerator = {
    generate(): Problem {
        const problem = randomPolynomial();
        let x = randomInt(-5, 10);
        let m;
        try {
            m = derivative(problem).sub("x", x.toString());
        } catch {
            x = randomNonZeroInt(-5, 10);
            m = derivative(problem).sub("x", x.toString());
        }

        return {
            question: `Find the equation of the tangent line to the curve $y = ${nerdamer(problem).toTeX()}$ at $x = ${x}$`,
            answer: `$y - ${nerdamer(problem).sub("x", x.toString()).toTeX()} = ${m.toTeX()}(x - ${x})$`,
        };
    },
};

export const EOTL: ProblemCategory = {
    defaultOptions: [EOTLProblem],
    options: [],
    name: "Equation of the Tangent Line",
};
