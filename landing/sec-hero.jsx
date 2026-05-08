// ============================================================
// LANDING — Section 1: Hero (real landing, not a board)
// ============================================================

const Hero = () => {
  const sectionRef = React.useRef(null);
  const visualRef = React.useRef(null);

  // Hero entrance timeline — orchestrated with GSAP.
  // Falls back gracefully when GSAP is missing or reduced-motion is set:
  // wrappers get .is-in immediately and CSS handles a soft reveal.
  React.useLayoutEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    // Always make .reveal wrappers visible immediately on mount
    // (Hero owns its own entrance — global batch should not double-trigger).
    root.querySelectorAll(".reveal").forEach(el => el.classList.add("is-in"));

    const M = window.RSMotion;
    if (!M || !M.ready || M.reduced) return;

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    const chips = Array.from(root.querySelectorAll(".rs-chip"));
    const primaryBtn = root.querySelector(".rs-btn-primary");

    // Magnetic primary CTA — small pull only when hovering the button itself.
    let magnetic = null;
    if (primaryBtn) {
      primaryBtn.classList.add("is-magnetic");
      const onMove = (e) => {
        const r = primaryBtn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        gsap.to(primaryBtn, { x: dx * 0.18, y: dy * 0.28, duration: 0.3, ease: "power2.out" });
      };
      const onLeave = () => {
        gsap.to(primaryBtn, { x: 0, y: 0, duration: 0.45, ease: "power3.out" });
      };
      primaryBtn.addEventListener("mousemove", onMove);
      primaryBtn.addEventListener("mouseleave", onLeave);
      magnetic = { onMove, onLeave };
    }

    const ctx = M.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.7 },
      });

      // LEFT — copy in narrative order
      tl.from(".rs-hero-eyebrow", { opacity: 0, y: 16 }, 0)
        // Editorial mask reveal — text slides up from below its line mask
        .from(".rs-hero-title .rs-hero-line-inner", {
          yPercent: 110,
          stagger: 0.14,
          duration: 1.05,
          ease: "expo.out",
        }, 0.08)
        .from(".rs-hero-sub",  { opacity: 0, y: 20 }, 0.55)
        // Buttons fade in with the parent .rs-hero-copy reveal —
        // a dedicated from() interacted with the magnetic transform and
        // could leave the primary CTA hidden in some paint orders.
        // Only chips get a stagger and they reset transforms cleanly.
        .fromTo(".rs-hero-tags .rs-chip",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: "power2.out", clearProps: "transform" },
          0.85)
        // RIGHT — OS visual (opacity-only on nodes to avoid clashing with rs-float)
        .from(".rs-os-lines", { opacity: 0, duration: 0.8 }, 0.25)
        .from(".rs-node",      { opacity: 0, stagger: 0.07, duration: 0.55 }, 0.4)
        .from(".rs-os-status", { opacity: 0, y: 8, duration: 0.5 }, 1.05)
        .from(".rs-portrait",  { opacity: 0, y: 12, duration: 0.55 }, 1.1);

    }, root);

    return () => {
      chips.forEach(c => c.classList.remove("is-flash"));
      if (primaryBtn && magnetic) {
        primaryBtn.removeEventListener("mousemove", magnetic.onMove);
        primaryBtn.removeEventListener("mouseleave", magnetic.onLeave);
        primaryBtn.classList.remove("is-magnetic");
        gsap.set(primaryBtn, { clearProps: "transform" });
      }
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="rs-section rs-hero">
      <div className="rs-container rs-hero-grid">
        {/* LEFT */}
        <div className="rs-hero-copy reveal" data-reveal>
          <div className="rs-hero-eyebrow">
            <span style={{ color: "var(--ember-500)" }}>[01]</span>
            <span className="rs-hero-eyebrow-line" />
            <span className="rs-hero-eyebrow-text">SHOPIFY DEVELOPMENT · EXPERIÊNCIA COMERCIAL</span>
          </div>

          <h1 className="rs-hero-title">
            <span className="rs-hero-line">
              <span className="rs-hero-line-inner">Lojas <span className="rs-shopify-green">Shopify</span></span>
            </span>
            <span className="rs-hero-line">
              <span className="rs-hero-line-inner">pensadas para vender mais</span>
            </span>
          </h1>

          <p className="rs-hero-sub">
            Desenvolvo lojas, product pages e landing pages em Shopify com
            foco em <span className="rs-strong">clareza, experiência de compra
            e performance comercial</span>.
          </p>

          <div className="rs-hero-ctas">
            <a className="rs-btn rs-btn-primary" href="https://wa.me/5548999255795?text=Ol%C3%A1%20Rafael!%20Vim%20pelo%20seu%20site%20e%20queria%20conversar%20sobre%20um%20projeto." target="_blank" rel="noopener noreferrer">
              Conversar sobre um projeto <ArrowRight />
            </a>
            <a className="rs-btn rs-btn-ghost" href="#projetos">
              Ver projetos aplicados <ArrowRight />
            </a>
          </div>

          <div className="rs-hero-tags">
            {[
              { label: "SHOPIFY DEVELOPMENT", accent: "shopify", live: true  },
              { label: "PRODUCT PAGES",       accent: "cyan",    live: false },
              { label: "LANDING PAGES",       accent: "cyan",    live: true  },
              { label: "UX PARA E-COMMERCE",  accent: "shopify", live: false },
              { label: "DADOS & OPERAÇÃO",    accent: "cyan",    live: false },
            ].map((c, i) => (
              <span
                key={i}
                className={`rs-chip rs-chip-${c.accent}${c.live ? " rs-chip-live" : ""}`}
                data-accent={c.accent}
              >
                <span className="rs-chip-dot" aria-hidden="true" />
                {c.label}
              </span>
            ))}
          </div>

        </div>

        {/* RIGHT */}
        <div ref={visualRef} className="rs-hero-visual reveal" data-reveal>
          <HeroOS />
        </div>
      </div>
    </section>
  );
};

