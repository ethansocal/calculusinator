import { pickRandom, randomInt } from "mathjs";

import {
    DerivativeAnswer,
    DerivativeProps,
    DerivativeQuestion,
} from "@/lib/questions/derivatives/_derivative";
import { nerdamer } from "@/lib/nerdamer";
import React from "react";
import { derivative, randomCoefficient } from "@/lib/utils";
import { trigonometricFunctions } from "@/lib/questions/derivatives/trigonometric";
import { randomPolynomial } from "@/lib/questions/derivatives/polynomial";

export const commonFunctions = ["log(x)", "e^x"];

function randomSubstitution() {
    if (Math.random() < 0.5) {
        return "x";
    }
    if (Math.random() < 0.5) {
        const poly = randomPolynomial(randomInt(1, 2));
        console.log(poly);
        return poly;
    }
    return pickRandom(trigonometricFunctions);
}

export function createData(): DerivativeProps {
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
}

export function question(data: DerivativeProps) {
    return <DerivativeQuestion question={data.question} />;
}

export function answer(data: DerivativeProps) {
    return <DerivativeAnswer answer={data.answer} />;
}
