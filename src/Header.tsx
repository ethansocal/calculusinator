import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/mode-toggle";
import React, { useEffect, useId } from "react";
import { Settings } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ProblemGenerator, TopLevelProblemGenerator } from "./lib/question";
import { produce } from "immer";

const MAX_QUESTIONS = 100;

function CheckboxLabel({
    checked,
    onCheckedChange,
    name,
}: {
    checked: boolean;
    onCheckedChange: (e: boolean) => void;
    name: string;
}) {
    const id = useId();

    return (
        <div className={"flex flex-row gap-1 items-center"}>
            <Checkbox
                id={id}
                checked={checked}
                onCheckedChange={(e) => onCheckedChange(e.valueOf() as boolean)}
            />
            <Label htmlFor={id}>{name}</Label>
        </div>
    );
}

export function ProblemOptions({
    problemGenerator,
    enabledOptions,
    setEnabledOptions,
}: {
    problemGenerator: ProblemGenerator;
    enabledOptions: any;
    setEnabledOptions: (options: any) => void;
}) {
    return (
        <ul>
            {problemGenerator.options?.map((i) => {
                if (typeof i === "string") {
                    return (
                        <li key={i} className="mt-2">
                            <CheckboxLabel
                                name={i}
                                checked={enabledOptions[i] ?? true}
                                onCheckedChange={(e) => {
                                    setEnabledOptions(
                                        produce(
                                            enabledOptions,
                                            (draft: any) => {
                                                draft[i] = e;
                                            },
                                        ),
                                    );
                                }}
                            />
                        </li>
                    );
                }
                return (
                    <li key={i.name} className="mt-4">
                        <CheckboxLabel
                            name={i.name}
                            checked={enabledOptions[i.name]?.["all"] ?? true}
                            onCheckedChange={(e) => {
                                setEnabledOptions(
                                    produce(enabledOptions, (draft: any) => {
                                        if (!draft[i.name]) {
                                            draft[i.name] = {};
                                        }
                                        draft[i.name]["all"] = e;
                                    }),
                                );
                            }}
                        />
                        <div className="pl-4">
                            <ProblemOptions
                                problemGenerator={i}
                                enabledOptions={enabledOptions[i.name] ?? {}}
                                setEnabledOptions={(j) => {
                                    setEnabledOptions(
                                        produce(
                                            enabledOptions,
                                            (draft: any) => {
                                                draft[i.name] = j;
                                            },
                                        ),
                                    );
                                }}
                            />
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}

export function Header({
    newQuestions,
    showingAnswers,
    setShowingAnswers,
    setNumOfQuestions,
    numOfQuestions,
    enabledProblems,
    setEnabledProblems,
}: {
    newQuestions: () => void;
    showingAnswers: boolean;
    setShowingAnswers: (showingAnswers: boolean) => void;
    setNumOfQuestions: (amount: number) => void;
    numOfQuestions: number;
    enabledProblems: any;
    setEnabledProblems: (enabledProblems: any) => void;
}) {
    return (
        <header
            className={
                "flex flex-row bg-muted items-center place-content-between py-1 px-2"
            }
        >
            <div className={"flex flex-row items-center gap-1"}>
                <Button variant={"outline"} onClick={newQuestions} size={"sm"}>
                    New Questions
                </Button>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button size={"icon"} variant={"outline"}>
                            <Settings size={20} />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className={"grid grid-cols-2"}>
                            <Label>Number of Questions</Label>
                            <Input
                                type={"number"}
                                value={numOfQuestions}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    if (!isNaN(value)) {
                                        if (value < 1) {
                                            setNumOfQuestions(1);
                                        } else if (value > MAX_QUESTIONS) {
                                            setNumOfQuestions(MAX_QUESTIONS);
                                        } else {
                                            setNumOfQuestions(value);
                                        }
                                    } else {
                                        setNumOfQuestions(1);
                                    }
                                }}
                            />
                        </div>
                        <ProblemOptions
                            problemGenerator={TopLevelProblemGenerator}
                            enabledOptions={enabledProblems}
                            setEnabledOptions={setEnabledProblems}
                        />
                    </PopoverContent>
                </Popover>
                <div className={"flex flex-row gap-1 items-center"}>
                    <Checkbox
                        id={"answers"}
                        checked={showingAnswers}
                        onCheckedChange={(e) =>
                            setShowingAnswers(e.valueOf() as boolean)
                        }
                    />
                    <Label htmlFor={"answers"}>Show answers</Label>
                </div>
            </div>

            <ModeToggle />
        </header>
    );
}
