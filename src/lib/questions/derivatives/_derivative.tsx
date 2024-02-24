import React, { useMemo } from "react";
import MathRender from "@/lib/MathRender";
import nerdamer, { Expression } from "nerdamer";

export type DerivativeProps = {
    question: Expression;
    answer: Expression;
};

export function DerivativeQuestion({ question }: { question: Expression }) {
    return (
        <>
            <h1>Find the derivative of the following:</h1>
            <MathRender math={question} />
        </>
    );
}

export function DerivativeAnswer({ answer }: { answer: Expression }) {
    return <MathRender math={answer} />;
}
