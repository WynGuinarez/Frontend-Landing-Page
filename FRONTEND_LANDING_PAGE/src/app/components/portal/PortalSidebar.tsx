import { LogOut } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface PortalNavItem {
  icon: LucideIcon;
  label: string;
  view: string;
}

interface PortalSidebarProps {
  title: string;
  logoSrc: string;
  navItems: PortalNavItem[];
  activeView: string;
  onViewChange: (view: string) => void;
  onLogout: () => void;
}

export default function PortalSidebar({
  title,
  logoSrc,
  navItems,
  activeView,
  onViewChange,
  onLogout,
}: PortalSidebarProps) {
  return (
    <aside className="flex w-full flex-col border-b border-sidebar-border bg-sidebar text-sidebar-foreground lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r lg:border-sidebar-border">
      <div className="border-b border-sidebar-border p-6">
        <div className="flex items-center gap-3">
          <img src={logoSrc} alt="Intelearn Hub Logo" className="h-12 w-auto rounded-md bg-white/95 p-1" />
        </div>
        <div className="mt-2 text-sm text-secondary">{title}</div>
      </div>

      <nav className="flex-1 p-4">
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => onViewChange(item.view)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                activeView === item.view
                  ? "bg-sidebar-primary text-sidebar-primary-foreground font-semibold"
                  : "text-secondary hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-secondary hover:bg-red-500/10 hover:text-red-300 transition-all duration-300"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