const HeroOS = () => {
  const W = 720, H = 640;
  const cx = W / 2, cy = H / 2;
  // Hub box is 168x168 px in the original 720x640 canvas → half-size in viewBox units
  const HUB_HW = 84, HUB_HH = 84;
  // Where a line from (n.x,n.y) toward (cx,cy) first touches the hub box outline
  const hubEdge = (n) => {
    const dx = cx - n.x, dy = cy - n.y;
    let t = -Infinity;
    if (dx !== 0) {
      const sideX = dx > 0 ? cx - HUB_HW : cx + HUB_HW;
      t = Math.max(t, (sideX - n.x) / dx);
    }
    if (dy !== 0) {
      const sideY = dy > 0 ? cy - HUB_HH : cy + HUB_HH;
      t = Math.max(t, (sideY - n.y) / dy);
    }
    if (!isFinite(t)) t = 1;
    return { x: n.x + t * dx, y: n.y + t * dy };
  };
  const nodes = [
    { id: "shop",  x: 100, y: 110, label: "SHOPIFY",     sub: "LOJA & PÁGINAS", icon: "shopify", accent: "shopify" },
    { id: "ai",    x: 90,  y: 320, label: "IA DE APOIO", sub: "OPERAÇÃO",       icon: "ai",      accent: "cyan", live: true },
    { id: "data",  x: 100, y: 530, label: "DADOS",       sub: "DECISÃO",        icon: "data",    accent: "cyan" },
    { id: "auto",  x: 280, y: 600, label: "AUTOMAÇÕES",  sub: "FLUXOS",         icon: "bolt",    accent: "ember" },
    { id: "dash",  x: 600, y: 110, label: "DASHBOARD",   sub: "PERFORMANCE",    icon: "chart",   accent: "cyan", live: true },
    { id: "creat", x: 620, y: 380, label: "CRIATIVOS",   sub: "EXECUÇÃO",       icon: "spark",   accent: "violet" },
  ];

  return (
    <div className="rs-os" style={{ width: W, height: H }}>
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} preserveAspectRatio="none" className="rs-os-lines">
        <defs>
          <radialGradient id="hub-glow-l" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(149,242,15,0.26)" />
            <stop offset="50%" stopColor="rgba(149,242,15,0.07)" />
            <stop offset="100%" stopColor="rgba(149,242,15,0)" />
          </radialGradient>
        </defs>
        <circle cx={cx} cy={cy} r={210} fill="url(#hub-glow-l)" className="rs-pulse-r" />
        {nodes.map((n, i) => {
          const stroke = n.accent === "shopify"
            ? "rgba(149, 242, 15, 0.58)"
            : n.accent === "violet"
              ? "rgba(124, 92, 255, 0.56)"
            : n.accent === "ember"
              ? "rgba(149,242,15,0.55)"
              : "rgba(94,200,255,0.55)";
          const e = hubEdge(n);
          return (
            <g key={n.id}>
              <line x1={n.x} y1={n.y} x2={e.x} y2={e.y} stroke={stroke} strokeWidth="1" />
              <line x1={n.x} y1={n.y} x2={e.x} y2={e.y}
                    stroke={stroke} strokeWidth="1.5"
                    strokeDasharray="3 8"
                    style={{ animation: `tt-flow ${2.4 + i * 0.3}s linear infinite` }} />
            </g>
          );
        })}
        <circle cx={cx} cy={cy} r="100" fill="none" stroke="rgba(149,242,15,0.16)" strokeDasharray="2 4">
          <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur="60s" repeatCount="indefinite" />
        </circle>
        <circle cx={cx} cy={cy} r="155" fill="none" stroke="rgba(149,242,15,0.08)" strokeDasharray="2 6">
          <animateTransform attributeName="transform" type="rotate" from={`360 ${cx} ${cy}`} to={`0 ${cx} ${cy}`} dur="80s" repeatCount="indefinite" />
        </circle>

        {/* Traveling signal pulses — small dots flowing from each node toward the central hub.
            Color follows the connection line color of the same node so dot and line match. */}
        {nodes.map((n, i) => {
          const color = n.accent === "shopify"
            ? "rgba(149,242,15,0.95)"
            : n.accent === "violet"
              ? "rgba(124,92,255,0.95)"
            : n.accent === "ember"
              ? "rgba(149,242,15,0.95)"
              : "rgba(94,200,255,0.95)";
          const dur = 3.4 + i * 0.35;
          const begin = `${(i * 0.55).toFixed(2)}s`;
          const e = hubEdge(n);
          return (
            <circle key={`pulse-${n.id}`} r="2.6" fill={color} className="rs-os-pulse"
                    style={{ color }}>
              <animate attributeName="cx" from={n.x} to={e.x} dur={`${dur}s`} begin={begin} repeatCount="indefinite" />
              <animate attributeName="cy" from={n.y} to={e.y} dur={`${dur}s`} begin={begin} repeatCount="indefinite" />
              <animate attributeName="opacity"
                       values="0;1;1;0"
                       keyTimes="0;0.1;0.85;1"
                       dur={`${dur}s`} begin={begin} repeatCount="indefinite" />
            </circle>
          );
        })}
      </svg>

      {/* nodes */}
      {nodes.map((n, i) => (
        <div key={n.id} className={`rs-node rs-node-${n.accent} rs-node-${n.id}`} style={{
          left: `${(n.x / W) * 100}%`, top: `${(n.y / H) * 100}%`,
          animation: `rs-float ${4 + i * 0.5}s ease-in-out infinite ${i * 0.3}s`,
        }}>
          <div className="rs-node-card">
            <CornerTicks color={n.accent === "shopify" ? "#95f20f" : n.accent === "violet" ? "var(--violet-500)" : n.accent === "ember" ? "var(--ember-500)" : "var(--cyan-400)"} />
            <NodeIcon name={n.icon} />
            {n.live && <span className="tt-pulse-dot rs-node-live" />}
          </div>
          <div className="rs-node-label">
            <div className="rs-node-name">{n.label}</div>
            <div className="rs-node-sub">{n.sub}</div>
          </div>
        </div>
      ))}

      {/* HUB */}
      <div className="rs-hub" style={{ left: "50%", top: "50%" }}>
        <CornerTicks color="rgba(149,242,15,0.58)" />
        <img className="rs-hub-logo" src="assets/shopify.png" alt="" aria-hidden="true" />
        <div className="rs-hub-os">SHOPIFY</div>
        <div className="rs-hub-sub">CORE</div>
        <span className="tt-pulse-dot rs-hub-live" />
      </div>

      {/* Status chip floating top-right of visual */}
      <div className="rs-os-status">
        <span className="rs-status-dot" /> SHOPIFY · OPERAÇÃO
      </div>

      {/* Portrait — bottom-right, restrained */}
      <div className="rs-portrait">
        <CornerTicks color="rgba(149,242,15,0.5)" />
        <div className="rs-portrait-avatar"><UserIcon /></div>
        <div className="rs-portrait-label">RAFAEL SILVA<br/><span>SHOPIFY DEVELOPER</span></div>
      </div>
    </div>
  );
};

