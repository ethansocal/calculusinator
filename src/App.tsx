import React, { Fragment, useEffect, useState } from "react";
import "./globals.css";
import { MathJaxContext } from "better-react-mathjax";
import { Answer, generateQuestions, Question } from "@/lib/question";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/Header";

function App() {
    const [numOfQuestions, setNumOfQuestions] = useState(10);
    const [questions, setQuestions] = useState(
        generateQuestions(numOfQuestions),
    );
    const [showingAnswers, setShowingAnswers] = useState(false);

    useEffect(() => {
        setQuestions((current) => {
            if (current.length < numOfQuestions) {
                return current.concat(
                    generateQuestions(numOfQuestions - current.length),
                );
            } else if (current.length > numOfQuestions) {
                console.log(`slicing ${current.length - numOfQuestions}`);
                return current.slice(0, numOfQuestions);
            }
            return current;
        });
    }, [numOfQuestions]);
    return (
        <MathJaxContext>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <Header
                    setQuestions={setQuestions}
                    showingAnswers={showingAnswers}
                    setShowingAnswers={setShowingAnswers}
                    setNumOfQuestions={setNumOfQuestions}
                    numOfQuestions={numOfQuestions}
                />
                <div
                    className={
                        "grid p-6 font-XITS gap-y-4 overflow-clip gap-x-4"
                    }
                    style={{
                        gridTemplateColumns: `min-content ${showingAnswers ? "max-content" : "1fr"} ${showingAnswers ? "1fr" : 0}`,
                    }}
                >
                    {questions.map((question, index) => (
                        <Fragment
                            key={
                                question.type +
                                JSON.stringify(question.data) +
                                index
                            }
                        >
                            <p className={"justify-self-end"}>{index + 1}.</p>
                            <div>
                                <Question
                                    type={question.type}
                                    data={question.data}
                                />
                            </div>
                            <div className={"self-end text-primary"}>
                                <div className={showingAnswers ? "" : "hidden"}>
                                    <Answer
                                        type={question.type}
                                        data={question.data}
                                    />
                                </div>
                            </div>
                        </Fragment>
                    ))}
                </div>
            </ThemeProvider>
        </MathJaxContext>
    );
}

export default App;
