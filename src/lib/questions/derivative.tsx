import React from "react";
import { MathNode, parse } from "mathjs";
import Math from "@/lib/Math";
import { randomCoefficient, toTex, WeightedRandomizer } from "@/lib/utils";

type DerivativeProps = {
    question: MathNode;
    answer: MathNode;
};

const possibilities = new WeightedRandomizer<{
    question: (a: number) => string;
    answer: (a: number) => string;
}>([
    {
        weight: 1,
        value: { question: (a) => `${a}e^x`, answer: (a) => `${a}e^x` },
    },
    { weight: 1, value: { question: (a) => `${a}x`, answer: (a) => `${a}` } },
    {
        weight: 1,
        value: { question: (a) => `${a}x^2`, answer: (a) => `${2 * a}x` },
    },
    {
        weight: 1,
        value: { question: (a) => `${a}x^3`, answer: (a) => `${3 * a}x^2` },
    },
    {
        weight: 1,
        value: { question: (a) => `${a}x^4`, answer: (a) => `${4 * a}x^3` },
    },
    {
        weight: 1,
        value: { question: (a) => `${a}x^5`, answer: (a) => `${5 * a}x^4` },
    },
    {
        weight: 1,
        value: { question: (a) => `${a}sin(x)`, answer: (a) => `${a}cos(x)` },
    },
    {
        weight: 1,
        value: {
            question: (a) => `${a}cos(x)`,
            answer: (a) => `${a * -1}sin(x)`,
        },
    },
    {
        weight: 1,
        value: { question: (a) => `${a}tan(x)`, answer: (a) => `${a}sec^2(x)` },
    },
    {
        weight: 1,
        value: {
            question: (a) => `${a}sec(x)`,
            answer: (a) => `${a}sec(x)tan(x)`,
        },
    },
    {
        weight: 1,
        value: {
            question: (a) => `${a}csc(x)`,
            answer: (a) => `${a * -1}csc(x)cot(x)`,
        },
    },
    {
        weight: 1,
        value: {
            question: (a) => `${a}cot(x)`,
            answer: (a) => `${a * -1}csc^2(x)`,
        },
    },
    {
        weight: 1,
        value: {
            question: (a) => `${a}ln(x)`,
            answer: (a) => `${a} * 1/x`,
        },
    },
    {
        weight: 1,
        value: {
            question: (a) => `${a}log(x)`,
            answer: (a) => `${a} * 1/(x * ln(10))`,
        },
    },
]);

export function createData(): DerivativeProps {
    let chosen = possibilities.random();
    const coefficient = randomCoefficient();
    return {
        question: parse(chosen.question(coefficient)),
        answer: parse(chosen.answer(coefficient)),
    };
}

export function question(props: DerivativeProps) {
    return (
        <>
            <h1>Find the derivative of the following:</h1>
            <Math>{toTex(props.question)}</Math>
        </>
    );
}

export function answer(props: DerivativeProps) {
    return <Math>{toTex(props.answer)}</Math>;
}
