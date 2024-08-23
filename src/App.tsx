import { Fragment, useEffect, useState } from "react";
import "./globals.css";
import {
    EnabledProblems,
    generateProblems,
    Problem,
    problemCategories,
} from "@/lib/question";
import { Header } from "@/Header";
import MathRender from "./lib/MathRender";
import { createOptionsTree } from "./lib/utils";
import { useLocalStorage } from "@uidotdev/usehooks";

function App() {
    const [numOfProblems, setNumOfProblems] = useState(10);
    const [enabledProblems, setEnabledProblems] = useState(
        (JSON.parse(
            localStorage.getItem("enabledProblems")!,
        ) as EnabledProblems) || createOptionsTree(problemCategories),
    );
    const [questions, setQuestions] = useState<Problem[]>(
        generateProblems(numOfProblems, enabledProblems),
    );
    const [showingAnswers, setShowingAnswers] = useState(false);

    useEffect(() => {
        localStorage.setItem(
            "enabledProblems",
            JSON.stringify(enabledProblems),
        );
        setQuestions(generateProblems(numOfProblems, enabledProblems));
    }, [enabledProblems]);

    useEffect(() => {
        setQuestions((current) => {
            if (current.length < numOfProblems) {
                return current.concat(
                    generateProblems(
                        numOfProblems - current.length,
                        enabledProblems,
                    ),
                );
            } else if (current.length > numOfProblems) {
                return current.slice(0, numOfProblems);
            }
            return current;
        });
    }, [numOfProblems]);

    return (
        <>
            <Header
                newQuestions={() =>
                    setQuestions(
                        generateProblems(numOfProblems, enabledProblems),
                    )
                }
                showingAnswers={showingAnswers}
                setShowingAnswers={setShowingAnswers}
                setNumOfQuestions={setNumOfProblems}
                numOfQuestions={numOfProblems}
                enabledProblems={enabledProblems}
                setEnabledProblems={setEnabledProblems}
            />
            <div
                className={"grid p-6 font-XITS gap-y-4 overflow-clip gap-x-4"}
                style={{
                    gridTemplateColumns: `min-content ${showingAnswers ? "max-content" : "1fr"} ${showingAnswers ? "1fr" : 0}`,
                }}
            >
                {questions.map((problem, index) => (
                    <Fragment
                        key={
                            problem.question + problem.answer + index.toString()
                        }
                    >
                        <p className={"justify-self-end"}>{index + 1}.</p>
                        <div>
                            <MathRender math={problem.question} />
                        </div>
                        <div className={"self-end text-primary"}>
                            <div className={showingAnswers ? "" : "hidden"}>
                                <MathRender math={problem.answer} />
                            </div>
                        </div>
                    </Fragment>
                ))}
            </div>
        </>
    );
}

export default App;
