import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X, Phone, MapPin, Moon, Sun } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/contact", label: "Contact & Openingsuren" },
] as const;

function ThemeToggle({ className = "" }: { className?: string }) {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : prefers;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };
  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Schakel naar lichte modus" : "Schakel naar donkere modus"}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground/80 transition hover:bg-primary-soft hover:text-primary ${className}`}
    >
      {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground font-display text-lg font-bold">M</span>
            <span className="flex flex-col leading-tight">
              <span className="font-display text-base font-semibold sm:text-lg">Meso Market</span>
              <span className="text-[11px] uppercase tracking-widest text-muted-foreground">Lede</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:bg-primary-soft hover:text-primary"
                activeProps={{ className: "bg-primary-soft text-primary" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
            <a
              href="tel:+32487486152"
              className="ml-2 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-90"
            >
              <Phone className="h-4 w-4" /> 0487 48 61 52
            </a>
          </nav>
          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-border"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {open && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-base font-medium text-foreground/80 hover:bg-primary-soft"
                  activeProps={{ className: "bg-primary-soft text-primary" }}
                  activeOptions={{ exact: n.to === "/" }}
                >
                  {n.label}
                </Link>
              ))}
              <a
                href="tel:+32487486152"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
              >
                <Phone className="h-4 w-4" /> Bel 0487 48 61 52
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-warm">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground font-display font-bold">M</span>
              <span className="font-display text-lg font-semibold">Meso Market Lede</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Uw lokale dagwinkel in het hart van Lede. Vriendelijke bediening, elke dag opnieuw.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/80">Contact</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                Markt 8, 9340 Lede, België
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a href="tel:+32487486152" className="hover:text-primary">0487 48 61 52</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/80">Openingsuren</h3>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li className="flex justify-between"><span>Ma – Wo</span><span>08:00 – 17:30</span></li>
              <li className="flex justify-between"><span>Donderdag</span><span className="text-destructive">Gesloten</span></li>
              <li className="flex justify-between"><span>Vr – Zo</span><span>08:00 – 17:30</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/70">
          <p className="mx-auto max-w-6xl px-4 py-4 text-center text-xs text-muted-foreground sm:px-6">
            © {new Date().getFullYear()} Meso Market Lede — Markt 8, 9340 Lede
          </p>
        </div>
      </footer>
    </div>
  );
}
