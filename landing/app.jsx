// ============================================================
// RAFAEL SILVA — Landing app shell + reveal observer + nav
// ============================================================

const App = () => {
  // Scroll reveal — uses GSAP ScrollTrigger.batch via RSMotion helper.
  // Falls back to IntersectionObserver if GSAP failed to load,
  // and to immediate visibility if reduced-motion is preferred.
  React.useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const M = window.RSMotion;

    if (M && M.ready && !reduced) {
      const ctx = M.context(() => {
        M.batch(".reveal", { staggerMs: 80 });
      });
      // Recalc positions after Babel finishes mounting (small grace period)
      const t = setTimeout(() => window.ScrollTrigger?.refresh(), 200);
      return () => { clearTimeout(t); ctx.revert(); };
    }

    // Fallback path
    if (reduced) {
      document.querySelectorAll(".reveal").forEach(el => el.classList.add("is-in"));
      return;
    }
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="rs-page">
      <Background />
      <Nav />
      <main>
        <Hero />
        <Rail />
        <Services />
        <Flow />
        <DashSection />
        <Projects />
        <Timeline />
        <Stack />
        <FinalCTA />
      </main>
    </div>
  );
};

const Background = () => {
  // Generate stable particle positions
  const particles = React.useMemo(() => Array.from({ length: 14 }, (_, i) => ({
    left: `${(i * 7.3 + 5) % 100}%`,
    delay: `${(i * 1.3) % 20}s`,
    duration: `${20 + (i % 5) * 4}s`,
    opacity: 0.3 + (i % 3) * 0.2,
  })), []);
  return (
    <div className="rs-bg" aria-hidden="true">
      <div className="rs-bg-grid" />
      <div className="rs-bg-glow-a" />
      <div className="rs-bg-glow-b" />
      <div className="rs-bg-glow-c" />
      <div className="rs-bg-particles">
        {particles.map((p, i) => (
          <span key={i} className="rs-bg-particle" style={{
            left: p.left, bottom: "-10px",
            animationDelay: p.delay, animationDuration: p.duration,
            opacity: p.opacity,
          }} />
        ))}
      </div>
      <div className="rs-bg-noise" />
    </div>
  );
};

const Nav = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navRef = React.useRef(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = menuOpen ? "hidden" : prev;
    return () => { document.body.style.overflow = prev; };
  }, [menuOpen]);

  React.useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // Soft entrance — slide down + fade
  React.useLayoutEffect(() => {
    const el = navRef.current;
    const M = window.RSMotion;
    if (!el || !M || !M.ready || M.reduced) return;
    const ctx = M.context(() => {
      window.gsap.from(el, {
        y: -16, opacity: 0, duration: 0.7, ease: "power3.out", delay: 0.1,
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const navLinks = [
    { href: "#sistemas",  label: "Shopify"    },
    { href: "#flow",      label: "Operação"   },
    { href: "#dashboard", label: "Dados"      },
    { href: "#projetos",  label: "Projetos"   },
    { href: "#evolucao",  label: "Trajetória" },
    { href: "#stack",     label: "Stack"      },
  ];

  return (
    <React.Fragment>
      <nav ref={navRef} className="rs-nav" style={{ opacity: scrolled ? 1 : 0.95 }}>
        <div className="rs-nav-brand">
          <div className="rs-nav-logo">R</div>
          <span className="rs-nav-name">RAFAEL SILVA</span>
        </div>
        <div className="rs-nav-links">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </div>
        <span className="rs-nav-status"><span className="rs-status-dot" />Aberto a projetos</span>
        <button
          type="button"
          className={`rs-nav-burger${menuOpen ? " is-open" : ""}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="rs-nav-drawer"
        >
          <span /><span /><span />
        </button>
        <a href="https://wa.me/5548999255795?text=Ol%C3%A1%20Rafael!%20Vim%20pelo%20seu%20site%20e%20queria%20conversar%20sobre%20um%20projeto." target="_blank" rel="noopener noreferrer" className="rs-nav-cta">Conversar</a>
      </nav>

      <div
        id="rs-nav-drawer"
        className={`rs-nav-drawer${menuOpen ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!menuOpen}
      >
        <div className="rs-nav-drawer-backdrop" onClick={() => setMenuOpen(false)} />
        <div className="rs-nav-drawer-panel">
          <div className="rs-nav-drawer-links">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
            ))}
          </div>
          <div className="rs-nav-drawer-status">
            <span className="rs-status-dot" /> Aberto a projetos
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
