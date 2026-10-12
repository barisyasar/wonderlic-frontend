import { ArrowUp, Brain } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="border-t border-[#e7edf5] bg-white">
      <div className="mx-auto max-w-7xl px-5 pb-6 pt-12 sm:px-8 lg:px-10">
        <div className="grid gap-10 border-b border-[#e7edf5] pb-9 sm:grid-cols-[1.3fr_0.7fr]">
          <div>
            <a
              aria-label="Wonderlic home"
              className="inline-flex items-center gap-2.5"
              href="#top"
            >
              <span className="flex size-8 items-center justify-center rounded-[9px] bg-[#155EEF] text-white">
                <Brain aria-hidden="true" className="size-[17px]" />
              </span>
              <span className="text-[18px] font-bold tracking-[-0.035em] text-[#0B1F44]">
                wonderlic
              </span>
            </a>
            <p className="mt-3 max-w-sm text-[13px] leading-6 text-[#687791]">
              A welcoming place to explore aptitude practice and build
              confidence, one question at a time.
            </p>
          </div>
          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-x-6 gap-y-3 self-start text-[13px] font-medium text-[#596a82]"
          >
            <a
              className="transition-colors hover:text-[#155EEF]"
              href="#how-it-works"
            >
              How It Works
            </a>
            <a
              className="transition-colors hover:text-[#155EEF]"
              href="#quizzes"
            >
              Free Quizzes
            </a>
            <a className="transition-colors hover:text-[#155EEF]" href="#faq">
              FAQ
            </a>
          </nav>
        </div>
        <div className="flex flex-col gap-3 pt-5 text-xs text-[#8491a4] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Wonderlic. All rights reserved.</p>
          <a
            className="inline-flex w-fit items-center gap-1 font-medium text-[#52627a] transition-colors hover:text-[#155EEF]"
            href="#top"
          >
            Back to top <ArrowUp aria-hidden="true" className="size-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
