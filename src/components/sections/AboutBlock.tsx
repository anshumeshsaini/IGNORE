import { Reveal, SplitLines } from "../Reveal";
import studio1 from "@/assets/studio-1.jpg";
import studio2 from "@/assets/studio-2.jpg";
import campaignProfile from "@/assets/campaign-profile.jpg";

export function AboutBlock() {
  return (
    <section className="edge py-[14vh]">
      <p className="eyebrow text-muted-foreground">(WHO WE ARE)</p>
      <SplitLines
        text={"WE ARE STRATEGISTS,\nDESIGNERS, DEVELOPERS,\nMEDIA BUYERS AND\nSTORYTELLERS."}
        className="display mt-6 fluid-lg max-w-[13ch] leading-[0.85]"
      />

      <div className="mt-[8vh] grid items-start gap-10 md:grid-cols-12">
        <Reveal className="relative md:col-span-6 md:pt-[12vh]">
          <div className="aspect-[4/5] overflow-hidden bg-muted md:aspect-[5/4]">
            <img
              src={studio1}
              alt="Studio team working through a campaign"
              loading="lazy"
              className="size-full object-cover grayscale transition duration-700 hover:grayscale-0"
            />
          </div>
          <div className="absolute -bottom-12 right-4 w-2/5 border-8 border-background md:-right-16">
            <img src={campaignProfile} alt="Sculptural creative campaign study" loading="lazy" width={1024} height={1280} className="aspect-[3/4] size-full object-cover" />
          </div>
        </Reveal>

        <Reveal className="md:col-span-4 md:col-start-8" delay={0.1}>
          <p className="text-lg leading-relaxed text-foreground/80">
            One team, no handoffs. Strategy sits next to the edit bay, and the media buyer sees
            the cut before it ships. That is the whole advantage.
          </p>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            We turn attention into business — not impressions, not applause. If a thing cannot be
            measured or remembered, we do not make it.
          </p>
          <ul className="mt-8 space-y-2 border-t border-border pt-6">
            {["Independent", "Senior-only team", "Built for compounding", "Opinionated on purpose"].map(
              (t) => (
                <li key={t} className="eyebrow text-foreground/70">
                  — {t}
                </li>
              ),
            )}
          </ul>
        </Reveal>

        <Reveal className="md:col-span-3 md:col-start-10 md:-mt-10" delay={0.15}>
          <div className="aspect-square overflow-hidden bg-muted">
            <img
              src={studio2}
              alt="Cinema lens close-up"
              loading="lazy"
              className="size-full object-cover grayscale"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
