import { motion, useReducedMotion } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowRight, Menu, Quote, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import logo from "@/imports/LEARNHUB-GOLD.png";

export default function LandingPage() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Why Intelearn", href: "#trust" },
    { label: "Subjects", href: "#subjects" },
    { label: "Testimonials", href: "#testimonials" },
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const heroStats = [
    { label: "Active Learners", value: "1.2k+" },
    { label: "Completion Rate", value: "94%" },
    { label: "Faculty Mentors", value: "20+" },
  ];

  const courses = [
    {
      code: "SE102",
      name: "Software Engineering",
      description:
        "Fundamentals of software development and design patterns",
    },
    {
      code: "STAT1",
      name: "Statistics I",
      description:
        "Introduction to statistical methods and data analysis",
    },
    {
      code: "GV101",
      name: "Graphic and Visual Computing 101",
      description: "Introduction to Graphics Design",
    },
    {
      code: "DM104",
      name: "Data Management",
      description: "Database design and information systems",
    },
    {
      code: "SIA101",
      name: "Systems Integration",
      description:
        "Architecture and integration of enterprise systems",
    },
    {
      code: "AL102",
      name: "Algorithm Design",
      description:
        "Advanced algorithms and computational theory",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Martinez",
      role: "Software Engineering Graduate",
      text: "The SE102 program transformed my career. The practical approach and expert guidance prepared me perfectly for the industry.",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    },
    {
      name: "James Chen",
      role: "Data Management Student",
      text: "Outstanding curriculum and faculty. The hands-on projects in DM104 gave me real-world experience that employers value.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    },
    {
      name: "Emily Rodriguez",
      role: "Statistics Graduate",
      text: "The quality of education here is exceptional. STAT1 provided a solid foundation that I continue to build on in my career.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    },
  ];

  return (
    <div className="landing-shell relative overflow-hidden">
      <div aria-hidden="true" className="site-ambient">
        <div className="site-ambient-gradient" />
        <div className="site-ambient-orb site-ambient-orb-gold" />
        <div className="site-ambient-orb site-ambient-orb-soft" />
        <div className="site-ambient-grain" />
      </div>
      {/* Navigation */}
      <motion.nav
        initial={shouldReduceMotion ? false : { y: -100 }}
        animate={shouldReduceMotion ? undefined : { y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 z-50 w-full border-b border-border bg-background/90 shadow-sm backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <a href="#home" className="brand-lockup" aria-label="Intelearn Hub home">
              <span className="brand-lockup-text">Intelearn Hub</span>
            </a>

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                className="text-sm font-medium tracking-wide text-muted-foreground transition-colors duration-300 hover:text-accent"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => navigate("/login")}
                className="landing-secondary-btn px-4 py-2 text-sm"
              >
                Login
              </button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="sm:hidden min-h-11 min-w-11 rounded-lg border border-border flex items-center justify-center text-muted-foreground"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {isMobileMenuOpen && (
            <div className="sm:hidden mt-4 border-t border-border pt-4 space-y-2">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="block min-h-11 px-3 py-3 rounded-lg text-muted-foreground hover:bg-secondary transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}

              <div className="grid grid-cols-1 gap-2 pt-2">
                <button
                  onClick={() => {
                    closeMobileMenu();
                    navigate("/login");
                  }}
                  className="min-h-11 px-4 py-3 bg-black text-white rounded-lg font-semibold text-sm"
                >
                  Login
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="landing-section relative z-10 flex min-h-screen items-center overflow-hidden bg-background/85 pt-24">
        <div aria-hidden="true" className="hero-ambient">
          <div className="hero-ambient-gradient" />
          <div className="hero-ambient-wave" />
          <div className="hero-ambient-glow" />
          <div className="hero-ambient-orb hero-ambient-orb-gold" />
          <div className="hero-ambient-orb hero-ambient-orb-soft" />
          <div className="hero-ambient-grain" />
          <div className="hero-ambient-vignette" />
        </div>
        <div className="landing-container">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Left Content */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: -40 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="landing-eyebrow"
              >
                <span className="text-accent font-semibold text-sm">
                  ID-based smart access for students and faculty
                </span>
              </motion.div>

              <h1 className="mb-6 text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                Start class-ready,
                <span className="block text-accent">in under a minute</span>
              </h1>

              <p className="landing-subheading mb-8 max-w-xl">
                Intelearn Hub gives one secure sign-in for both students and faculty so you can jump straight into attendance, lessons, and class updates.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <motion.button
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                  onClick={() => navigate("/login")}
                  className="landing-primary-btn px-8 py-4 shadow-lg"
                >
                  Login Now
                </motion.button>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Use `ST-xxxx` or `FA-xxxx` plus your password. No separate portals required.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-muted-foreground">
                <span className="inline-flex h-2 w-2 rounded-full bg-green-600" />
                Updated this term: attendance, dashboard, and secure role routing
              </div>
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-border bg-muted px-4 py-3">
                    <div className="text-xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: 40 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-accent/20 via-transparent to-primary/10 blur-2xl"></div>

              {/* Main Visual Container */}
              <div className="relative z-10 flex items-center justify-center">
                <div className="relative w-full max-w-lg space-y-5">
                  <motion.div
                    animate={shouldReduceMotion ? undefined : { y: [0, -20, 0] }}
                    transition={
                      shouldReduceMotion
                        ? undefined
                        : { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    }
                    className="rounded-[2rem] bg-gradient-to-br from-primary to-[#2a2a2a] p-10 shadow-2xl"
                  >
                    <img src={logo} alt="Intelearn Hub" className="h-auto w-full" decoding="async" />
                  </motion.div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="landing-card">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">Featured Track</p>
                      <h3 className="mt-2 text-lg font-semibold text-foreground">Software Engineering</h3>
                      <p className="mt-2 text-sm text-muted-foreground">Project-based mentoring and practical outcomes.</p>
                    </div>
                    <div className="landing-card border-accent/40 bg-secondary">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">Next Cohort</p>
                      <h3 className="mt-2 text-lg font-semibold text-foreground">Starts Monday</h3>
                      <p className="mt-2 text-sm text-muted-foreground">Secure your portal and begin immediately.</p>
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section id="trust" className="landing-section relative z-10 bg-muted/80 backdrop-blur-[1px]">
        <div className="landing-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="h-px w-16 bg-accent mx-auto mb-8" />
            <h2 className="landing-heading mb-4">Why Learners Trust Intelearn Hub</h2>
            <p className="landing-subheading mx-auto max-w-3xl">
              Built for outcomes with expert mentors, real project work, and secure access for every account.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Expert-led instruction",
                text: "Faculty with industry experience guide each module from basics to advanced practice.",
              },
              {
                title: "Career-ready learning",
                text: "Coursework focuses on practical skills, assessed through projects and performance milestones.",
              },
              {
                title: "Secure learning access",
                text: "Role-based portals and protected accounts help keep student and faculty data safe.",
                icon: <ShieldCheck className="w-5 h-5 text-accent" />,
              },
            ].map((item) => (
              <div key={item.title} className="landing-card landing-card-hover">
                <div className="flex items-center gap-2 mb-3">
                  {item.icon}
                  <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-2xl border border-accent/40 bg-secondary p-6 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-semibold text-foreground">Ready to continue to your workspace?</p>
              <p className="text-sm text-muted-foreground">Log in once with your ID and we route you automatically.</p>
            </div>
            <button
              onClick={() => navigate("/login")}
              className="landing-primary-btn mt-4 sm:mt-0"
            >
              Continue to Login
            </button>
          </div>
        </div>
      </section>

      {/* Subjects Offered Section */}
      <section
        id="subjects"
        className="landing-section relative z-10 bg-muted/72 backdrop-blur-[1px]"
      >
        <div className="landing-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="h-px w-16 bg-accent mx-auto mb-8" />
            <h2 className="landing-heading mb-4">
              Subjects Offered
            </h2>
            <p className="landing-subheading">
              Discover our comprehensive academic courses
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={course.code}
                initial={{ opacity: 0, y: 30 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(212, 175, 55, 0.2)" }}
                className="landing-card landing-card-hover group relative p-8"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/0 via-[#d4af37]/0 to-[#d4af37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                <div className="relative">
                  <div className="text-accent font-mono text-sm mb-4 tracking-wider font-semibold">
                    {course.code}
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-foreground">
                    {course.name}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {course.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="landing-section relative z-10 bg-background/84 backdrop-blur-[1px]">
        <div className="landing-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="h-px w-16 bg-accent mx-auto mb-8" />
            <h2 className="landing-heading mb-4">
              Student Testimonials
            </h2>
            <p className="landing-subheading">
              Hear from our successful graduates
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
                className="landing-card bg-muted p-8"
              >
                <Quote className="w-10 h-10 text-accent mb-6" />
                <p className="text-muted-foreground leading-relaxed mb-8 italic">
                  "{testimonial.text}"
                </p>
                <div className="mb-6 inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold text-[#b08d18]">
                  Verified learner outcome
                </div>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-accent"
                    loading="lazy"
                    decoding="async"
                  />
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-border bg-muted p-6 text-center">
            <p className="text-lg font-semibold text-foreground">Already enrolled this term?</p>
            <p className="text-sm text-muted-foreground">Use your ID and password to continue where you left off.</p>
            <button
              onClick={() => navigate("/login")}
              className="landing-primary-btn inline-flex items-center gap-2"
            >
              Go to Login <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border bg-background/88 py-12 px-4 sm:px-6 backdrop-blur-[1px]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Intelearn Hub"
                className="h-10"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {[
                { label: "Home", href: "#home" },
                { label: "Why Intelearn", href: "#trust" },
                {
                  label: "Subjects Offered",
                  href: "#subjects",
                },
                {
                  label: "Testimonials",
                  href: "#testimonials",
                },
                { label: "Login", href: "/login" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-accent transition-colors duration-300"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="text-sm text-muted-foreground">
              © 2026 Intelearn Hub - Online Tutorial Services.
              All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-4 left-4 right-4 z-40 sm:hidden">
        <button
          onClick={() => navigate("/login")}
          className="landing-primary-btn w-full shadow-xl"
        >
          Login with ID
        </button>
      </div>
    </div>
  );
}