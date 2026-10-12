import {
    BookOpen,
    Calculator,
    ClipboardList,
    GitBranch,
    LineChart,
    Shapes,
    Timer,
    type LucideIcon,
} from "lucide-react";

export type Quiz = {
    title: string;
    description: string;
    duration: string;
    questions: string;
    difficulty: string;
    icon: LucideIcon;
    illustration: "numbers" | "verbal" | "logical" | "abstract";
};

export const quizzes: Quiz[] = [
    {
        title: "Numerical Reasoning",
        description: "Spot patterns in numbers, tables, and everyday data.",
        duration: "8 min",
        questions: "10 questions",
        difficulty: "Moderate",
        icon: Calculator,
        illustration: "numbers",
    },
    {
        title: "Verbal Reasoning",
        description: "Read closely, weigh evidence, and draw clear conclusions.",
        duration: "7 min",
        questions: "10 questions",
        difficulty: "Introductory",
        icon: BookOpen,
        illustration: "verbal",
    },
    {
        title: "Logical Reasoning",
        description: "Use sequences and clues to find the next logical step.",
        duration: "9 min",
        questions: "12 questions",
        difficulty: "Challenging",
        icon: GitBranch,
        illustration: "logical",
    },
    {
        title: "Abstract Reasoning",
        description: "Compare visual patterns and uncover what connects them.",
        duration: "8 min",
        questions: "10 questions",
        difficulty: "Moderate",
        icon: Shapes,
        illustration: "abstract",
    },
];

export const steps = [
    {
        number: "01",
        title: "Choose Your Quiz",
        description: "Pick a reasoning area that feels interesting to you.",
        icon: ClipboardList,
    },
    {
        number: "02",
        title: "Challenge Yourself",
        description: "Work through focused questions at your own pace.",
        icon: Timer,
    },
    {
        number: "03",
        title: "Review Your Progress",
        description: "See what clicked and choose what to practice next.",
        icon: LineChart,
    },
];

export const freeBenefits = [
    "Free practice quizzes",
    "No payment required to try demos",
    "Practice at your own pace",
    "Instant feedback in demo experiences, where provided",
];