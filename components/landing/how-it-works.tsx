import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { steps } from "./data";

export default function HowItWorks() {
  return (
    <section className="bg-white py-20 sm:py-24" id="how-it-works">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mx-auto mb-12 max-w-xl text-center">
          <p className="section-kicker">A clear place to start</p>
          <h2 className="mt-3 text-3xl font-bold tracking-[-0.035em] text-[#0B1F44] sm:text-[38px]">
            How It Works
          </h2>
          <p className="mt-4 text-[15px] leading-7 text-[#65758c]">
            A little focused practice can make your next step feel more
            familiar.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card
                className="step-card relative rounded-[9px] border-[#e5ebf3] bg-white py-0 shadow-none"
                key={step.number}
              >
                <CardContent className="relative px-5 pb-6 pt-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <span className="flex size-11 items-center justify-center rounded-[10px] bg-[#eaf2ff] text-[#155EEF]">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <span className="font-mono text-[12px] font-semibold tracking-[0.08em] text-[#9aa7b9]">
                      {step.number}
                    </span>
                  </div>
                  <CardTitle className="mt-6 text-[17px] font-semibold text-[#0B1F44]">
                    {step.title}
                  </CardTitle>
                  <p className="mt-2 max-w-[290px] text-sm leading-6 text-[#687791]">
                    {step.description}
                  </p>
                  <span
                    aria-hidden="true"
                    className="step-connector hidden md:block"
                  />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