const CornerTicks = ({ color = "var(--ember-500)" }) => (
  <>
    <span className="rs-tick" style={{ top: -1, left: -1, borderTop: `1px solid ${color}`, borderLeft: `1px solid ${color}` }} />
    <span className="rs-tick" style={{ top: -1, right: -1, borderTop: `1px solid ${color}`, borderRight: `1px solid ${color}` }} />
    <span className="rs-tick" style={{ bottom: -1, left: -1, borderBottom: `1px solid ${color}`, borderLeft: `1px solid ${color}` }} />
    <span className="rs-tick" style={{ bottom: -1, right: -1, borderBottom: `1px solid ${color}`, borderRight: `1px solid ${color}` }} />
  </>
);

const NodeIcon = ({ name }) => {
  const ic = {
    shopify: <svg className="rs-node-icon rs-shopify-icon" width="28" height="28" viewBox="0 0 24 24" aria-hidden="true"><path className="rs-shopify-bag" d="M7.2 8.3 9 7.8c.2-1.4.7-2.7 1.5-3.6.7-.9 1.7-1.4 2.8-1.2 1.6.2 2.5 1.5 2.8 3.6l2.1.6 1 12.2-11.4 2.1L5.6 8.8l1.6-.5Zm3.3-.9 1.2-.3c.2-.9.5-1.7.9-2.2.2-.3.5-.5.8-.5.5.1.9.8 1.1 1.8l.8.2c-.2-1.3-.7-2.1-1.5-2.2-.7-.1-1.3.3-1.8 1-.7.8-1.2 2.1-1.5 2.2Zm2.5-.6 1.6-.4c-.2-.9-.5-1.4-.9-1.5-.2 0-.4.1-.6.4-.4.4-.7 1-.9 1.7l.8-.2Z" /><text className="rs-shopify-s" x="12.6" y="16" textAnchor="middle" transform="rotate(-8 12.6 13)" fontSize="8.5" fontWeight="800">S</text></svg>,
    ai: <svg className="rs-node-icon" width="30" height="30" viewBox="0 0 30 30" aria-hidden="true"><path className="rs-icon-wash" d="M15 2.5 25.8 8.7v12.6L15 27.5 4.2 21.3V8.7L15 2.5Z" /><path className="rs-icon-fill" d="M15 8.2a6.8 6.8 0 1 0 0 13.6 6.8 6.8 0 0 0 0-13.6Zm0 4.2a2.6 2.6 0 1 1 0 5.2 2.6 2.6 0 0 1 0-5.2Z" /><path className="rs-icon-line" d="M15 5.8v4.3M15 19.9v4.3M5.8 15h4.3M19.9 15h4.3M8.5 8.5l3.1 3.1M18.4 18.4l3.1 3.1M21.5 8.5l-3.1 3.1M11.6 18.4l-3.1 3.1" /><circle className="rs-icon-dot" cx="15" cy="15" r="1.4" /></svg>,
    data: <svg className="rs-node-icon" width="30" height="30" viewBox="0 0 30 30" aria-hidden="true"><path className="rs-icon-wash" d="M5.5 8.3c0-3 4.3-5.3 9.5-5.3s9.5 2.3 9.5 5.3v13.4c0 3-4.3 5.3-9.5 5.3s-9.5-2.3-9.5-5.3V8.3Z" /><ellipse className="rs-icon-fill" cx="15" cy="8.4" rx="8.2" ry="4.3" /><path className="rs-icon-line" d="M6.8 8.8v6.4c0 2.3 3.7 4.2 8.2 4.2s8.2-1.9 8.2-4.2V8.8M6.8 15.3v6.3c0 2.3 3.7 4.2 8.2 4.2s8.2-1.9 8.2-4.2v-6.3" /><path className="rs-icon-cut" d="M10 8.2c1.1-.8 2.8-1.3 5-1.3s3.9.5 5 1.3c-1.1.9-2.8 1.4-5 1.4s-3.9-.5-5-1.4Z" /></svg>,
    bolt: <svg className="rs-node-icon" width="30" height="30" viewBox="0 0 30 30" aria-hidden="true"><path className="rs-icon-wash" d="M16.4 2.5 4.7 16.5h7.1L10 27.5l15.3-17h-8.1l-.8-8Z" /><path className="rs-icon-fill" d="M16.5 3.2 6.7 15.5h6.8l-1.1 10.9 11-14.4h-7.2l.3-8.8Z" /><path className="rs-icon-line" d="M15.2 7.9 10.7 14h5.5l-.8 6.3 4.5-6.9h-4.3l-.4-5.5Z" /></svg>,
    chart: <svg className="rs-node-icon rs-dashboard-icon" width="30" height="30" viewBox="0 0 30 30" aria-hidden="true"><rect className="rs-dash-panel" x="4.5" y="5.5" width="21" height="19" rx="2.2" /><path className="rs-dash-top" d="M7.4 9h8.2M21.2 9h1.4" /><rect className="rs-dash-kpi" x="7.4" y="11.7" width="4.6" height="3.8" rx=".7" /><rect className="rs-dash-kpi" x="13.1" y="11.7" width="4.6" height="3.8" rx=".7" /><rect className="rs-dash-kpi" x="18.8" y="11.7" width="3.8" height="3.8" rx=".7" /><path className="rs-dash-line" d="M7.7 20.9 11 18.2l2.9 1.4 3.1-4.1 2.6 1.4 3-4.5" /><path className="rs-dash-axis" d="M7.4 22.3h15.2" /></svg>,
    spark: <svg className="rs-node-icon" width="30" height="30" viewBox="0 0 30 30" aria-hidden="true"><path className="rs-icon-wash" d="M15 2.5 18.2 11.8 27.5 15 18.2 18.2 15 27.5 11.8 18.2 2.5 15 11.8 11.8 15 2.5Z" /><path className="rs-icon-fill" d="M15 5.4 17.4 12.6 24.6 15 17.4 17.4 15 24.6 12.6 17.4 5.4 15 12.6 12.6 15 5.4Z" /><path className="rs-icon-line" d="M15 2.9v7.2M15 19.9v7.2M2.9 15h7.2M19.9 15h7.2M6.4 6.4l5.1 5.1M18.5 18.5l5.1 5.1M23.6 6.4l-5.1 5.1M11.5 18.5l-5.1 5.1" /></svg>,
  };
  return ic[name];
};

const UserIcon = () => (
  <svg width="22" height="22" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.3"/><path d="M3 17c1-3 4-5 7-5s6 2 7 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square"/></svg>
);

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h9M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/></svg>
);

Object.assign(window, { Hero, HeroOS, CornerTicks, NodeIcon, UserIcon, ArrowRight });
