import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
    MathNode,
    OperatorNode,
    rationalize,
    simplify,
    simplifyConstant,
    simplifyCore,
} from "mathjs";
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

function isOperator(node: MathNode | OperatorNode): node is OperatorNode {
    return node.type === "OperatorNode";
}

function customLaTeX(node: MathNode, options: object) {
    if (isOperator(node) && node.fn === "multiply") {
        return node.args[0].toTex(options) + node.args[1].toTex(options);
    }
}

export function toTex(mathNode: MathNode) {
    return simplifyCore(mathNode).toTex({
        parenthesis: "hide",
        implicit: "hide",
        handler: customLaTeX,
    });
}

export function toTexRationalized(mathNode: MathNode) {
    return rationalize(mathNode).toTex({
        parenthesis: "auto",
        implicit: "hide",
        handler: customLaTeX,
    });
}
