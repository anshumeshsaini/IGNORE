import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { subscribeToNewsletter } from "@/lib/enquiry.functions";
import { sounds } from "@/lib/sound";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";

export function Newsletter() {
  const subscribe = useServerFn(subscribeToNewsletter);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (state === "sending" || state === "done") return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      sounds.play("click");
      setState("error");
      setMsg("Enter a valid email address.");
      return;
    }
    setState("sending");
    sounds.play("pop");
    try {
      const res = await subscribe({ data: { email: email.trim().toLowerCase() } });
      setState("done");
      sounds.play("chime");
      setMsg(res.alreadySubscribed ? "YOU'RE ALREADY ON THE LIST." : "WELCOME TO THE INNER CIRCLE.");
    } catch {
      setState("error");
      setMsg("Something went wrong. Try again.");
    }
  }

  return (
    <section className="edge border-t border-white/10 py-24 md:py-32 relative overflow-hidden">
      <div className="grid gap-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-6">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-acid" />
            <p className="eyebrow text-acid">(THE BI-WEEKLY DISPATCH)</p>
          </div>
          <h2 className="display mt-4 fluid-md text-foreground">
            ONE ESSAY. <br />
            <span className="font-serif italic font-normal text-acid">zero noise.</span>
          </h2>
          <p className="mt-4 text-sm text-muted-foreground max-w-md font-normal leading-relaxed">
            Deconstructions of high-converting campaigns, brand psychology breakdowns, and creative
            experiments we only share with 4,200+ founders and CMOs.
          </p>
        </div>

        <div className="md:col-span-6">
          <form onSubmit={onSubmit} className="glass-surface rounded-3xl p-6 sm:p-8 border border-white/15" noValidate>
            <label htmlFor="nl-email" className="eyebrow text-muted-foreground flex items-center justify-between">
              <span>WORK EMAIL ADDRESS</span>
              <span className="text-[10px] text-acid">SENT EVERY OTHER TUESDAY</span>
            </label>
            <div className="mt-4 flex items-center gap-3 border-b border-white/20 pb-3 focus-within:border-acid transition-colors">
              <input
                id="nl-email"
                type="email"
                value={email}
                disabled={state === "done"}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (state === "error") setState("idle");
                }}
                placeholder="founder@studio.com"
                className="w-full bg-transparent text-lg text-foreground outline-none placeholder:text-muted-foreground/60 disabled:opacity-50"
              />
              <button
                type="submit"
                data-cursor="cta"
                disabled={state === "sending" || state === "done"}
                className="eyebrow shrink-0 flex items-center gap-1.5 rounded-full bg-acid px-5 py-2.5 font-bold text-ink transition-all hover:bg-white disabled:opacity-50"
              >
                {state === "sending" ? (
                  "SENDING…"
                ) : state === "done" ? (
                  <>
                    <Check className="size-3.5" /> CONFIRMED
                  </>
                ) : (
                  <>
                    SUBSCRIBE <ArrowUpRight className="size-3.5" />
                  </>
                )}
              </button>
            </div>
            <p
              aria-live="polite"
              className={`eyebrow mt-3 h-4 text-xs transition-all duration-300 ${
                state === "done" ? "text-acid" : state === "error" ? "text-rose-400" : "text-muted-foreground"
              }`}
            >
              {msg}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
