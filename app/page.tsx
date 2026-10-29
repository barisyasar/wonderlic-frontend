import type { Metadata } from "next";
import FAQSection from "@/components/landing/faq-section";
import FreeSection from "@/components/landing/free-section";
import HeroSection from "@/components/landing/hero-section";
import HowItWorks from "@/components/landing/how-it-works";
import QuizGrid from "@/components/landing/quiz-grid";
import SiteFooter from "@/components/landing/site-footer";
import SiteHeader from "@/components/landing/site-header";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <HowItWorks />
        <FreeSection />
        <QuizGrid />
        <FAQSection />
      </main>
      <SiteFooter />
    </>
  );
}
