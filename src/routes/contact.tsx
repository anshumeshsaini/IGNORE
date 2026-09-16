import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { SiteFrame } from "@/components/SiteFrame";
import { SplitLines } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { site, whatsappLink, BUDGETS, TIMELINES } from "@/lib/site";
import { submitEnquiry } from "@/lib/enquiry.functions";
import { sounds } from "@/lib/sound";
import { ArrowUpRight, Check, MessageCircle, Mail, Sparkles, Clock, ShieldCheck } from "lucide-react";

const SERVICE_OPTIONS = [
  "Brand Direction & Identity",
  "High-End Film & Production",
  "Bespoke Web Development",
  "Meta & Google Ads Engine",
  "Motion & 3D Animation",
  "Full Studio Retainer",
];

const title = "Commission a Project — UNIGNORABLE Studio";
const description =
  "Start a conversation with UNIGNORABLE. We engineer bespoke creative campaigns, films, and digital platforms.";

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

function ContactPage() {
  const submit = useServerFn(submitEnquiry);

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [budget, setBudget] = useState<string>("");
  const [timeline, setTimeline] = useState<string>("");
  const [message, setMessage] = useState("");

  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const toggleService = (svc: string) => {
    sounds.play("click");
    setSelectedServices((prev) =>
      prev.includes(svc) ? prev.filter((s) => s !== svc) : [...prev, svc]
    );
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (state === "sending" || state === "done") return;

    if (!name.trim()) {
      sounds.play("click");
      setState("error");
      setErrorMsg("Please tell us your name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      sounds.play("click");
      setState("error");
      setErrorMsg("Please provide a valid work email address.");
      return;
    }
    if (message.trim().length < 10) {
      sounds.play("click");
      setState("error");
      setErrorMsg("Please share a brief note about your project goals.");
      return;
    }

    setState("sending");
    sounds.play("pop");

    try {
      await submit({
        data: {
          name,
          company,
          email,
          phone,
          services: selectedServices,
          budget,
          timeline,
          message,
        },
      });
      setState("done");
      sounds.play("chime");
    } catch {
      setState("error");
      setErrorMsg("Something went wrong submitting your brief. Please try again or reach out directly on WhatsApp.");
    }
  }

  return (
    <SiteFrame>
      <div className="relative overflow-hidden pt-32 pb-24 md:pt-44 md:pb-36">
        {/* Luminous atmospheric blur */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/4 left-1/2 -z-10 size-[60vw] -translate-x-1/2 rounded-full bg-acid/[0.05] blur-[150px]"
        />

        <div className="edge">
          <div className="max-w-4xl">
            <span className="stamp-badge">
              <Sparkles className="size-3.5 text-acid" />
              NOW ACCEPTING Q2/Q3 COMMISSIONS
            </span>
            <SplitLines
              text={"START A PROJECT."}
              className="display fluid-hero mt-4 text-foreground tracking-tight"
            />
            <p className="mt-6 text-lg md:text-2xl font-light text-foreground/80 leading-relaxed max-w-2xl">
              We take on a strictly limited roster of brands each season. Fill out the brief below or
              reach out directly for expedited review.
            </p>
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-12 items-start">
            {/* Left Form */}
            <div className="lg:col-span-8">
              {state === "done" ? (
                <div className="glass-surface rounded-3xl p-10 md:p-14 border border-acid/30 text-center animate-in zoom-in-95 duration-500">
                  <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-acid/20 text-acid mb-6">
                    <Check className="size-8" />
                  </div>
                  <h3 className="display text-3xl md:text-4xl text-foreground">
                    BRIEF RECEIVED.
                  </h3>
                  <p className="mt-4 text-base md:text-lg text-foreground/80 max-w-md mx-auto leading-relaxed">
                    A senior partner has received your submission. We review every brief within 24 hours
                    and will reach out directly to schedule an exploratory session.
                  </p>
                  <div className="mt-8 flex justify-center gap-4">
                    <a
                      href={whatsappLink()}
                      target="_blank"
                      rel="noreferrer"
                      className="eyebrow inline-flex items-center gap-2 rounded-full bg-acid px-8 py-3.5 text-ink font-bold hover:bg-white transition-colors"
                    >
                      <MessageCircle className="size-4" />
                      WHATSAPP US TO EXPEDITE ↗
                    </a>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="glass-surface rounded-3xl p-8 sm:p-12 border border-white/15 space-y-8"
                  noValidate
                >
                  {/* Name & Company */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="eyebrow text-muted-foreground block mb-2">
                        YOUR NAME *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Elena Vance"
                        className="w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3.5 text-foreground placeholder:text-muted-foreground/50 focus:border-acid focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-company" className="eyebrow text-muted-foreground block mb-2">
                        COMPANY / BRAND
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Vance Robotics Ltd"
                        className="w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3.5 text-foreground placeholder:text-muted-foreground/50 focus:border-acid focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-email" className="eyebrow text-muted-foreground block mb-2">
                        WORK EMAIL *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="elena@vance.io"
                        className="w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3.5 text-foreground placeholder:text-muted-foreground/50 focus:border-acid focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-phone" className="eyebrow text-muted-foreground block mb-2">
                        PHONE / WHATSAPP (OPTIONAL)
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 019-2834"
                        className="w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3.5 text-foreground placeholder:text-muted-foreground/50 focus:border-acid focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Services Pill Select */}
                  <div>
                    <span className="eyebrow text-muted-foreground block mb-3">
                      DISCIPLINES REQUIRED (SELECT ALL THAT APPLY)
                    </span>
                    <div className="flex flex-wrap gap-2.5">
                      {SERVICE_OPTIONS.map((svc) => {
                        const selected = selectedServices.includes(svc);
                        return (
                          <button
                            key={svc}
                            type="button"
                            onClick={() => toggleService(svc)}
                            className={`rounded-full px-4 py-2 text-xs font-mono transition-all duration-300 ${
                              selected
                                ? "bg-acid font-bold text-ink shadow-[0_0_15px_rgba(204,255,0,0.35)] scale-105"
                                : "border border-white/15 bg-white/[0.02] text-foreground/80 hover:border-white/30"
                            }`}
                          >
                            {svc}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget & Timeline Select */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-budget" className="eyebrow text-muted-foreground block mb-2">
                        APPROXIMATE BUDGET
                      </label>
                      <select
                        id="contact-budget"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full rounded-xl border border-white/15 bg-ink px-4 py-3.5 text-foreground focus:border-acid focus:outline-none transition-colors"
                      >
                        <option value="">Select an investment tier...</option>
                        {BUDGETS.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contact-timeline" className="eyebrow text-muted-foreground block mb-2">
                        TARGET TIMELINE
                      </label>
                      <select
                        id="contact-timeline"
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        className="w-full rounded-xl border border-white/15 bg-ink px-4 py-3.5 text-foreground focus:border-acid focus:outline-none transition-colors"
                      >
                        <option value="">Select launch window...</option>
                        {TIMELINES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="eyebrow text-muted-foreground block mb-2">
                      PROJECT OVERVIEW & AMBITIONS *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about the problem you are solving, your current metrics, and what unfair advantage you want to seize..."
                      className="w-full rounded-xl border border-white/15 bg-white/[0.03] p-4 text-foreground placeholder:text-muted-foreground/50 focus:border-acid focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {errorMsg && (
                    <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs font-mono text-rose-300">
                      {errorMsg}
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Magnetic strength={0.3}>
                      <button
                        type="submit"
                        data-cursor="cta"
                        disabled={state === "sending"}
                        className="eyebrow inline-flex items-center gap-2 rounded-full bg-acid px-10 py-4 font-bold text-acid-foreground shadow-[0_0_25px_rgba(204,255,0,0.35)] transition-all hover:bg-white hover:scale-105 disabled:opacity-50"
                      >
                        {state === "sending" ? "TRANSMITTING BRIEF…" : "TRANSMIT BRIEF"}
                        <ArrowUpRight className="size-4" />
                      </button>
                    </Magnetic>
                  </div>
                </form>
              )}
            </div>

            {/* Right Contact Info Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="glass-surface rounded-3xl p-6 sm:p-8 border border-white/15">
                <span className="eyebrow text-acid block mb-4">DIRECT CHANNELS</span>
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-mono text-muted-foreground block">WHATSAPP PRIORITY</span>
                    <a
                      href={whatsappLink()}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="cta"
                      onClick={() => sounds.play("pop")}
                      className="text-base font-bold text-foreground hover:text-acid flex items-center gap-2 mt-1"
                    >
                      <MessageCircle className="size-4 text-acid" />
                      +{site.whatsappNumber} ↗
                    </a>
                  </div>

                  <div className="pt-3 border-t border-white/10">
                    <span className="text-[10px] font-mono text-muted-foreground block">EXECUTIVE INBOX</span>
                    <a
                      href={`mailto:${site.email}`}
                      data-cursor="cta"
                      onClick={() => sounds.play("pop")}
                      className="text-base font-bold text-foreground hover:text-acid flex items-center gap-2 mt-1"
                    >
                      <Mail className="size-4 text-acid" />
                      {site.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="glass-surface rounded-3xl p-6 sm:p-8 border border-white/15">
                <span className="eyebrow text-acid block mb-4">OUR COMMITMENT</span>
                <ul className="space-y-3 text-xs text-muted-foreground font-normal">
                  <li className="flex items-start gap-2.5">
                    <Clock className="size-4 text-acid shrink-0 mt-0.5" />
                    <span>24-Hour Review Guaranteed on every brief.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <ShieldCheck className="size-4 text-acid shrink-0 mt-0.5" />
                    <span>Strict NDA by default. All trade secrets protected.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Sparkles className="size-4 text-acid shrink-0 mt-0.5" />
                    <span>Direct founder-to-director engagement. No middle managers.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteFrame>
  );
}
