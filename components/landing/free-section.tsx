import { ArrowDown, Check, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { freeBenefits } from "./data";

export default function FreeSection() {
  return (
    <section
      aria-labelledby="free-heading"
      className="overflow-hidden bg-[#0B1F44] py-16 text-white sm:py-[76px]"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_0.85fr] lg:gap-20 lg:px-10">
        <div>
          <Badge className="h-7 rounded-md border border-white/15 bg-white/10 px-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#bcd2ff] hover:bg-white/10">
            Open practice
          </Badge>
          <h2
            className="mt-5 max-w-xl text-3xl font-bold leading-tight tracking-[-0.035em] sm:text-[40px]"
            id="free-heading"
          >
            Good practice should feel within reach.
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-7 text-[#c1cde0]">
            Explore sample aptitude quizzes without a paywall getting in the
            way. Start with a topic that interests you and take it one question
            at a time.
          </p>
          <Button
            className="mt-7 h-11 rounded-lg bg-white px-4 font-semibold text-[#0B1F44] hover:bg-[#eaf2ff]"
            nativeButton={false}
            render={<a href="#quizzes" />}
          >
            Browse free quizzes <ArrowDown aria-hidden="true" />
          </Button>
        </div>
        <div className="free-list rounded-[10px] border border-white/15 bg-white/[0.06] p-5 sm:p-7">
          <div className="mb-5 flex items-center gap-3 border-b border-white/10 pb-5">
            <span className="flex size-10 items-center justify-center rounded-[9px] bg-[#155EEF] text-white">
              <Sparkles aria-hidden="true" className="size-[18px]" />
            </span>
            <div>
              <p className="text-sm font-semibold text-white">
                A no-cost way to get started
              </p>
              <p className="mt-1 text-xs text-[#b7c6dc]">
                A few useful things, right from the start.
              </p>
            </div>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {freeBenefits.map((benefit) => (
              <li
                className="flex items-start gap-3 text-[13px] leading-5 text-[#e0e8f4]"
                key={benefit}
              >
                <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-[#155EEF] text-white">
                  <Check
                    aria-hidden="true"
                    className="size-3"
                    strokeWidth={2.7}
                  />
                </span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
