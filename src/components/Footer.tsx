import { Link } from "@tanstack/react-router";
import { site, whatsappLink } from "@/lib/site";
import { services } from "@/lib/data/services";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="edge border-t border-border pb-8 pt-16">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Link to="/" className="display block text-4xl leading-none md:text-6xl">
            {site.name}
            <span className="text-acid">.</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">{site.tagline}</p>
          <p className="eyebrow mt-8 text-muted-foreground">{site.locations.join(" / ")}</p>
        </div>

        <nav className="md:col-span-3" aria-label="Footer">
          <p className="eyebrow mb-4 text-muted-foreground">NAVIGATE</p>
          <ul className="space-y-2 text-sm">
            {[
              { to: "/work", label: "Work" },
              { to: "/services", label: "Services" },
              { to: "/about", label: "About" },
              { to: "/process", label: "Process" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="link-underline text-foreground/75 hover:text-acid">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-2">
          <p className="eyebrow mb-4 text-muted-foreground">SERVICES</p>
          <ul className="space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="link-underline text-foreground/75 hover:text-acid"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="eyebrow mb-4 text-muted-foreground">CONTACT</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={`mailto:${site.email}`} className="link-underline hover:text-acid">
                {site.email}
              </a>
            </li>
            <li>
              <a href={whatsappLink()} target="_blank" rel="noreferrer" className="link-underline hover:text-acid">
                WhatsApp
              </a>
            </li>
            <li className="text-muted-foreground">{site.phone}</li>
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="link-underline hover:text-acid">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16 flex flex-col justify-between gap-2 border-t border-border pt-6 md:flex-row">
        <p className="eyebrow text-muted-foreground">
          © {year} {site.name}
        </p>
        <p className="eyebrow text-acid">BUILT TO BE REMEMBERED.</p>
      </div>
    </footer>
  );
}
