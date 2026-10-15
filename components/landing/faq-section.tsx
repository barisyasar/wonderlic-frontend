"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const questions = [
  {
    question: "Are these Wonderlic practice quizzes free?",
    answer:
      "Yes. You can start any quiz listed here for free, with no payment required.",
  },
  {
    question: "How long does a quiz take?",
    answer:
      "Each quiz has its own time limit and question count, shown before you begin. Work through the questions before the timer runs out; your results appear when you finish or time expires.",
  },
  {
    question: "What kinds of questions will I see?",
    answer:
      "Practice questions cover numerical and verbal reasoning, logic, and visual patterns. The exact mix depends on the quiz you choose.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No. Choose a quiz and start practicing right away. No account or sign-up is required.",
  },
  {
    question: "How are my results calculated?",
    answer:
      "Your results show how many questions you answered correctly, your accuracy, and the time you spent. You can also review each question, its correct answer, and an explanation.",
  },
];

export default function FAQSection() {
  return (
    <section className="bg-white py-20 sm:py-24" id="faq">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20 lg:px-10">
        <div>
          <p className="section-kicker">Helpful information</p>
          <h2 className="mt-3 max-w-sm text-3xl font-bold leading-tight tracking-[-0.035em] text-[#0B1F44] sm:text-[38px]">
            Frequently asked questions
          </h2>
          <p className="mt-4 max-w-sm text-[15px] leading-7 text-[#65758c]">
            Everything you need to know about our practice quizzes.
          </p>
        </div>
        <Accordion className="divide-y divide-[#e7edf5] border-y border-[#e7edf5]">
          {questions.map((item, index) => (
            <AccordionItem
              className="border-0"
              key={item.question}
              value={`question-${index}`}
            >
              <AccordionTrigger className="py-[18px] text-[14px] font-semibold text-[#19304f] hover:no-underline sm:text-[15px]">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-[13px] leading-6 text-[#687791] sm:text-sm">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
