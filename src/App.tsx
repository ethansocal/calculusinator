import React, { Fragment, useEffect, useState } from "react";
import "./globals.css";
import { generateProblems } from "@/lib/question";
import { Header } from "@/Header";
import MathRender from "./lib/MathRender";

function App() {
    const [numOfProblems, setNumOfProblems] = useState(10);
    const [enabledProblems, setEnabledProblems] = useState({});
    const [questions, setQuestions] = useState(
        generateProblems(numOfProblems, enabledProblems),
    );
    const [showingAnswers, setShowingAnswers] = useState(false);

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
                console.log(`slicing ${current.length - numOfProblems}`);
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
