interface PortalHeaderProps {
  title: string;
  subtitle: string;
  avatar: string;
  name: string;
  meta: string;
  onProfileClick: () => void;
}

export default function PortalHeader({
  title,
  subtitle,
  avatar,
  name,
  meta,
  onProfileClick,
}: PortalHeaderProps) {
  return (
    <header className="border-b border-border bg-background px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>

        <button
          onClick={onProfileClick}
          className="flex items-center gap-3 rounded-lg px-4 py-2 transition-colors duration-300 hover:bg-secondary"
        >
          <img
            src={avatar}
            alt={name}
            className="h-10 w-10 rounded-full border-2 border-accent object-cover"
          />
          <div className="text-left">
            <div className="font-semibold text-foreground">{name}</div>
            <div className="text-xs text-muted-foreground">{meta}</div>
          </div>
        </button>
      </div>
    </header>
  );
}
