import { type Expression } from "nerdamer";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";

function changeInverseTrigFunctions(input: string) {
    return input
        .replaceAll("asin", "sin^{-1}")
        .replaceAll("acos", "cos^{-1}")
        .replaceAll("atan", "tan^{-1}")
        .replaceAll("acsc", "csc^{-1}")
        .replaceAll("asec", "sec^{-1}")
        .replaceAll("acot", "cot^{-1}");
}
function changeLog(input: string) {
    return input.replaceAll("log", "ln");
}

function removeCDot(input: string) {
    return input.replaceAll("\\cdot", "");
}

export default function MathRender({ math }: { math: string | Expression }) {
    if (typeof math !== "string") {
        math = math.toTeX();
    }
    return (
        <InlineMath>
            {removeCDot(changeLog(changeInverseTrigFunctions(math)))}
        </InlineMath>
    );
}
