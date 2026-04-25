import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Eye, EyeOff, Loader2, Lock, UserRound } from "lucide-react";
import logo from "@/imports/LEARNHUB-GOLD.png";
import { useAuth } from "../hooks/useAuth";

export default function UnifiedLogin() {
  const navigate = useNavigate();
  const { loginWithId } = useAuth();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [idError, setIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setIdError("");
    setPasswordError("");

    const normalizedId = id.trim().toUpperCase();
    const normalizedPassword = password.trim();

    if (!normalizedId) {
      setIdError("Please enter your ID.");
      return;
    }
    if (!normalizedId.startsWith("FA-") && !normalizedId.startsWith("ST-")) {
      setIdError("Use FA-xxxx for faculty or ST-xxxx for student IDs.");
      return;
    }
    if (!normalizedPassword) {
      setPasswordError("Please enter your password.");
      return;
    }

    setIsSubmitting(true);
    const result = loginWithId(normalizedId, normalizedPassword);
    if (!result.success) {
      setError(result.message);
      setIsSubmitting(false);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 300));
    navigate(result.userType === "faculty" ? "/faculty/dashboard" : "/student/dashboard");
  };

  return (
    <div className="min-h-screen bg-muted px-4 py-10 sm:px-6 text-foreground">
      <div className="mx-auto max-w-5xl">
        <button
          onClick={() => navigate("/")}
          className="mb-6 inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-colors duration-300 hover:bg-secondary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Landing Page
        </button>

        <div className="grid overflow-hidden rounded-2xl border border-border bg-background shadow-xl lg:grid-cols-2">
          <div className="bg-gradient-to-br from-primary via-[#1a1a1a] to-[#2a2a2a] p-8 text-primary-foreground sm:p-10">
            <img src={logo} alt="Intelearn Hub" className="h-12 w-auto rounded-lg bg-white p-1" />
            <h1 className="mt-8 text-3xl font-bold leading-tight">Welcome Back to Intelearn Hub</h1>
            <p className="mt-4 text-secondary">
              Log in with your assigned ID and password. We automatically route you to the correct dashboard.
            </p>
            <div className="mt-8 rounded-xl border border-accent/40 bg-accent/15 p-4">
              <p className="text-sm font-semibold text-secondary">Accepted ID format</p>
              <ul className="mt-2 space-y-1 text-sm text-secondary">
                <li>`FA-1001` for faculty accounts</li>
                <li>`ST-1001` for student accounts</li>
              </ul>
            </div>
          </div>

          <div className="p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-foreground">Login</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your ID and password to continue.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="user-id" className="mb-2 block text-sm font-semibold text-muted-foreground">ID Number</label>
                <div className="relative">
                  <UserRound className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="user-id"
                    type="text"
                    value={id}
                    onChange={(event) => {
                      setId(event.target.value.toUpperCase());
                      if (idError) setIdError("");
                    }}
                    placeholder="FA-1001 or ST-1001"
                    required
                    autoComplete="username"
                    autoCapitalize="off"
                    autoCorrect="off"
                    inputMode="text"
                    aria-invalid={!!idError}
                    aria-describedby={idError ? "user-id-error" : undefined}
                    className={`h-12 w-full rounded-lg border bg-background pl-11 pr-4 text-foreground outline-none transition-colors duration-300 focus:border-accent focus-visible:ring-2 focus-visible:ring-ring/40 ${
                      idError ? "border-red-400" : "border-border"
                    }`}
                  />
                </div>
                {idError && <p id="user-id-error" className="mt-2 text-xs text-red-700">{idError}</p>}
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-semibold text-muted-foreground">Password</label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      if (passwordError) setPasswordError("");
                    }}
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                    aria-invalid={!!passwordError}
                    aria-describedby={passwordError ? "password-error" : undefined}
                    className={`h-12 w-full rounded-lg border bg-background pl-11 pr-12 text-foreground outline-none transition-colors duration-300 focus:border-accent focus-visible:ring-2 focus-visible:ring-ring/40 ${
                      passwordError ? "border-red-400" : "border-border"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {passwordError && <p id="password-error" className="mt-2 text-xs text-red-700">{passwordError}</p>}
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  aria-live="polite"
                  className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="h-12 w-full rounded-lg bg-accent font-semibold text-accent-foreground transition-colors duration-300 hover:bg-[#b08d18] hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-70"
              >
                <span className="inline-flex items-center gap-2">
                  {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {isSubmitting ? "Signing in..." : "Login to Dashboard"}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
