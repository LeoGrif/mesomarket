import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Phone, Clock, Heart, Users, Store } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import hero from "@/assets/hero-store.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Meso Market Lede — Uw lokale buurtwinkel in Lede" },
      { name: "description", content: "Meso Market Lede is uw vriendelijke buurtwinkel aan Markt 8 in Lede. Dagelijkse service, lokale aanwezigheid en een warm onthaal." },
      { property: "og:title", content: "Meso Market Lede — Uw lokale buurtwinkel" },
      { property: "og:description", content: "Vriendelijke buurtwinkel in het hart van Lede. Markt 8, 9340 Lede." },
      { property: "og:image", content: hero },
      { name: "twitter:image", content: hero },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={hero} alt="Meso Market Lede – verse producten aan de winkel" className="h-full w-full object-cover" width={1600} height={1024} />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/55 to-background" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 md:py-36">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/80 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur">
            <Store className="h-3.5 w-3.5" /> Buurtwinkel in Lede
          </span>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl md:text-6xl">
            Uw lokale buurtwinkel <span className="text-primary">in Lede</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Dagelijkse service en vriendelijke bediening in het hart van Lede. Stap binnen, wij staan voor u klaar.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Meso+Market+Lede,+Markt+8,+9340+Lede"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-90"
            >
              <MapPin className="h-4 w-4" /> Route bekijken
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition hover:bg-primary-soft hover:text-primary"
            >
              <Phone className="h-4 w-4" /> Contact opnemen
            </Link>
          </div>
        </div>
      </section>

      {/* Intro cards */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { icon: Heart, title: "Vriendelijke bediening", text: "Een warm onthaal en persoonlijke service, elke dag opnieuw." },
            { icon: Users, title: "Lokale aanwezigheid", text: "Verankerd in Lede, dicht bij de mensen uit de buurt." },
            { icon: Clock, title: "Dagelijks open", text: "Zes dagen per week voor u open — alleen donderdag gesloten." },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Practical info strip */}
      <section className="bg-warm">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">Kom langs op de Markt</h2>
            <p className="mt-3 text-muted-foreground">
              U vindt ons aan Markt 8 in Lede — vlot bereikbaar te voet, met de fiets of de wagen.
            </p>
            <div className="mt-6 space-y-3 text-sm">
              <p className="flex items-center gap-3"><MapPin className="h-4 w-4 text-primary" /> Markt 8, 9340 Lede</p>
              <p className="flex items-center gap-3"><Phone className="h-4 w-4 text-primary" /> <a className="hover:text-primary" href="tel:+32487486152">0487 48 61 52</a></p>
            </div>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Bekijk openingsuren
            </Link>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border shadow-soft">
            <iframe
              title="Locatie Meso Market Lede"
              src="https://www.google.com/maps?q=Meso+Market+Lede,+Markt+8,+9340+Lede&output=embed"
              className="h-72 w-full md:h-80"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
