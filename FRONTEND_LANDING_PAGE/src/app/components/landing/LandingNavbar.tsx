import { motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import logoMark from "@/assets/LEARNHUB-GOLD(1).svg";

const NAV_LINKS = [
  { label: "Home", hash: "home" },
  { label: "Subjects", hash: "subjects" },
  { label: "Testimonials", hash: "testimonials" },
  { label: "Contacts", hash: "contact" },
] as const;

export default function LandingNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const isLoginRoute = location.pathname === "/login";

  const getSectionHref = (hash: string) => (isLoginRoute ? `/#${hash}` : `#${hash}`);

  const goToLoginInterface = () => {
    if (isLoginRoute) {
      document.getElementById("login-interface")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    navigate("/login");
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 14);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isLoginRoute) {
      setActiveSection("home");
      return;
    }

    const sectionIds = NAV_LINKS.map((item) => item.hash);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => !!section);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.2, 0.4, 0.6],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isLoginRoute]);

  return (
    <motion.nav
      initial={shouldReduceMotion ? false : { y: -100 }}
      animate={shouldReduceMotion ? undefined : { y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 z-50 w-full border-b bg-background/90 backdrop-blur-sm transition-all duration-300 ${
        isScrolled ? "border-border shadow-md" : "border-border/80 shadow-sm"
      }`}
    >
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 transition-all duration-300 ${isScrolled ? "py-3" : "py-4"}`}>
        <div className="flex items-center justify-between gap-4">
          <a href={getSectionHref("home")} className="brand-lockup" aria-label="Intelearn Hub home">
            <img src={logoMark} alt="Intelearn Hub logo" className="brand-lockup-mark" />
            <span className="mx-2 h-8 w-px bg-accent/40" aria-hidden="true" />
            <span className="brand-lockup-text">Intelearn Hub</span>
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((item) => (
              <a
                key={item.label}
                href={getSectionHref(item.hash)}
                className={`group relative text-sm font-medium tracking-wide transition-colors duration-300 ${
                  !isLoginRoute && activeSection === item.hash
                    ? "text-accent"
                    : "text-muted-foreground hover:text-accent"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-0.5 w-full origin-left bg-accent transition-transform duration-300 ${
                    !isLoginRoute && activeSection === item.hash ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <button onClick={goToLoginInterface} className="landing-secondary-btn px-4 py-2 text-sm">
              Login
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border text-muted-foreground sm:hidden"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <>
          <button
            type="button"
            aria-label="Close menu overlay"
            onClick={closeMobileMenu}
            className="fixed inset-0 z-40 bg-black/45 sm:hidden"
          />
          <div className="fixed top-0 right-0 z-50 h-full w-72 border-l border-border bg-background p-5 shadow-xl sm:hidden">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-foreground">Menu</p>
              <button
                onClick={closeMobileMenu}
                className="flex min-h-10 min-w-10 items-center justify-center rounded-lg border border-border text-muted-foreground"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 space-y-2">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={getSectionHref(item.hash)}
                  onClick={closeMobileMenu}
                  className={`block min-h-11 rounded-lg px-3 py-3 text-sm transition-colors duration-200 ${
                    !isLoginRoute && activeSection === item.hash
                      ? "bg-secondary text-accent"
                      : "text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <button
              onClick={() => {
                closeMobileMenu();
                goToLoginInterface();
              }}
              className="mt-6 min-h-11 w-full rounded-lg bg-black px-4 py-3 text-sm font-semibold text-white"
            >
              Login
            </button>
          </div>
        </>
      )}
    </motion.nav>
  );
}
