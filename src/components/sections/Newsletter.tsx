import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { subscribeToNewsletter } from "@/lib/enquiry.functions";

export function Newsletter() {
  const subscribe = useServerFn(subscribeToNewsletter);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (state === "sending" || state === "done") return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState("error");
      setMsg("Enter a valid email address.");
      return;
    }
    setState("sending");
    try {
      const res = await subscribe({ data: { email: email.trim().toLowerCase() } });
      setState("done");
      setMsg(res.alreadySubscribed ? "YOU'RE ALREADY ON THE LIST." : "YOU'RE ON THE LIST.");
    } catch {
      setState("error");
      setMsg("Something went wrong. Try again.");
    }
  }

  return (
    <section className="edge border-t border-border py-[10vh]">
      <div className="grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-6">
          <p className="eyebrow text-muted-foreground">(NEWSLETTER)</p>
          <h2 className="display mt-4 text-4xl leading-none tracking-[-0.04em] md:text-6xl">
            ONE EMAIL.
            <br />
            NO NOISE.
          </h2>
        </div>

        <form onSubmit={onSubmit} className="md:col-span-6" noValidate>
          <label htmlFor="nl-email" className="eyebrow text-muted-foreground">
            EMAIL ADDRESS
          </label>
          <div className="mt-3 flex items-center gap-4 border-b border-border pb-3 focus-within:border-acid">
            <input
              id="nl-email"
              type="email"
              value={email}
              disabled={state === "done"}
              onChange={(e) => {
                setEmail(e.target.value);
                if (state === "error") setState("idle");
              }}
              placeholder="you@company.com"
              className="w-full bg-transparent text-lg outline-none placeholder:text-muted-foreground disabled:opacity-50"
            />
            <button
              type="submit"
              data-cursor="cta"
              disabled={state === "sending" || state === "done"}
              className="eyebrow shrink-0 text-acid transition-opacity hover:opacity-70 disabled:opacity-40"
            >
              {state === "sending" ? "SENDING…" : "JOIN THE LIST ↗"}
            </button>
          </div>
          <p
            aria-live="polite"
            className={`eyebrow mt-3 h-4 transition-all duration-500 ${
              state === "done" ? "text-acid" : "text-muted-foreground"
            }`}
          >
            {msg}
          </p>
        </form>
      </div>
    </section>
  );
}
