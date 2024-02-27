import MathRender from "@/lib/MathRender";
import {
    WeightedRandomizer,
    derivative,
    integral,
    pickRandom,
    randomCoefficient,
    randomInt,
    randomPolynomial,
    simplifyAndExpand,
} from "@/lib/utils";
import nerdamer, { Expression } from "nerdamer";

export type IntegralProps = {
    question: Expression;
    answer: Expression;
};

const randomQuestion = new WeightedRandomizer<() => IntegralProps>([
    [
        1,
        () => {
            // Random polynomial
            const chosen = randomPolynomial();
            return {
                question: nerdamer(chosen),
                answer: integral(chosen),
            };
        },
    ],
    [
        0.5,
        () => {
            function randomIBPFunction() {
                return pickRandom(["e^x", "cos(x)", "sin(x)"]).replace(
                    "x",
                    `${randomCoefficient()}x`,
                );
            }
            const chosen = `${randomCoefficient()}x^${randomInt(2, 4)}${randomIBPFunction()}`;
            return {
                question: nerdamer(chosen),
                answer: integral(chosen),
            };
        },
    ],
]);

export function question({ question }: { question: Expression }) {
    return (
        <>
            <h1>Evaluate the following integral:</h1>
            <MathRender math={`\\int ${question.toTeX()} \\,dx`} />
        </>
    );
}

export function answer({ answer }: { answer: Expression }) {
    return <MathRender math={`${answer.toTeX()} + C`} />;
}

export function createData(): IntegralProps {
    return randomQuestion.random()();
}
