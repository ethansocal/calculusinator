import {
    derivative,
    pickRandom,
    randomCoefficient,
    simplifyAndExpand,
} from "@/lib/utils";
import { nerdamer } from "@/lib/nerdamer";

import {
    DerivativeAnswer,
    DerivativeProps,
    DerivativeQuestion,
} from "@/lib/questions/derivatives/_derivative";
import React from "react";
import { randomPolynomial } from "@/lib/questions/derivatives/polynomial";
import { randomInt } from "mathjs";

export const trigonometricFunctions = [
    "sin(x)",
    "cos(x)",
    "tan(x)",
    "csc(x)",
    "sec(x)",
    "cot(x)",
    "asin(x)",
    "acos(x)",
    "atan(x)",
    "acsc(x)",
    "asec(x)",
    "acot(x)",
];

function randomSubstitution() {
    if (Math.random() < 0.5) {
        return "x";
    }
    if (Math.random() < 0.2) {
        return "e^x";
    }
    return randomPolynomial(randomInt(1, 2));
}

export function createData(): DerivativeProps {
    const chosen = nerdamer(`${pickRandom(trigonometricFunctions)}`, {
        x: randomSubstitution(),
    });
    return {
        question: nerdamer(chosen),
        answer: derivative(chosen),
    };
}

export function question(data: DerivativeProps) {
    return <DerivativeQuestion question={data.question} />;
}

export function answer(data: DerivativeProps) {
    return <DerivativeAnswer answer={data.answer} />;
}
