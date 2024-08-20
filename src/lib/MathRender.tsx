import { type Expression } from "nerdamer-prime";
import "katex/dist/katex.min.css";
import Latex from "react-latex";

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
    try {
        if (typeof math !== "string") {
            math = math.toTeX();
            console.log(math);
        }
        return (
            <Latex>
                {removeCDot(changeLog(changeInverseTrigFunctions(math)))}
            </Latex>
        );
    } catch (e) {
        console.error(e);
        return (
            <div>Sorry, there was an error rendering this math expression!</div>
        );
    }
}
