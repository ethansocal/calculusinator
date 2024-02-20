import React from "react";
import {
    Fraction,
    fraction,
    MathNode,
    parse,
    pickRandom,
    pow,
    randomInt,
    subtract,
} from "mathjs";
import MathRender from "@/lib/MathRender";
import { randomCoefficient, toTex, WeightedRandomizer } from "@/lib/utils";

type DerivativeProps = {
    question: MathNode;
    answer: MathNode;
};

function randomPolynomialCoefficient(skip: boolean = false) {
    if (!skip && Math.random() < 0.25) {
        return 1;
    } else if (!skip && Math.random() < 0.2) {
        return 0;
    }
    const coefficient = randomInt(-5, 5);
    if (coefficient === 0 || coefficient === 1) {
        return randomPolynomialCoefficient(true);
    }
    return coefficient;
}

function randomFraction() {
    return pickRandom(["1/2", "1/3", "2/3", "1/4", "3/2"]);
}

function fracToString(frac: Fraction) {
    return `${frac.s === -1 ? "-" : ""}${frac.n}/${frac.d}`;
}

function generateCoefficients() {
    const degree = randomInt(2, 5);
    return Array.from({ length: degree }, randomPolynomialCoefficient);
}

function c(coefficient: number, variable: string) {
    if (coefficient === 1) {
        return variable;
    } else if (coefficient === -1) {
        return `-${variable}`;
    } else if (coefficient === 0) {
        return "";
    }
    return `${coefficient}${variable}`;
}

const possibilities = new WeightedRandomizer<() => [string, string]>([
    [1, () => ["sin(x)", "cos(x)"]],
    [1, () => ["cos(x)", "-sin(x)"]],
    [1, () => ["tan(x)", "sec(x)^2"]],
    [1, () => ["csc(x)", "-csc(x)cot(x)"]],
    [1, () => ["sec(x)", "sec(x)tan(x)"]],
    [1, () => ["cot(x)", "-csc(x)^2"]],
    [1, () => ["e^x", "e^x"]],
    [1, () => ["ln(x)", "1/x"]],
    [1, () => ["arcsin(x)", "divide(1, sqrt(1 - x^2))"]],
    [1, () => ["arccos(x)", "divide(-1, sqrt(1 - x^2))"]],
    [1, () => ["arctan(x)", "divide(1, 1 + x^2)"]],
    [1, () => ["arccsc(x)", "divide(-1, abs(x)*sqrt(x^2 - 1))"]],
    [1, () => ["arcsec(x)", "divide(1, abs(x)*sqrt(x^2 - 1))"]],
    [1, () => ["arccot(x)", "divide(-1, 1 + x^2)"]],
    [
        10,
        () => {
            const coefficients = generateCoefficients();
            const polynomial = coefficients
                .map((coefficient, index) => {
                    const degree = coefficients.length - index - 1;
                    if (degree === 0) return coefficient.toString();
                    if (degree === 1) return c(coefficient, "x");
                    return c(coefficient, `x^${degree}`);
                })
                .filter((x) => x !== "")
                .reduce(
                    (acc, x) => `${acc} ${x.startsWith("-") ? "" : "+"} ${x}`,
                );
            const derivative = coefficients
                .map((coefficient, index) => {
                    const degree = coefficients.length - index - 1;
                    if (degree === 0) return "";
                    if (degree === 1) return coefficient.toString();
                    if (degree === 2) return c(coefficient * degree, "x");
                    return c(coefficient * degree, `x^${degree - 1}`);
                })
                .slice(0, -1)
                .filter((x) => x !== "")
                .reduce(
                    (acc, x) => `${acc} ${x.startsWith("-") ? "" : "+"} ${x}`,
                );

            return [polynomial, derivative];
        },
    ],
    [
        5,
        () => {
            const frac = fraction(randomFraction());
            return [
                `pow(x,${fracToString(frac)})`,
                `${fracToString(frac)}*pow(x,${fracToString(subtract(frac, 1) as Fraction)})`,
            ];
        },
    ],
]);

export function createData(): DerivativeProps {
    let chosen = possibilities.random()();
    const coefficient = randomCoefficient();
    try {
        return {
            question: parse(chosen[0]),
            answer: parse(chosen[1]),
        };
    } catch (e) {
        console.error(chosen[0]);
        console.error(chosen[1]);
        console.error(e);
        return { question: parse("e"), answer: parse("e") };
    }
}

export function question(props: DerivativeProps) {
    return (
        <>
            <h1>Find the derivative of the following:</h1>
            <MathRender>{toTex(props.question)}</MathRender>
        </>
    );
}

export function answer(props: DerivativeProps) {
    return <MathRender>{toTex(props.answer)}</MathRender>;
}
