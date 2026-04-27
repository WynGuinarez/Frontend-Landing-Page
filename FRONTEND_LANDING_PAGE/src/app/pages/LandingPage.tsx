import { useReducedMotion } from "motion/react";
import { ReactNode } from "react";
import { useNavigate } from "react-router";

import {
  FooterSection,
  HeroSection,
  LandingNavbar,
  SubjectsSection,
  TestimonialsSection,
  TrustSection,
} from "@/features/landing/components";
import { landingCourses, landingTestimonials } from "@/features/landing/model/content";

interface LandingPageProps {
  loginSection?: ReactNode;
}

export default function LandingPage({ loginSection }: LandingPageProps) {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="landing-shell relative overflow-hidden">
      <div aria-hidden="true" className="site-ambient">
        <div className="site-ambient-gradient" />
        <div className="site-ambient-orb site-ambient-orb-gold" />
        <div className="site-ambient-orb site-ambient-orb-soft" />
        <div className="site-ambient-grain" />
      </div>
      <LandingNavbar />
      <HeroSection shouldReduceMotion={!!shouldReduceMotion} />
      {loginSection && (
        <section id="login-interface" className="landing-section relative z-10 scroll-mt-28 bg-background/80 pt-8">
          <div className="landing-container">{loginSection}</div>
        </section>
      )}
      <SubjectsSection shouldReduceMotion={!!shouldReduceMotion} courses={landingCourses} />
      <TrustSection shouldReduceMotion={!!shouldReduceMotion} />
      <TestimonialsSection shouldReduceMotion={!!shouldReduceMotion} testimonials={landingTestimonials} />
      <FooterSection />

      <div className="fixed bottom-4 left-4 right-4 z-40 sm:hidden">
        <button
          onClick={() => {
            if (loginSection) {
              document.getElementById("login-interface")?.scrollIntoView({ behavior: "smooth", block: "start" });
              return;
            }
            navigate("/login");
          }}
          className="landing-primary-btn w-full shadow-xl"
        >
          Login with ID
        </button>
      </div>
    </div>
  );
}
