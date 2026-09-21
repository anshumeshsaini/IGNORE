import { useMemo, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUpRight, Check, MessageCircle } from "lucide-react";
import { SiteFrame } from "@/components/SiteFrame";
import { Button } from "@/components/ui/button";
import { submitEnquiry } from "@/lib/enquiry.functions";
import { BUDGETS, site, TIMELINES, whatsappLink } from "@/lib/site";
import { services } from "@/lib/data/services";
import campaignGlass from "@/assets/campaign-glass.jpg";

const title = "Start a Project — UNIGNORABLE";
const description = "Tell UNIGNORABLE about your next campaign, brand, website or growth challenge.";

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
  "w-full border-0 border-b border-border bg-transparent px-0 py-4 text-lg text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-acid";

function ContactPage() {
  const send = useServerFn(submitEnquiry);
  const [selected, setSelected] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const serviceOptions = useMemo(() => services.map((service) => service.title), []);

  const toggleService = (service: string) => {
    setSelected((current) =>
      current.includes(service) ? current.filter((item) => item !== service) : [...current, service],
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
          services: selected,
          budget: String(form.get("budget") ?? ""),
          timeline: String(form.get("timeline") ?? ""),
          message: String(form.get("message") ?? ""),
        },
      });
      setStatus("sent");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <SiteFrame>
      <section className="edge relative overflow-hidden pb-[12vh] pt-[22vh]">
        <div className="grid gap-16 lg:grid-cols-12">
          <header className="lg:col-span-5">
            <p className="eyebrow text-acid">NEW BUSINESS / GLOBAL</p>
            <h1 className="display fluid-xl mt-6 max-w-[6ch]">BRING US THE IMPOSSIBLE.</h1>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-foreground/65">
              Tell us where you are, where you need to go, and why now. We will take it from there.
            </p>
            <div className="relative mt-12 hidden w-4/5 md:block">
              <img
                src={campaignGlass}
                alt="Iridescent acid glass campaign artwork"
                loading="lazy"
                width={1024}
                height={1280}
                className="aspect-[4/3] w-full object-cover"
              />
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="eyebrow absolute -bottom-6 right-[-12%] flex items-center gap-3 bg-signal px-6 py-5 text-bone transition-transform hover:-translate-y-2"
              >
                <MessageCircle className="size-4" aria-hidden="true" /> WHATSAPP ↗
              </a>
            </div>
          </header>

          <div className="lg:col-span-6 lg:col-start-7">
            {status === "sent" ? (
              <div className="flex min-h-[60vh] flex-col justify-center border-y border-border py-16" role="status">
                <Check className="size-12 text-acid" aria-hidden="true" />
                <p className="display mt-8 text-6xl leading-none md:text-8xl">YOUR PROJECT JUST ENTERED THE SYSTEM.</p>
                <p className="mt-6 max-w-md text-foreground/60">We have your brief. Expect a human reply shortly.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-10">
                <div className="grid gap-8 md:grid-cols-2">
                  <label className="eyebrow text-muted-foreground">FULL NAME *<input className={fieldClass} name="name" autoComplete="name" required minLength={2} placeholder="Your name" /></label>
                  <label className="eyebrow text-muted-foreground">COMPANY<input className={fieldClass} name="company" autoComplete="organization" placeholder="Brand or company" /></label>
                  <label className="eyebrow text-muted-foreground">EMAIL *<input className={fieldClass} type="email" name="email" autoComplete="email" required placeholder="you@company.com" /></label>
                  <label className="eyebrow text-muted-foreground">PHONE / WHATSAPP<input className={fieldClass} type="tel" name="phone" autoComplete="tel" placeholder="+91" /></label>
                </div>

                <fieldset>
                  <legend className="eyebrow text-muted-foreground">SERVICES REQUIRED</legend>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {serviceOptions.map((service) => {
                      const active = selected.includes(service);
                      return (
                        <Button key={service} type="button" variant={active ? "default" : "outline"} onClick={() => toggleService(service)} className="h-auto rounded-none px-4 py-3 text-xs">
                          {service}
                        </Button>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="grid gap-8 md:grid-cols-2">
                  <label className="eyebrow text-muted-foreground">BUDGET<select name="budget" className={fieldClass} defaultValue=""><option value="" disabled>Choose a range</option>{BUDGETS.map((item) => <option key={item}>{item}</option>)}</select></label>
                  <label className="eyebrow text-muted-foreground">PROJECT TIMELINE<select name="timeline" className={fieldClass} defaultValue=""><option value="" disabled>Choose timing</option>{TIMELINES.map((item) => <option key={item}>{item}</option>)}</select></label>
                </div>

                <label className="eyebrow block text-muted-foreground">PROJECT DESCRIPTION *<textarea className={`${fieldClass} min-h-32 resize-y`} name="message" required minLength={10} placeholder="What are we making, changing or growing?" /></label>

                {error ? <p role="alert" className="text-sm text-signal">{error}</p> : null}
                <Button type="submit" disabled={status === "sending"} className="h-auto w-full rounded-none px-8 py-5 eyebrow md:w-auto">
                  {status === "sending" ? "SENDING…" : "SEND PROJECT"} <ArrowUpRight aria-hidden="true" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}