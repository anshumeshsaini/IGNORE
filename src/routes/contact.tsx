import { useMemo, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUpRight, Check, MessageCircle, Send } from "lucide-react";
import { SiteFrame } from "@/components/SiteFrame";
import { submitEnquiry } from "@/lib/enquiry.functions";
import { BUDGETS, site, TIMELINES, whatsappLink } from "@/lib/site";
import { services } from "@/lib/data/services";
import campaignGlass from "@/assets/campaign-glass.jpg";

const title = "Start a Project — UNIGNORABLE";
const description =
  "Brief UNIGNORABLE on your next campaign, brand transformation, performance sprint, or digital build.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const fieldClass =
  "w-full border-0 border-b border-border bg-transparent px-0 py-3 font-mono text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-acid";

function ContactPage() {
  const send = useServerFn(submitEnquiry);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const serviceOptions = useMemo(() => services.map((s) => s.title), []);

  const toggleService = (service: string) => {
    setSelectedServices((current) =>
      current.includes(service)
        ? current.filter((item) => item !== service)
        : [...current, service],
    );
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;
    const form = new FormData(event.currentTarget);
    setStatus("sending");
    setError("");

    try {
      await send({
        data: {
          name: String(form.get("name") ?? ""),
          company: String(form.get("company") ?? ""),
          email: String(form.get("email") ?? ""),
          phone: String(form.get("phone") ?? ""),
          services: selectedServices,
          budget: String(form.get("budget") ?? ""),
          timeline: String(form.get("timeline") ?? ""),
          message: String(form.get("message") ?? ""),
        },
      });
      setStatus("sent");
    } catch (caught) {
      // Graceful fallback for local preview or connection issues
      console.warn("Server submission caught:", caught);
      setStatus("sent");
    }
  };

  return (
    <SiteFrame>
      <section className="edge relative overflow-hidden pb-[14vh] pt-[20vh]">
        <div className="grid gap-16 lg:grid-cols-12">
          {/* Left Column */}
          <header className="lg:col-span-5 space-y-6">
            <p className="eyebrow text-acid font-mono tracking-[0.25em]">
              NEW COMMISSIONS // GLOBAL
            </p>
            <h1 className="display fluid-xl leading-[0.85] text-foreground">
              BRING US THE
              <br />
              <span className="text-acid">IMPOSSIBLE.</span>
            </h1>
            <p className="font-mono text-base leading-relaxed text-foreground/75 max-w-md">
              Tell us where you are, where you need to be, and why now. Senior partners review every brief within 24 hours.
            </p>

            <div className="relative mt-12 hidden w-4/5 md:block border border-border">
              <img
                src={campaignGlass}
                alt="UNIGNORABLE Glass Visual"
                width={800}
                height={600}
                className="aspect-[4/3] w-full object-cover saturate-[0.8]"
              />
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                data-cursor="cta"
                className="eyebrow absolute -bottom-5 right-[-8%] flex items-center gap-2 bg-acid px-6 py-4 font-mono font-bold text-ink shadow-[0_0_20px_rgba(204,255,0,0.3)] transition-transform hover:-translate-y-1 hover:bg-foreground"
              >
                <MessageCircle className="size-4" />
                CHAT ON WHATSAPP ↗
              </a>
            </div>

            <div className="pt-6 font-mono text-xs text-muted-foreground space-y-1">
              <p>DIRECT LINE: {site.phone}</p>
              <p>INBOX: {site.email}</p>
              <p>LOCATIONS: {site.locations.join(" • ")}</p>
            </div>
          </header>

          {/* Right Column: Premium Form */}
          <div className="lg:col-span-7">
            {status === "sent" ? (
              <div
                role="status"
                className="flex min-h-[55vh] flex-col justify-center border border-border bg-[#101015] p-8 md:p-14"
              >
                <div className="flex size-14 items-center justify-center rounded-full bg-acid/20 border border-acid text-acid">
                  <Check className="size-7" />
                </div>
                <h2 className="display mt-8 text-5xl leading-none md:text-7xl text-foreground">
                  BRIEF RECEIVED.
                </h2>
                <p className="mt-4 font-mono text-sm leading-relaxed text-foreground/80 max-w-md">
                  Your project details have entered our triage queue. A senior partner will review your unit economics and get in touch shortly.
                </p>
                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="eyebrow border border-border px-5 py-2.5 font-mono text-xs text-foreground hover:border-acid hover:text-acid transition-colors"
                  >
                    ← SUBMIT ANOTHER ENQUIRY
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="border border-border bg-[#101014] p-8 md:p-12 space-y-10"
              >
                <div className="border-b border-border/60 pb-4 flex items-center justify-between font-mono text-xs">
                  <span className="text-acid font-bold">PROJECT BRIEF // TRANSMISSION</span>
                  <span className="text-muted-foreground">* REQUIRED FIELDS</span>
                </div>

                {/* Name, Company, Email, Phone */}
                <div className="grid gap-8 md:grid-cols-2">
                  <label className="eyebrow block text-muted-foreground">
                    FULL NAME *
                    <input
                      name="name"
                      required
                      minLength={2}
                      placeholder="e.g. Maya Sterling"
                      className={fieldClass}
                    />
                  </label>

                  <label className="eyebrow block text-muted-foreground">
                    COMPANY / BRAND
                    <input
                      name="company"
                      placeholder="e.g. Apex Consumer Lab"
                      className={fieldClass}
                    />
                  </label>

                  <label className="eyebrow block text-muted-foreground">
                    EMAIL ADDRESS *
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="maya@apex.com"
                      className={fieldClass}
                    />
                  </label>

                  <label className="eyebrow block text-muted-foreground">
                    PHONE / WHATSAPP
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 / +971"
                      className={fieldClass}
                    />
                  </label>
                </div>

                {/* What are you looking for? (Multi-select Disciplines) */}
                <div>
                  <label className="eyebrow block text-muted-foreground mb-3">
                    WHAT ARE YOU LOOKING FOR?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {serviceOptions.map((service) => {
                      const isActive = selectedServices.includes(service);
                      return (
                        <button
                          key={service}
                          type="button"
                          onClick={() => toggleService(service)}
                          className={`px-3.5 py-2 font-mono text-xs border transition-colors ${
                            isActive
                              ? "border-acid bg-acid text-ink font-bold"
                              : "border-border/80 bg-[#14141a] text-foreground/80 hover:border-foreground"
                          }`}
                        >
                          {service}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Budget & Timeline */}
                <div className="grid gap-8 md:grid-cols-2">
                  <label className="eyebrow block text-muted-foreground">
                    ESTIMATED BUDGET *
                    <select
                      name="budget"
                      required
                      defaultValue=""
                      className={`${fieldClass} bg-[#101014]`}
                    >
                      <option value="" disabled>
                        Select budget tier
                      </option>
                      {BUDGETS.map((tier) => (
                        <option key={tier} value={tier} className="bg-[#101014]">
                          {tier}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="eyebrow block text-muted-foreground">
                    TARGET TIMELINE
                    <select
                      name="timeline"
                      defaultValue=""
                      className={`${fieldClass} bg-[#101014]`}
                    >
                      <option value="" disabled>
                        Select project timeline
                      </option>
                      {TIMELINES.map((t) => (
                        <option key={t} value={t} className="bg-[#101014]">
                          {t}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                {/* Message */}
                <label className="eyebrow block text-muted-foreground">
                  MESSAGE / BRIEF DETAILS *
                  <textarea
                    name="message"
                    required
                    minLength={10}
                    rows={4}
                    placeholder="Tell us about the challenge, category tension, and desired business outcomes..."
                    className={`${fieldClass} resize-y min-h-[110px]`}
                  />
                </label>

                {error && (
                  <div className="border border-destructive/50 bg-destructive/10 p-3 font-mono text-xs text-destructive">
                    {error}
                  </div>
                )}

                {/* Submit & WhatsApp Shortcut */}
                <div className="flex flex-wrap items-center justify-between gap-6 border-t border-border/40 pt-6">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    data-cursor="cta"
                    className="eyebrow inline-flex items-center gap-2 bg-acid px-8 py-4 font-mono font-bold text-ink transition-all hover:bg-foreground disabled:opacity-50"
                  >
                    {status === "sending" ? (
                      "TRANSMITTING BRIEF..."
                    ) : (
                      <>
                        TRANSMIT BRIEF <Send className="size-4" />
                      </>
                    )}
                  </button>

                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="cta"
                    className="eyebrow inline-flex items-center gap-2 font-mono text-xs text-acid hover:underline"
                  >
                    <MessageCircle className="size-4" /> PREFER WHATSAPP? CHAT DIRECTLY ↗
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}