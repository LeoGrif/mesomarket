import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { MapPin, Phone, Clock, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { z } from "zod";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Openingsuren — Meso Market Lede" },
      { name: "description", content: "Contacteer Meso Market Lede aan Markt 8, 9340 Lede. Bekijk onze openingsuren, plan uw route of stuur ons een bericht." },
      { property: "og:title", content: "Contact & Openingsuren — Meso Market Lede" },
      { property: "og:description", content: "Markt 8, 9340 Lede — Tel. 0487 48 61 52" },
    ],
  }),
  component: Contact,
});

const hours = [
  ["Maandag", "08:00 – 17:30"],
  ["Dinsdag", "08:00 – 17:30"],
  ["Woensdag", "08:00 – 17:30"],
  ["Donderdag", "Gesloten"],
  ["Vrijdag", "08:00 – 17:30"],
  ["Zaterdag", "08:00 – 17:30"],
  ["Zondag", "08:00 – 17:30"],
] as const;

const todayIdx = (new Date().getDay() + 6) % 7; // 0 = maandag

const contactSchema = z.object({
  name: z.string().trim().min(1, "Vul uw naam in").max(100),
  email: z.string().trim().email("Ongeldig e-mailadres").max(255),
  message: z.string().trim().min(1, "Schrijf een bericht").max(1000),
});

function Contact() {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = contactSchema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      message: fd.get("message"),
    });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { errs[String(i.path[0])] = i.message; });
      setErrors(errs);
      setStatus("error");
      return;
    }
    setErrors({});
    setStatus("ok");
    e.currentTarget.reset();
  }

  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Contact</span>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Contact & Openingsuren
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Een vraag of komt u graag langs? U vindt ons aan Markt 8 in Lede.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {/* Info card */}
          <div className="space-y-6 lg:col-span-1">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h2 className="font-display text-xl font-semibold">Bezoek ons</h2>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>Markt 8<br />9340 Lede, België</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <a href="tel:+32487486152" className="hover:text-primary">0487 48 61 52</a>
                </li>
              </ul>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Meso+Market+Lede,+Markt+8,+9340+Lede"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                <MapPin className="h-4 w-4" /> Route plannen
              </a>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <h2 className="font-display text-xl font-semibold">Openingsuren</h2>
              </div>
              <ul className="mt-4 divide-y divide-border text-sm">
                {hours.map(([day, time], i) => {
                  const closed = time === "Gesloten";
                  const today = i === todayIdx;
                  return (
                    <li key={day} className={`flex items-center justify-between py-2.5 ${today ? "font-semibold text-primary" : ""}`}>
                      <span className="flex items-center gap-2">
                        {today && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                        {day}
                      </span>
                      <span className={closed ? "text-destructive" : ""}>{time}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Map + form */}
          <div className="space-y-6 lg:col-span-2">
            <div className="overflow-hidden rounded-2xl border border-border shadow-soft">
              <iframe
                title="Google Maps — Meso Market Lede"
                src="https://www.google.com/maps?q=Meso+Market+Lede,+Markt+8,+9340+Lede&output=embed"
                className="h-80 w-full md:h-96"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
              <h2 className="font-display text-2xl font-semibold">Stuur ons een bericht</h2>
              <p className="mt-1 text-sm text-muted-foreground">Wij nemen zo snel mogelijk contact met u op.</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label htmlFor="name" className="text-sm font-medium">Naam</label>
                  <input id="name" name="name" maxLength={100} required className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                  {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                </div>
                <div className="sm:col-span-1">
                  <label htmlFor="email" className="text-sm font-medium">E-mail</label>
                  <input id="email" name="email" type="email" maxLength={255} required className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                  {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="text-sm font-medium">Bericht</label>
                  <textarea id="message" name="message" rows={5} maxLength={1000} required className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                  {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">
                  <Send className="h-4 w-4" /> Verstuur bericht
                </button>
                {status === "ok" && <span className="text-sm text-primary">Bedankt! Uw bericht is verzonden.</span>}
              </div>
            </form>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
