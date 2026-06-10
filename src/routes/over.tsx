import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Heart, MapPin, Sparkles } from "lucide-react";
import interior from "@/assets/store-interior.jpg";

export const Route = createFileRoute("/over")({
  head: () => ({
    meta: [
      { title: "Over Meso Market Lede — Uw buurtwinkel" },
      { name: "description", content: "Meso Market Lede is een toegankelijke buurtzaak in het centrum van Lede. Lokale aanwezigheid en dagelijkse service." },
      { property: "og:title", content: "Over Meso Market Lede" },
      { property: "og:description", content: "Een toegankelijke buurtzaak in het hart van Lede." },
      { property: "og:image", content: interior },
    ],
  }),
  component: Over,
});

function Over() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Over de winkel</span>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Een vertrouwd gezicht in het centrum van Lede
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Meso Market Lede is een lokale buurtwinkel die draait om eenvoud, toegankelijkheid en een warm onthaal. Wij staan elke dag voor onze buren klaar.
          </p>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-2 md:items-center">
          <div className="overflow-hidden rounded-2xl border border-border shadow-soft">
            <img src={interior} alt="Interieur van Meso Market Lede" className="h-full w-full object-cover" width={1400} height={1000} loading="lazy" />
          </div>
          <div className="space-y-6">
            {[
              { icon: MapPin, title: "Lokale aanwezigheid", text: "Gevestigd aan de Markt in Lede — een vertrouwd adres voor de buurt." },
              { icon: Heart, title: "Dagelijkse service", text: "Een persoonlijke aanpak waarbij u altijd geholpen wordt door bekende gezichten." },
              { icon: Sparkles, title: "Toegankelijk voor iedereen", text: "Een overzichtelijke winkel waar u snel en aangenaam uw boodschappen kan doen." },
            ].map((b) => (
              <div key={b.title} className="flex gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                  <b.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-xl font-semibold">{b.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{b.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-warm">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Kom gerust eens langs</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Een vriendelijk woord, een snelle boodschap of gewoon een bezoekje — u bent altijd welkom in onze winkel.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">
              Plan uw bezoek
            </Link>
            <a href="tel:+32487486152" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold hover:bg-primary-soft hover:text-primary">
              Bel ons
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
