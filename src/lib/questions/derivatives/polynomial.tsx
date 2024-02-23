import { pickRandom, randomInt } from "mathjs";
import { nerdamer } from "@/lib/nerdamer";
import {
    DerivativeAnswer,
    DerivativeProps,
    DerivativeQuestion,
} from "@/lib/questions/derivatives/_derivative";
import React from "react";
import { Expression } from "nerdamer";
import { derivative, simplifyAndExpand } from "@/lib/utils";

function randomPolynomialCoefficient() {
    if (Math.random() < 0.33) {
        return "";
    } else if (Math.random() < 0.25) {
        return "0";
    }
    return randomInt(-9, 9);
}

function randomFraction() {
    if (Math.random() < 0.5) {
        return "1/2";
    }
    return `${randomInt(1, 5)}/${randomInt(1, 5)}`;
}

export function randomPolynomial(degree: number = randomInt(1, 4)) {
    const parts = [];
    for (let i = degree; i > 0; i--) {
        let coef = randomPolynomialCoefficient();
        if (i === degree && coef === "0") {
            coef = "1";
        }
        parts.push(`${randomPolynomialCoefficient()}x^${i}`);
    }
    if (Math.random() < 0.5) {
        parts.push(`${randomPolynomialCoefficient()}x^(${randomFraction()})`);
    }
    return parts.join(" + ");
}

export function createData(): DerivativeProps {
    const chosen = randomPolynomial();
    return {
        question: nerdamer(chosen),
        answer: simplifyAndExpand(derivative(chosen)),
    };
}

export function question(data: DerivativeProps) {
    return <DerivativeQuestion question={data.question} />;
}

export function answer(data: DerivativeProps) {
    return <DerivativeAnswer answer={data.answer} />;
}
