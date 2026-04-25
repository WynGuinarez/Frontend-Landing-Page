import { createBrowserRouter } from "react-router";
import { lazy, Suspense, type ReactNode } from "react";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const FacultyPortal = lazy(() => import("./pages/FacultyPortal"));
const StudentPortal = lazy(() => import("./pages/StudentPortal"));
const UnifiedLogin = lazy(() => import("./pages/UnifiedLogin"));

const withSuspense = (component: ReactNode) => (
  <Suspense fallback={<div className="min-h-screen grid place-items-center text-muted-foreground">Loading...</div>}>
    {component}
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: withSuspense(<LandingPage />),
  },
  {
    path: "/login",
    element: withSuspense(<UnifiedLogin />),
  },
  {
    path: "/faculty/dashboard",
    element: withSuspense(<FacultyPortal />),
  },
  {
    path: "/student/login",
    element: withSuspense(<UnifiedLogin />),
  },
  {
    path: "/faculty/login",
    element: withSuspense(<UnifiedLogin />),
  },
  {
    path: "/student/dashboard",
    element: withSuspense(<StudentPortal />),
  },
]);
