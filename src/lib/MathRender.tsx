import { MathJax } from "better-react-mathjax";
import { ReactElement, ReactNode } from "react";

export default function MathRender({ children }: { children: ReactNode }) {
    return <MathJax>\({children}\)</MathJax>;
}
