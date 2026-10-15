import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, GraduationCap, Sparkles, Timer } from "lucide-react";

function AssessmentPreview() {
  return (
    <div
      className="relative mx-auto w-full max-w-[570px] lg:ml-auto"
      aria-label="Sample assessment dashboard preview"
    >
      <Card className="relative z-[1] overflow-hidden rounded-[14px] border border-[#e1e9f3] bg-white py-0 shadow-[0_24px_70px_-36px_#0b1f4470]">
        <div className="flex items-center justify-between border-b border-[#edf1f6] px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-[9px] bg-[#eaf2ff] text-[#155EEF]">
              <GraduationCap aria-hidden="true" className="size-[18px]" />
            </span>
            <div>
              <p className="text-sm font-semibold text-[#0B1F44]">
                Practice session
              </p>
              <p className="mt-0.5 text-xs text-[#748198]">
                Numerical reasoning
              </p>
            </div>
          </div>
          <div className="hidden items-center gap-2 rounded-lg border border-[#e9edf3] bg-white px-3 py-2 text-xs font-medium text-[#52627a] sm:flex">
            <span className="flex size-5 items-center justify-center rounded-full bg-[#eaf8f0] text-[#218653]">
              <Check aria-hidden="true" className="size-3" />
            </span>
            Free practice. No pressure.
          </div>
        </div>
        <CardContent className="px-5 pb-5 pt-5 sm:px-6 sm:pb-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex items-center justify-between text-xs font-medium text-[#687791]">
                <span>Question 6 of 12</span>
                <span>50%</span>
              </div>
              <div
                aria-label="Sample progress: 6 of 12 questions"
                aria-valuemax={12}
                aria-valuemin={0}
                aria-valuenow={6}
                className="h-1.5 overflow-hidden rounded-full bg-[#eaf0f7]"
                role="progressbar"
              >
                <span className="block h-full w-1/2 rounded-full bg-[#155EEF]" />
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2 rounded-lg border border-[#e7edf5] px-3 py-2 text-[#0B1F44]">
              <Timer aria-hidden="true" className="size-4 text-[#155EEF]" />
              <span className="font-mono text-sm font-semibold tabular-nums">
                08:42
              </span>
            </div>
          </div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#155EEF]">
            Find the pattern
          </p>
          <h2 className="max-w-md text-[19px] font-semibold leading-[1.35] tracking-[-0.02em] text-[#0B1F44] sm:text-[21px]">
            What number comes next in this sequence?
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-[#f7f9fc] px-3 py-4 text-center font-mono text-[17px] font-semibold tracking-[0.05em] text-[#243956] sm:gap-4 sm:text-xl">
            <span>4</span>
            <span className="text-[#a9b4c4]">·</span>
            <span>7</span>
            <span className="text-[#a9b4c4]">·</span>
            <span>13</span>
            <span className="text-[#a9b4c4]">·</span>
            <span>25</span>
            <span className="text-[#a9b4c4]">·</span>
            <span className="text-[#155EEF]">?</span>
          </div>
          <div
            className="mt-4 grid grid-cols-2 gap-2.5"
            aria-label="Sample answer options"
          >
            {["37", "43", "49", "51"].map((answer) => (
              <div
                key={answer}
                className={`flex h-11 items-center gap-2.5 rounded-lg border px-3 text-sm font-medium ${answer === "49" ? "border-[#155EEF] bg-[#f3f7ff] text-[#155EEF]" : "border-[#e5ebf3] text-[#52627a]"}`}
              >
                <span
                  className={`flex size-4 items-center justify-center rounded-full border ${answer === "49" ? "border-[#155EEF]" : "border-[#cbd5e2]"}`}
                >
                  {answer === "49" && (
                    <span className="size-2 rounded-full bg-[#155EEF]" />
                  )}
                </span>
                {answer}
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-[#edf1f6] pt-4 text-xs text-[#7a8799]">
            <span>Sample question</span>
            <span className="inline-flex items-center gap-1.5">
              <Sparkles
                aria-hidden="true"
                className="size-3.5 text-[#155EEF]"
              />{" "}
              Practice at your pace
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      className="hero-grid relative overflow-hidden border-b border-[#e7edf5]"
      id="top"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:px-10 lg:py-[92px]">
        <div className="hero-copy relative z-[1]">
          <Badge
            variant="outline"
            className="mb-6 h-7 rounded-md border-[#d9e5fb] bg-white/80 px-2.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#155EEF]"
          >
            Free aptitude practice
          </Badge>
          <h1 className="max-w-[600px] text-[42px] font-bold leading-[1.08] tracking-[-0.045em] text-[#0B1F44] sm:text-[54px] lg:text-[60px]">
            Sharpen Your Mind. Unlock Your Potential.
          </h1>
          <p className="mt-6 max-w-[510px] text-base leading-7 text-[#596a82] sm:text-[17px] sm:leading-8">
            Practice numerical, verbal, and logical reasoning with free timed
            quizzes designed to help you challenge yourself and build
            confidence.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <Button
              className="h-12 self-start rounded-lg border-[#d9e2ee] bg-white px-5 text-[14px] font-semibold text-[#213651] hover:border-[#b9c8dc] hover:bg-[#f8faff]"
              nativeButton={false}
              render={<a href="#how-it-works" />}
              variant="outline"
            >
              How It Works
            </Button>
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:justify-start">
              <Button
                className="h-12 justify-center gap-2 rounded-lg border-2 border-[#0B1F44] bg-[#0B1F44] px-5 text-[14px] font-semibold text-white shadow-[0_8px_22px_-14px_#0b1f44cc] hover:bg-[#142d5c]"
                nativeButton={false}
                render={<a href="#demo" />}
              >
                Try the demo
              </Button>
              <Button
                className="h-12 justify-center gap-2 rounded-lg border-2 border-[#155EEF] bg-[#155EEF] px-5 text-[14px] font-semibold text-white shadow-[0_7px_18px_-8px_#155eefbd] hover:bg-[#0e4ed4] hover:border-[#0e4ed4]"
                nativeButton={false}
                render={<a href="#quizzes" />}
              >
                Explore Free Quizzes
              </Button>
            </div>
          </div>
          <p className="mt-5 inline-flex items-center gap-2 text-[13px] font-medium text-[#687791] sm:hidden">
            <span className="size-1.5 rounded-full bg-[#2da56d]" /> Free
            practice. No pressure.
          </p>
        </div>
        <AssessmentPreview />
      </div>
    </section>
  );
}
