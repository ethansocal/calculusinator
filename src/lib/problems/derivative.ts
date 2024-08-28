import nerdamer from "nerdamer-prime";
import {
    DefaultProblemGenerator,
    EnabledProblems,
    Problem,
    ProblemCategory,
    ProblemGenerator,
} from "../question";
import {
    randomPolynomial,
    pickRandom,
    trigonometricFunctions,
    randomCoefficient,
    commonFunctions,
    derivative,
    simplifyAndExpand,
    randomInt,
} from "../utils";

const Polynomial: DefaultProblemGenerator = {
    generate(): Problem {
        const chosen = randomPolynomial();
        return {
            question: `What is the derivative of $${nerdamer(chosen).toTeX()}$?`,
            answer: `$${simplifyAndExpand(derivative(chosen)).toTeX()}$`,
        };
    },
};
const CommonFunction: ProblemGenerator = {
    generate(): Problem {
        function randomSubstitution() {
            // 50% chance of no substitution
            if (Math.random() < 0.5) {
                return "x";
            }
            // 25% chance of random 1st or 2nd degree polynomial
            if (Math.random() < 0.5) {
                const poly = randomPolynomial(randomInt(1, 2));
                return poly;
            }
            // 25% chance of trigonometric function
            return pickRandom(trigonometricFunctions);
        }

        const chosen = nerdamer(
            `${randomCoefficient()}${pickRandom(commonFunctions)}`,
            {
                x: randomSubstitution(),
            },
        );
        return {
            question: `What is the derivative of $${chosen.toTeX()}$?`,
            answer: `$${derivative(chosen).toTeX()}$`,
        };
    },
    name: "Common Function",
};

const Trigonometric: ProblemGenerator = {
    generate(): Problem {
        function randomSubstitution() {
            // 50% chance of nothing
            if (Math.random() < 0.5) {
                return "x";
            }
            // 10% chance of e^x
            if (Math.random() < 0.2) {
                return "e^x";
            }
            // 40% chance of 1st or 2nd degree polynomial
            const poly = randomPolynomial(randomInt(1, 2));
            return poly;
        }

        const chosen = nerdamer(`${pickRandom(trigonometricFunctions)}`, {
            x: randomSubstitution(),
        });
        return {
            question: `What is the derivative of $${nerdamer(chosen).toTeX()}$?`,
            answer: `$${derivative(chosen).toTeX()}$`,
        };
    },
    name: "Trigonometric Function",
};

export const Derivative: ProblemCategory = {
    name: "Derivative",
    defaultOptions: [Polynomial],
    options: [Trigonometric, CommonFunction],
};
