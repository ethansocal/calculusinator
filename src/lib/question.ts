import { Derivative } from "./problems/derivative";
import { EOTL } from "./problems/eotl";
import { Integral } from "./problems/integral";
import { pickRandom } from "./utils";

export interface Problem {
    question: string;
    answer: string;
}

export interface DefaultProblemGenerator {
    generate(): Problem;
}

export interface ProblemGenerator {
    generate(): Problem;
    name: string;
}

export interface ProblemCategory {
    name: string;
    options: ProblemGenerator[];
    defaultOptions: DefaultProblemGenerator[];
}

export const problemCategories: ProblemCategory[] = [
    Derivative,
    Integral,
    EOTL,
];

export type EnabledProblems = {
    [key: string]: { [key2: string]: boolean } | undefined;
};

export function generateProblems(
    amount: number,
    enabledProblems: EnabledProblems,
): Problem[] {
    return Array.from({ length: amount }, () => {
        const category = pickRandom(
            problemCategories.filter(
                (option) => enabledProblems[option.name]?.["all"] || true,
            ),
        );
        return pickRandom([
            ...category.options,
            ...category.defaultOptions,
        ]).generate();
    });
}
