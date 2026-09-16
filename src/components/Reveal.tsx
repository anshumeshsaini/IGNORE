import { type ElementType, type ReactNode } from "react";
import { useGsapContext } from "@/hooks/useGsapContext";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  y?: number;
}

/** Fade + rise on scroll-in. Uses transform/opacity only. */
export function Reveal({ children, as: Tag = "div", className, delay = 0, y = 40 }: RevealProps) {
  const ref = useGsapContext<HTMLDivElement>(({ gsap, root }) => {
    gsap.from(root, {
      opacity: 0,
      y,
      duration: 1,
      delay,
      ease: "power3.out",
      scrollTrigger: { trigger: root, start: "top 88%" },
    });
  }, [delay, y]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

interface SplitLinesProps {
  text: string;
  className?: string;
  lineClassName?: string;
}

/** Line-by-line masked reveal for big display type. */
export function SplitLines({ text, className, lineClassName }: SplitLinesProps) {
  const lines = text.split("\n");
  const ref = useGsapContext<HTMLDivElement>(({ gsap, root }) => {
    gsap.from(root.querySelectorAll("[data-line]"), {
      yPercent: 115,
      duration: 1.1,
      stagger: 0.09,
      ease: "power4.out",
      scrollTrigger: { trigger: root, start: "top 90%" },
    });
  }, [text]);

  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <span data-line className={`block ${lineClassName ?? ""}`}>
            {line}
          </span>
        </span>
      ))}
    </div>
  );
}
