import React, { Fragment, useState } from "react";
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
                    className={"grid p-6 font-XITS gap-y-4"}
                    style={{ gridTemplateColumns: "min-content 1fr 1fr" }}
                >
                    {questions.map((question, index) => (
                        <Fragment
                            key={
                                question.type +
                                JSON.stringify(question.data) +
                                index
                            }
                        >
                            <p>{index + 1}.</p>
                            <div>
                                <Question
                                    type={question.type}
                                    data={question.data}
                                />
                            </div>
                            <div className={"text-primary"}>
                                {showingAnswers && (
                                    <Answer
                                        type={question.type}
                                        data={question.data}
                                    />
                                )}
                            </div>
                        </Fragment>
                    ))}
                </div>
            </ThemeProvider>
        </MathJaxContext>
    );
}

export default App;
