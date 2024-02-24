import { Button } from "@/components/ui/button";
import { generateQuestions } from "@/lib/question";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/mode-toggle";
import React from "react";
import { Settings } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

export function Header({
    setQuestions,
    showingAnswers,
    setShowingAnswers,
    setNumOfQuestions,
    numOfQuestions,
}: {
    setQuestions: React.Dispatch<
        React.SetStateAction<{ type: string; data: unknown }[]>
    >;
    showingAnswers: boolean;
    setShowingAnswers: (showingAnswers: boolean) => void;
    setNumOfQuestions: React.Dispatch<React.SetStateAction<number>>;
    numOfQuestions: number;
}) {
    return (
        <header
            className={
                "flex flex-row bg-muted items-center place-content-between py-1 px-2"
            }
        >
            <div className={"flex flex-row items-center gap-1"}>
                <Button
                    variant={"outline"}
                    onClick={() =>
                        setQuestions((current) =>
                            generateQuestions(current.length),
                        )
                    }
                    size={"sm"}
                >
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
                                        } else if (value > 50) {
                                            setNumOfQuestions(50);
                                        } else {
                                            setNumOfQuestions(value);
                                        }
                                    } else {
                                        setNumOfQuestions(1);
                                    }
                                }}
                            />
                        </div>
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
