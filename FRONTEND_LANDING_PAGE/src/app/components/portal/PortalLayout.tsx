import type { ReactNode } from "react";

interface PortalLayoutProps {
  children: ReactNode;
}

export default function PortalLayout({ children }: PortalLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/45 to-background text-foreground lg:bg-muted">
      <div className="mx-auto flex min-h-screen w-full max-w-[1680px] flex-col lg:flex-row">
        {children}
      </div>
    </div>
  );
}
