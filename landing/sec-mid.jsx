// ============================================================
// LANDING — Capability Rail + Service Cards + Systems Flow
// ============================================================

// ---------- CAPABILITY RAIL ----------
const Rail = () => {
  const items = [
    "Shopify", "Dashboards", "AI Automation", "Creative Performance",
    "Data Systems", "Supabase", "Vercel", "Next.js", "Obsidian",
    "Process Automation", "E-commerce OS",
  ];
  // duplicate for seamless loop
  const list = [...items, ...items];
  return (
    <section className="rs-section rs-rail-sec">
      <div className="rs-rail-mask">
        <div className="rs-rail-track">
          {list.map((it, i) => (
            <div key={i} className="rs-rail-item">
              <span className="rs-rail-dot" />
              <span>{it}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------- SERVICES ----------
const Services = () => {
  const cards = [
    {
      n: "01",
      icon: "shopify",
      title: "Shopify Development",
      kicker: "Oferta principal",
      microPill: "Base comercial",
      body: "Temas, seções, PDPs e landing pages com base comercial, performance e autonomia para a operação.",
      tags: ["Themes", "PDPs", "Landing Pages"],
      accent: "ember",
      primary: true,
    },
    {
      n: "02",
      icon: "spark",
      title: "Product Pages & Landing Pages",
      kicker: "Conversão",
      body: "Páginas criadas para vender melhor, com hierarquia clara, CTAs certos e menos fricção na decisão.",
      tags: ["PDP", "Landing", "CRO"],
      accent: "ember",
    },
    {
      n: "03",
      icon: "bolt",
      title: "UX/UI para E-commerce",
      kicker: "Decisão de compra",
      body: "Interfaces mobile-first que ajudam o usuário a entender, confiar e avançar para a compra.",
      tags: ["UX/UI", "Mobile", "Compra"],
      accent: "cyan",
    },
    {
      n: "04",
      icon: "chart",
      title: "Dashboards & Dados",
      kicker: "Leitura operacional",
      body: "Métricas organizadas para transformar dados espalhados em leitura, prioridade e ação.",
      tags: ["GA4", "Dashboards", "Decisão"],
      accent: "cyan",
    },
    {
      n: "05",
      icon: "ai",
      title: "IA, Automação & Creative Performance",
      kicker: "Camada de inteligência",
      body: "Fluxos para copy, briefing, documentação, criativos e decisões com mais contexto.",
      tags: ["IA", "Creative", "Ops"],
      accent: "violet",
    },
  ];
  const accentColor = (accent) => (
    accent === "violet" ? "var(--violet-500)" :
    accent === "cyan" ? "var(--cyan-400)" :
    "var(--ember-500)"
  );
  const renderCard = (c, i) => (
    <article
      key={c.n}
      className={`rs-service-card reveal rs-${c.accent}${c.primary ? " rs-service-primary" : ""}`}
      data-reveal
      style={{ "--rev-delay": `${i * 70}ms` }}
    >
      <CornerTicks color={accentColor(c.accent)} />
      <div className="rs-service-top">
        <div className={`rs-service-icon rs-icon-${c.accent}`}>
          <NodeIcon name={c.icon} />
        </div>
        <div className="rs-service-num">[ {c.n} ]</div>
      </div>
      <div className="rs-service-kicker">
        <span>{c.kicker}</span>
        {c.microPill && <span className="rs-service-micropill">{c.microPill}</span>}
      </div>
      <h3 className="rs-service-title">{c.title}</h3>
      <p className="rs-service-body">{c.body}</p>
      <div className="rs-service-tags">
        {c.tags.map(t => <span key={t} className="rs-chip rs-chip-sm">{t}</span>)}
      </div>
    </article>
  );
  const [primaryCard, ...compactCards] = cards;

  return (
    <section className="rs-section rs-services" id="sistemas">
      <div className="rs-container">
        <SectionHeader
          n="02"
          eyebrow="O QUE EU CONSTRUO"
          title={<>O que eu construo<br/>para <strong className="rs-shopify-green rs-italic">lojas Shopify</strong></>}
          kicker="Shopify primeiro. Dados, IA e sistemas entram como camada de inteligência para vender melhor e operar com mais clareza."
        />

        <div className="rs-services-grid">
          {renderCard(primaryCard, 0)}
          <div className="rs-services-compact">
            {compactCards.map((c, i) => renderCard(c, i + 1))}
          </div>
        </div>

        <div className="rs-services-cta reveal" data-reveal>
          <a className="rs-btn rs-btn-ghost" href="#projetos">
            Ver projetos aplicados <ArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
};

// ---------- SECTION HEADER ----------
const SectionHeader = ({ n, eyebrow, title, kicker, side }) => (
  <header className="rs-section-header reveal" data-reveal>
    <div className="rs-section-eyebrow">
      <span className="rs-section-num">[{n}]</span>
      <span className="rs-section-line" />
      <span>{eyebrow}</span>
    </div>
    <div className="rs-section-titlerow">
      <h2 className="rs-section-title">{title}</h2>
      {side}
    </div>
    {kicker && <p className="rs-section-kicker">{kicker}</p>}
  </header>
);

// ---------- SYSTEMS FLOW ----------
const Flow = () => {
  const railRef = React.useRef(null);

  React.useLayoutEffect(() => {
    const root = railRef.current;
    if (!root) return;

    const pulse    = root.querySelector(".rs-flow-scrub-pulse");
    const steps    = Array.from(root.querySelectorAll(".rs-flow-step"));
    const labels   = Array.from(root.querySelectorAll(".rs-flow-link-label"));
    const feedback = root.querySelector(".rs-flow-feedback");
    const io       = root.querySelector(".rs-flow-io");

    const showAll = () => {
      steps.forEach(s => s.classList.add("is-active"));
      labels.forEach(l => l.classList.add("is-visible"));
      labels[labels.length - 1]?.classList.add("is-active");
      feedback?.classList.add("is-visible");
      io?.classList.add("is-visible");
      pulse?.classList.remove("is-traveling");
    };

    const M = window.RSMotion;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isNarrow = window.innerWidth < 1000;

    // Mobile / reduced-motion / no-GSAP → reveal everything immediately
    if (!M || !M.ready || reduced || isNarrow) { showAll(); return; }

    const ctx = M.context(() => {
      const ScrollTrigger = window.ScrollTrigger;
      if (!ScrollTrigger) { showAll(); return; }

      // Reset before binding
      steps.forEach(s => s.classList.remove("is-active"));
      labels.forEach(l => l.classList.remove("is-visible", "is-active"));
      feedback?.classList.remove("is-visible");
      io?.classList.remove("is-visible");
      if (pulse) { pulse.style.left = "8.333%"; pulse.classList.remove("is-traveling"); }

      ScrollTrigger.create({
        trigger: root,
        start: "top 78%",
        end: "bottom 78%",
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress;
          const traveling = p > 0.04 && p < 0.96;

          if (pulse) {
            pulse.classList.toggle("is-traveling", traveling);
            if (traveling) pulse.style.left = `${8.333 + 83.334 * p}%`;
          }

          steps.forEach((step, i) => {
            const stepP = i / (steps.length - 1);
            step.classList.toggle("is-active", p >= stepP - 0.03);
          });

          labels.forEach((label, i) => {
            const labelP = (i + 0.85) / steps.length;
            const nextLabelP = (i + 1.85) / steps.length;
            label.classList.toggle("is-visible", p >= labelP);
            label.classList.toggle("is-active", p >= labelP && p < nextLabelP);
          });

          feedback?.classList.toggle("is-visible", p >= 0.92);
          io?.classList.toggle("is-visible", p >= 0.96);
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const flow = [
    { id: "01", label: "LOJA SHOPIFY", sub: "Tema, PDPs, LPs e seções\ncomo base da venda.",          icon: "shopify", accent: "ember" },
    { id: "02", label: "DADOS",        sub: "Eventos e fontes conectadas\npara enxergar o que importa.", icon: "data",    accent: "cyan" },
    { id: "03", label: "IA",           sub: "Análise, criação e documentação\ncom mais velocidade.",   icon: "ai",      accent: "cyan",  live: true },
    { id: "04", label: "DASHBOARD",    sub: "Métricas viram leitura,\nprioridade e ação.",              icon: "chart",   accent: "cyan",  live: true },
    { id: "05", label: "CRIATIVOS",    sub: "Hipóteses, copies e variações\ncom contexto real.",        icon: "spark",   accent: "cyan" },
    { id: "06", label: "DECISÃO",      sub: "Próximos passos para loja,\nproduto e campanha.",          icon: "bolt",    accent: "cyan", live: true },
  ];

  return (
    <section className="rs-section rs-flow" id="flow">
      <div className="rs-container">
        <SectionHeader
          n="03"
          eyebrow="OPERATIONAL FLOW"
          title={<>Uma operação conectada,<br/><span className="rs-italic rs-ember">não peças soltas.</span></>}
          kicker="Shopify é a base comercial. Dados, IA, dashboard, criativos e decisão formam um loop para enxergar melhor, priorizar melhor e vender melhor."
          side={
            <div className="rs-flow-side">
              <span className="rs-chip rs-chip-live rs-chip-flow-status"><span className="tt-pulse-dot" />SISTEMA EM EXECUÇÃO</span>
              <span className="rs-flow-breadcrumb">SHOPIFY → DADOS → IA → DASHBOARD → CRIATIVOS → DECISÃO</span>
            </div>
          }
        />

        <div ref={railRef} className="rs-flow-rail reveal" data-reveal>
          {/* Connection line + traveling pulses */}
          <svg className="rs-flow-line" viewBox="0 0 1200 24" preserveAspectRatio="none">
            <defs>
              <linearGradient id="flow-grad" x1="0%" x2="100%">
                <stop offset="0%" stopColor="rgba(149,242,15,0.36)" />
                <stop offset="35%" stopColor="rgba(94,200,255,0.7)" />
                <stop offset="70%" stopColor="rgba(94,200,255,0.7)" />
                <stop offset="100%" stopColor="rgba(149,242,15,0.32)" />
              </linearGradient>
            </defs>
            <line x1="100" y1="12" x2="1100" y2="12" stroke="var(--rule-300)" strokeWidth="1" />
            <line x1="100" y1="12" x2="1100" y2="12" stroke="url(#flow-grad)" strokeWidth="1.5"
                  strokeDasharray="4 10" style={{ animation: "tt-flow 3s linear infinite" }} />
          </svg>

          <div className="rs-flow-links" aria-hidden="true">
            <span className="rs-flow-link-label rs-flow-link-1">captura</span>
            <span className="rs-flow-link-label rs-flow-link-2">interpreta</span>
            <span className="rs-flow-link-label rs-flow-link-3">prioriza</span>
            <span className="rs-flow-link-label rs-flow-link-4">transforma</span>
            <span className="rs-flow-link-label rs-flow-link-5">retorna</span>
          </div>

          {/* Traveling pulse — driven exclusively by ScrollTrigger scrub */}
          <span className="rs-flow-scrub-pulse" aria-hidden="true" />

          {/* Data-handoff hops — short bursts node→node, like packets */}
          <span className="rs-flow-hop rs-flow-hop--1" aria-hidden="true"><span className="rs-flow-hop-dot" /></span>
          <span className="rs-flow-hop rs-flow-hop--2" aria-hidden="true"><span className="rs-flow-hop-dot" /></span>
          <span className="rs-flow-hop rs-flow-hop--3" aria-hidden="true"><span className="rs-flow-hop-dot" /></span>
          <span className="rs-flow-hop rs-flow-hop--4" aria-hidden="true"><span className="rs-flow-hop-dot" /></span>
          <span className="rs-flow-hop rs-flow-hop--5" aria-hidden="true"><span className="rs-flow-hop-dot rs-flow-hop-dot--ember" /></span>

          <div className="rs-flow-grid">
            {flow.map((n, i) => (
              <div key={n.id} className={`rs-flow-step reveal rs-${n.accent}`} data-reveal style={{ "--rev-delay": `${i * 80}ms` }}>
                <div className="rs-flow-idx">[{n.id}]</div>
                <div className={`rs-flow-node rs-icon-${n.accent}`}>
                  <CornerTicks color={n.accent === "ember" ? "var(--ember-500)" : "var(--cyan-400)"} />
                  <NodeIcon name={n.icon} />
                  {n.live && <span className="tt-pulse-dot rs-flow-live" />}
                </div>
                <div className="rs-flow-label">
                  <div className="rs-flow-name">{n.label}</div>
                  <div className="rs-flow-sub">{n.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Feedback loop label — decision cycles back to the store */}
          <div className="rs-flow-feedback reveal" data-reveal>
              <span className="rs-flow-fb-label">
              <span className="rs-flow-fb-arrow">↺</span>
              FEEDBACK LOOP · DECISÃO RETORNA PARA SHOPIFY, PRODUTO & CAMPANHA
            </span>
          </div>

          <div className="rs-flow-io reveal" data-reveal>
            <div>
              <div className="rs-io-tag">INPUT</div>
              <div className="rs-io-text">Operação dispersa · ferramentas isoladas · decisões por achismo</div>
            </div>
            <div className="rs-io-arrow">
              <span /><ArrowRight /><span />
            </div>
            <div className="rs-io-right">
              <div className="rs-io-tag rs-io-tag-out">OUTPUT</div>
              <div className="rs-io-text rs-io-text-out">Leitura clara · prioridade visível · ação mensurável</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { Rail, Services, SectionHeader, Flow });
