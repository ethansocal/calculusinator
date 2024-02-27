import MathRender from "@/lib/MathRender";
import {
    WeightedRandomizer,
    commonFunctions,
    derivative,
    pickRandom,
    randomCoefficient,
    randomInt,
    randomPolynomial,
    simplifyAndExpand,
    trigonometricFunctions,
} from "@/lib/utils";
import nerdamer, { Expression } from "nerdamer";

export type DerivativeProps = {
    question: Expression;
    answer: Expression;
};

const randomQuestion = new WeightedRandomizer<() => DerivativeProps>([
    [
        1,
        () => {
            // Random common function
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
                question: chosen,
                answer: derivative(chosen),
            };
        },
    ],
    [
        1,
        () => {
            // Random trigonometric function
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
                question: nerdamer(chosen),
                answer: derivative(chosen),
            };
        },
    ],
    [
        1,
        () => {
            // Random polynomial
            const chosen = randomPolynomial();
            return {
                question: nerdamer(chosen),
                answer: simplifyAndExpand(derivative(chosen)),
            };
        },
    ],
]);

export function question({ question }: { question: Expression }) {
    return (
        <>
            <h1>Find the derivative of the following:</h1>
            <MathRender math={question} />
        </>
    );
}

export function answer({ answer }: { answer: Expression }) {
    return <MathRender math={answer} />;
}

export function createData(): DerivativeProps {
    return randomQuestion.random()();
}
