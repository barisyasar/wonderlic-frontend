import { Brain } from "lucide-react";
import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="border-b border-[#e7edf5]">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-4 sm:px-8 lg:flex-nowrap lg:px-10">
        <Link
          aria-label="Wonderlic home"
          className="inline-flex items-center gap-2.5"
          href="/"
        >
          <span className="flex size-9 items-center justify-center rounded-[10px] bg-[#155EEF] text-white shadow-[0_5px_14px_#155eef35]">
            <Brain aria-hidden="true" className="size-5" strokeWidth={2.1} />
          </span>
          <span className="text-[19px] font-bold tracking-[-0.035em] text-[#0B1F44]">
            wonderlic
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="order-3 flex w-full items-center gap-6 text-[13px] font-medium text-[#52627a] lg:order-2 lg:w-auto"
        >
          <a
            className="transition-colors hover:text-[#155EEF]"
            href="#how-it-works"
          >
            How it works
          </a>
          <a className="transition-colors hover:text-[#155EEF]" href="#quizzes">
            Free quizzes
          </a>
          <a className="transition-colors hover:text-[#155EEF]" href="#faq">
            FAQ
          </a>
        </nav>
      </div>
    </header>
  );
}
