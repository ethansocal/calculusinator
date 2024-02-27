import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Expression } from "nerdamer";
import { nerdamer } from "@/lib/nerdamer";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export class WeightedRandomizer<T> {
    constructor(private options: [number, T][]) {}
    random() {
        let total = this.options.reduce((acc, [weight]) => acc + weight, 0);
        let random = Math.random() * total;
        for (let [weight, value] of this.options) {
            if (random < weight) {
                return value;
            }
            random -= weight;
        }
        throw new Error("Weighted randomizer encountered impossible state.");
    }
}

export function randomInt(a: number, b: number) {
    return a + Math.floor(Math.random() * (b - a));
}

export function simplifyAndExpand(input: Expression): Expression {
    // @ts-ignore
    return nerdamer.expand(nerdamer.simplify(nerdamer(input)));
}

export function pickRandom<T>(arr: T[]) {
    return arr[(arr.length * Math.random()) << 0];
}

export function randomCoefficient() {
    if (Math.random() < 0.67) {
        return 1;
    }
    let chosenNumber = Math.floor(Math.random() * 20) - 10;
    if (chosenNumber == 0) {
        return 1;
    }
    return chosenNumber;
}

export function derivative(input: string | Expression) {
    return nerdamer(`diff(${input.toString()})`);
}

export function integral(input: string | Expression) {
    return nerdamer(`integrate(${input.toString()})`);
}

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

export const commonFunctions = ["log(x)", "e^x"];

export function randomPolynomialCoefficient() {
    if (Math.random() < 0.33) {
        return 1;
    } else if (Math.random() < 0.25) {
        return 0;
    }
    return randomInt(-9, 9);
}

export function randomFraction() {
    if (Math.random() < 0.5) {
        return "1/2";
    }
    return `${randomInt(1, 5)}/${randomInt(1, 5)}`;
}

export function randomPolynomial(degree: number = randomInt(1, 4)) {
    const parts = [];
    for (let i = degree; i >= 0; i--) {
        let coef = randomPolynomialCoefficient();
        if (i === degree && coef === 0) {
            coef = 1;
        }
        parts.push(`${coef}x^${i}`);
    }
    if (Math.random() < 0.5) {
        parts.push(`${randomPolynomialCoefficient()}x^(${randomFraction()})`);
    }
    return parts.join(" + ");
}
