import { Link } from "@tanstack/react-router";
import { Magnetic } from "../Magnetic";
import { SplitLines } from "../Reveal";
import { useGsapContext } from "@/hooks/useGsapContext";
import { site, whatsappLink } from "@/lib/site";
import campaignObject from "@/assets/campaign-object.jpg";

export function FinalCTA() {
  const ref = useGsapContext<HTMLElement>(({ gsap, root }) => {
    gsap.to(root.querySelector("[data-glow]"), {
      yPercent: -20,
      scale: 1.2,
      ease: "none",
      scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true },
    });
  }, []);

  const contacts = [
    { label: "WHATSAPP", href: whatsappLink() },
    { label: "EMAIL", href: `mailto:${site.email}` },
    ...site.socials.map((s) => ({ label: s.label, href: s.href })),
  ];

  return (
    <section ref={ref} className="relative overflow-hidden border-t border-border py-[16vh]">
      <div data-glow aria-hidden="true" className="pointer-events-none absolute inset-[-10%] -z-10 opacity-30">
        <img src={campaignObject} alt="" loading="lazy" width={1280} height={912} className="size-full object-cover grayscale" />
      </div>
      <div className="absolute inset-0 -z-10 bg-ink/75" aria-hidden="true" />
      <div className="edge">
        <SplitLines
          text={"LET'S MAKE\nSOMETHING\nUNIGNORABLE."}
          className="display fluid-xl max-w-[10ch] leading-[0.82]"
        />

        <div className="mt-12 flex flex-wrap items-center gap-6">
          <Magnetic>
            <Link
              to="/contact"
              data-cursor="cta"
              className="eyebrow inline-flex items-center gap-2 bg-acid px-8 py-4 text-acid-foreground transition-colors hover:bg-foreground"
            >
              START A PROJECT ↗
            </Link>
          </Magnetic>
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              data-cursor="cta"
              className="eyebrow link-underline text-foreground/70 hover:text-acid"
            >
              {c.label} ↗
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
