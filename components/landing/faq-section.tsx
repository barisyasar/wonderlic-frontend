"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const questions = [
  {
    question: "Are the quizzes really free?",
    answer:
      "Yes. The practice quiz previews on this page are free to explore, and no payment is required to try a demo. The quiz destinations are placeholders in this landing-page phase.",
  },
  {
    question: "How long does a quiz take?",
    answer:
      "The durations and question counts shown on the quiz cards are illustrative only. Active timed quiz experiences are not included in this preview.",
  },
  {
    question: "What skills do these quizzes practice?",
    answer:
      "The sample categories cover numerical, verbal, logical, and abstract reasoning: working with information, recognizing patterns, and drawing conclusions.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No account is needed to browse this page. There is no sign-up flow in this landing-page preview.",
  },
  {
    question: "Are these official Wonderlic tests?",
    answer:
      "No. These are independent practice concepts inspired by general aptitude-test formats, not official Wonderlic assessments.",
  },
  {
    question: "Will I receive my results immediately?",
    answer:
      "This page does not run quizzes or generate results. Immediate feedbPack is only available in a demo experience where it has been implemented.",
  },
];

export default function FAQSection() {
  return (
    <section className="bg-white py-20 sm:py-24" id="faq">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20 lg:px-10">
        <div>
          <p className="section-kicker">A few helpful details</p>
          <h2 className="mt-3 max-w-sm text-3xl font-bold leading-tight tracking-[-0.035em] text-[#0B1F44] sm:text-[38px]">
            Questions, answered.
          </h2>
          <p className="mt-4 max-w-sm text-[15px] leading-7 text-[#65758c]">
            A little more context about the practice previews and what is
            available here.
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
