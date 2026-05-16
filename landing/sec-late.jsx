// ============================================================
// LANDING — Dashboard Preview, Projects, About, Timeline, Stack, CTA
// ============================================================

// ---------- DASHBOARD PREVIEW ----------
const DashSection = () => (
  <section className="rs-section rs-dash" id="dashboard">
    <div className="rs-container">
      <div className="rs-dash-grid">
        <div className="rs-dash-copy reveal" data-reveal>
          <div className="rs-section-eyebrow">
            <span className="rs-section-num">[04]</span>
            <span className="rs-section-line" />
            <span>DASHBOARD · LEITURA DE PERFORMANCE</span>
          </div>
          <h2 className="rs-section-title">
            Menos dados espalhados.<br/>
            <span className="rs-italic rs-ember">Mais decisão</span> para vender melhor.
          </h2>
          <p className="rs-section-kicker">
            Dashboards para reunir <span className="rs-strong">Shopify, GA4,
            Meta Ads, RD Station, Supabase e Sheets</span> em uma visão única de performance, prioridade e decisão.
          </p>

          <div className="rs-psv">
            {[
              { k: "PROBLEMA", v: "Métricas dispersas e pouca clareza comercial." },
              { k: "SISTEMA",  v: "KPIs, produtos, canais e funil reunidos em uma visão única." },
              { k: "VALOR",    v: "Mais velocidade para decidir onde agir primeiro." },
            ].map(r => (
              <div key={r.k} className="rs-psv-row">
                <div className="rs-psv-k">{r.k}</div>
                <div className="rs-psv-v">{r.v}</div>
              </div>
            ))}
          </div>

        </div>

        <div className="rs-dash-preview">
          <DashboardWidget />
        </div>
      </div>
    </div>
  </section>
);

const DashboardWidget = () => {
  const widgetRef = React.useRef(null);

  React.useLayoutEffect(() => {
    const el = widgetRef.current;
    const M = window.RSMotion;
    if (!el || !M || !M.ready || M.reduced) return;

    const gsap = window.gsap;
    const isMobile = M.isMobile();

    const ctx = M.context(() => {
      const q = gsap.utils.selector(el);

      // Pré-estados — só aplicados quando GSAP está disponível.
      // Se GSAP falhar, o early-return acima preserva o conteúdo visível.
      gsap.set(el, { opacity: 0, y: 20 });
      gsap.set(q(".rs-dashboard-header > *"), { opacity: 0, y: 8 });
      gsap.set(q(".rs-kpi-card"), { opacity: 0, y: 12 });
      gsap.set(q(".rs-w-kpi-bar"), { scaleX: 0, transformOrigin: "left center" });
      gsap.set(q(".rs-w-kpi-v, .rs-w-kpi-d"), { opacity: 0, y: 6 });
      gsap.set(q(".rs-chart-grid line"), { opacity: 0 });
      gsap.set(q(".rs-chart-area"), { opacity: 0 });
      gsap.set(q(".rs-chart-meta"), { opacity: 0 });
      gsap.set(q(".rs-chart-end"), { opacity: 0, scale: 0.4, transformOrigin: "center center" });
      gsap.set(q(".rs-funnel-row"), { opacity: 0 });
      gsap.set(q(".rs-funnel-fill"), { scaleX: 0, transformOrigin: "left center" });
      gsap.set(q(".rs-funnel-v"), { opacity: 0 });
      gsap.set(q(".rs-w-prod"), { opacity: 0, y: 6 });
      gsap.set(q(".rs-product-bar"), { scaleX: 0, transformOrigin: "left center" });
      gsap.set(q(".rs-w-prod-v"), { opacity: 0 });
      gsap.set(q(".rs-channel-donut"), { opacity: 0, scale: 0.92, transformOrigin: "center center" });
      gsap.set(q(".rs-w-channels .rs-w-card-head"), { opacity: 0 });
      gsap.set(q(".rs-w-ch-row"), { opacity: 0, x: -6 });

      // Linha do gráfico — preparar stroke draw via dasharray/dashoffset.
      const linePath = el.querySelector(".rs-chart-line");
      let lineLen = 0;
      if (linePath) {
        try { lineLen = linePath.getTotalLength(); } catch (e) { lineLen = 0; }
        if (lineLen > 0) {
          gsap.set(linePath, { strokeDasharray: lineLen, strokeDashoffset: lineLen });
        }
      }

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
          once: true,
          invalidateOnRefresh: true,
        },
      });

      // 1. Container "liga"
      tl.to(el, { opacity: 1, y: 0, duration: 0.7 });

      // 2. Header em sequência (título, dot, chip, período, divisória vem do border)
      tl.to(q(".rs-dashboard-header > *"), {
        opacity: 1, y: 0, duration: 0.45, stagger: 0.07, ease: "power2.out",
      }, "-=0.35");

      // 3. KPI cards — cada card entra, barra superior acende, número e variação revelam
      tl.to(q(".rs-kpi-card"), {
        opacity: 1, y: 0, duration: 0.5, stagger: 0.08,
        clearProps: "transform",
      }, "-=0.2");
      tl.to(q(".rs-w-kpi-bar"), {
        scaleX: 1, duration: 0.5, stagger: 0.08, ease: "power2.out",
      }, "<+0.05");

      // Counter discreto: 0 → valor final, formato pt-BR. Roda em paralelo ao reveal.
      const fmtBR = (n, decimals) => {
        const fixed = Number(n).toFixed(decimals);
        const [int, dec] = fixed.split(".");
        const intFmt = int.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return dec ? `${intFmt},${dec}` : intFmt;
      };
      const valEls = q(".rs-w-kpi-v");
      tl.addLabel("kpiVals", "<+0.05");
      valEls.forEach((vEl, i) => {
        const target   = parseFloat(vEl.dataset.target);
        const decimals = parseInt(vEl.dataset.decimals, 10) || 0;
        const prefix   = vEl.dataset.prefix || "";
        const suffix   = vEl.dataset.suffix || "";
        const at       = `kpiVals+=${(i * 0.08).toFixed(2)}`;
        // Reveal posicional
        tl.to(vEl, { opacity: 1, y: 0, duration: 0.4 }, at);
        // Counter sincronizado com o reveal
        const obj = { val: 0 };
        const finalText = prefix + fmtBR(target, decimals) + suffix;
        tl.to(obj, {
          val: target,
          duration: 0.9,
          ease: "power2.out",
          onUpdate: () => { vEl.textContent = prefix + fmtBR(obj.val, decimals) + suffix; },
          onComplete: () => { vEl.textContent = finalText; },
        }, at);
      });
      tl.to(q(".rs-w-kpi-d"), {
        opacity: 1, y: 0, duration: 0.35, stagger: 0.08,
      }, "<+0.05");

      // 4. Gráfico — grid, área, linha desenhada, meta, ponto final
      tl.to(q(".rs-chart-grid line"), {
        opacity: 1, duration: 0.3, stagger: 0.05,
      }, "-=0.2");
      tl.to(q(".rs-chart-area"), { opacity: 1, duration: 0.6 }, "<");
      if (linePath && lineLen > 0) {
        tl.to(linePath, {
          strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut",
        }, "-=0.3");
      }
      tl.to(q(".rs-chart-meta"), { opacity: 0.6, duration: 0.4 }, "-=0.4");
      tl.to(q(".rs-chart-end"), {
        opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.6)",
      }, "-=0.15");

      // 5. Funil — labels entram, barras crescem em stagger, valores aparecem
      tl.to(q(".rs-funnel-row"), {
        opacity: 1, duration: 0.3, stagger: 0.06,
      }, "-=0.7");
      tl.to(q(".rs-funnel-fill"), {
        scaleX: 1, duration: 0.6, stagger: 0.07, ease: "power2.out",
      }, "<+0.05");
      tl.to(q(".rs-funnel-v"), {
        opacity: 1, duration: 0.3, stagger: 0.07,
      }, "<+0.3");

      // 6. Produtos — linhas, barras preenchem, valores
      tl.to(q(".rs-w-prod"), {
        opacity: 1, y: 0, duration: 0.4, stagger: 0.06,
      }, "-=0.6");
      tl.to(q(".rs-product-bar"), {
        scaleX: 1, duration: 0.7, stagger: 0.07, ease: "power2.out",
      }, "<+0.05");
      tl.to(q(".rs-w-prod-v"), {
        opacity: 1, duration: 0.3, stagger: 0.07,
      }, "<+0.3");

      // 7. Donut + legenda dos canais
      tl.to(q(".rs-channel-donut"), {
        opacity: 1, scale: 1, duration: 0.6, ease: "power3.out",
      }, "-=0.85");
      tl.to(q(".rs-w-channels .rs-w-card-head"), {
        opacity: 1, duration: 0.3,
      }, "-=0.4");
      tl.to(q(".rs-w-ch-row"), {
        opacity: 1, x: 0, duration: 0.35, stagger: 0.06,
      }, "<+0.1");

      // Mobile: comprime a sequência sem sacrificar legibilidade
      if (isMobile) tl.timeScale(1.35);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={widgetRef} className="rs-widget rs-dashboard">
      <CornerTicks color="rgba(149,242,15,0.4)" />
      <div className="rs-w-head rs-dashboard-header">
        <div className="rs-w-title">
          <span className="rs-w-name">Dashboard Executivo</span>
          <span className="tt-pulse-dot" style={{ width: 6, height: 6, flexShrink: 0 }} />
          <span className="rs-chip rs-chip-sm rs-dashboard-chip" style={{ opacity: 0.7 }}>PREVIEW · DADOS ILUSTRATIVOS</span>
        </div>
        <div className="rs-w-period">
          <span className="rs-w-period-label">PERÍODO</span>
          <span className="rs-w-period-pill">30 DIAS ▾</span>
        </div>
      </div>

      <div className="rs-w-kpis">
        {[
          { l: "RECEITA",      v: "R$ 1,268M", target: 1.268,  prefix: "R$ ", suffix: "M", decimals: 3, d: "+18.6%" },
          { l: "PEDIDOS",      v: "24.382",    target: 24382,  prefix: "",    suffix: "",  decimals: 0, d: "+14.2%" },
          { l: "CONVERSÃO",    v: "2,81%",     target: 2.81,   prefix: "",    suffix: "%", decimals: 2, d: "+12.7%" },
          { l: "TICKET MÉDIO", v: "R$ 198,40", target: 198.40, prefix: "R$ ", suffix: "",  decimals: 2, d: "+9.3%"  },
        ].map((k,i) => (
          <div key={i} className="rs-w-kpi rs-kpi-card">
            <span className="rs-w-kpi-bar" />
            <div className="rs-w-kpi-l">{k.l}</div>
            <div className="rs-w-kpi-v"
                 data-target={k.target}
                 data-prefix={k.prefix}
                 data-suffix={k.suffix}
                 data-decimals={k.decimals}>{k.v}</div>
            <div className="rs-w-kpi-d">▲ {k.d}</div>
          </div>
        ))}
      </div>

      <div className="rs-w-charts">
        <div className="rs-w-card">
          <div className="rs-w-card-head">
            <span>EVOLUÇÃO DA RECEITA</span>
            <span className="rs-w-legend">
              <span><i style={{ background: "var(--cyan-400)" }} />RECEITA</span>
              <span><i style={{ background: "var(--ember-500)" }} />META</span>
            </span>
          </div>
          <MiniLine />
        </div>
        <div className="rs-w-card">
          <div className="rs-w-card-head"><span>FUNIL DE CONVERSÃO</span></div>
          <MiniFunnel />
        </div>
      </div>

      <div className="rs-w-bottom">
        <div className="rs-w-card">
          <div className="rs-w-card-head"><span>PRODUTOS EM DESTAQUE</span></div>
          {[
            { n: "Produto Alpha", v: "R$ 342.870", w: 100, p: true },
            { n: "Produto Beta",  v: "R$ 278.450", w: 78 },
            { n: "Produto Gamma", v: "R$ 188.230", w: 54 },
            { n: "Produto Delta", v: "R$ 112.430", w: 32 },
          ].map((p,i) => (
            <div key={i} className="rs-w-prod">
              <div className="rs-w-prod-row"><span>{p.n}</span><span className="rs-w-prod-v">{p.v}</span></div>
              <div className="rs-w-prod-bar">
                <span className="rs-product-bar" style={{ width: `${p.w}%`, background: p.p ? "var(--ember-500)" : "var(--cyan-500)", boxShadow: p.p ? "0 0 8px var(--ember-glow)" : "0 0 6px var(--cyan-glow)" }} />
              </div>
            </div>
          ))}
        </div>
        <div className="rs-w-card rs-w-channels">
          <MiniDonut />
          <div className="rs-w-ch-list">
            <div className="rs-w-card-head"><span>CANAIS DE AQUISIÇÃO</span></div>
            {[
              { c: "Paid Ads", p: "48%", color: "var(--ember-500)" },
              { c: "Orgânico", p: "28%", color: "var(--cyan-400)" },
              { c: "Direto",   p: "14%", color: "var(--cyan-600)" },
              { c: "Email",    p: "7%",  color: "var(--status-live)" },
              { c: "Outros",   p: "3%",  color: "var(--fg-400)" },
            ].map(ch => (
              <div key={ch.c} className="rs-w-ch-row">
                <span><i style={{ background: ch.color }} />{ch.c}</span>
                <span className="rs-w-ch-p">{ch.p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rs-w-tags">
        {["Shopify","GA4","Meta Ads","RD Station","Supabase","Sheets","Dashboards"].map(t => (
          <span key={t} className="rs-chip rs-chip-sm">{t}</span>
        ))}
      </div>
    </div>
  );
};

const MiniLine = () => {
  const pts = [22, 28, 24, 32, 38, 35, 44, 50, 47, 56, 63, 70];
  const W = 460, H = 130, max = 80;
  const step = W / (pts.length - 1);
  const path = pts.map((p, i) => `${i ? "L" : "M"}${(i*step).toFixed(1)} ${(H - p/max*H).toFixed(1)}`).join(" ");
  const area = `${path} L${W} ${H} L0 ${H} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} preserveAspectRatio="none">
      <defs>
        <linearGradient id="ml-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(94,200,255,0.35)" />
          <stop offset="100%" stopColor="rgba(94,200,255,0)" />
        </linearGradient>
      </defs>
      <g className="rs-chart-grid">
        {[0, .33, .66, 1].map((g, i) => (
          <line key={i} x1="0" y1={H*g} x2={W} y2={H*g} stroke="var(--rule-200)" strokeDasharray="2 4" />
        ))}
      </g>
      <path className="rs-chart-area" d={area} fill="url(#ml-fill)" />
      <path className="rs-chart-line" d={path} fill="none" stroke="var(--cyan-400)" strokeWidth="1.5" style={{ filter: "drop-shadow(0 0 4px rgba(94,200,255,0.6))" }} />
      <line className="rs-chart-meta" x1="0" y1={H*0.35} x2={W} y2={H*0.35} stroke="var(--ember-500)" strokeWidth="1" strokeDasharray="4 6" opacity="0.6" />
      <circle className="rs-chart-end" cx={W} cy={H - 70/max*H} r="3" fill="var(--cyan-300)">
        <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
      </circle>
      {["01/05","08/05","15/05","22/05","29/05"].map((l, i) => (
        <text key={i} x={i * (W/4)} y={H-2} fontFamily="ui-monospace" fontSize="8" fill="var(--fg-500)">{l}</text>
      ))}
    </svg>
  );
};

const MiniFunnel = () => {
  const rows = [
    { l: "SESSÕES",  v: "356.214", w: 100 },
    { l: "PRODUTO",  v: "82.476",  w: 78 },
    { l: "CARRINHO", v: "18.742",  w: 52 },
    { l: "CHECKOUT", v: "6.231",   w: 32 },
    { l: "PEDIDOS",  v: "4.892",   w: 22 },
  ];
  return (
    <div className="rs-funnel">
      {rows.map((r, i) => (
        <div key={i} className="rs-funnel-row">
          <span className="rs-funnel-l">{r.l}</span>
          <div className="rs-funnel-bar">
            <span className="rs-funnel-fill" style={{
              width: `${r.w}%`,
              clipPath: i < rows.length - 1 ? "polygon(0 0, 100% 0, calc(100% - 6px) 100%, 0 100%)" : "none",
            }} />
            <span className="rs-funnel-v">{r.v}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

const MiniDonut = () => {
  const segs = [
    { p: 0.48, color: "#FF6B3A" },
    { p: 0.28, color: "#5EC8FF" },
    { p: 0.14, color: "#1C7FAB" },
    { p: 0.07, color: "#4ADE80" },
    { p: 0.03, color: "#6B6964" },
  ];
  let acc = 0;
  const r = 38, c = 50, cir = 2 * Math.PI * r;
  return (
    <svg className="rs-channel-donut" width="110" height="110" viewBox="0 0 100 100">
      <circle cx={c} cy={c} r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="10" />
      {segs.map((s, i) => {
        const dash = s.p * cir;
        const offset = -acc * cir;
        acc += s.p;
        return <circle key={i} cx={c} cy={c} r={r} fill="none"
                       stroke={s.color} strokeWidth="10"
                       strokeDasharray={`${dash} ${cir - dash}`}
                       strokeDashoffset={offset}
                       transform={`rotate(-90 ${c} ${c})`} />;
      })}
      <text x={c} y={c-2} textAnchor="middle" fontFamily="var(--font-serif)" fontSize="14" fill="var(--fg-100)">100%</text>
      <text x={c} y={c+10} textAnchor="middle" fontFamily="ui-monospace" fontSize="6" fill="var(--fg-400)" letterSpacing="0.1em">CHANNELS</text>
    </svg>
  );
};

// ---------- PROJECTS ----------
const Projects = () => {
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    const row = sectionRef.current?.querySelector(".rs-clients-row");
    if (!row) return;

    let isDown = false;
    let hasDragged = false;
    let startX;
    let scrollLeft;
    const moveThreshold = 5; // px

    const onDown = (e) => {
      isDown = true;
      hasDragged = false;
      startX = e.pageX - row.offsetLeft;
      scrollLeft = row.scrollLeft;
    };
    const onUp = () => {
      isDown = false;
      // Pequeno delay para garantir que o click seja processado antes de remover is-dragging
      setTimeout(() => {
        row.classList.remove("is-dragging");
      }, 60);
    };
    const onMove = (e) => {
      if (!isDown) return;
      const x = e.pageX - row.offsetLeft;
      const walk = (x - startX) * 1.2;

      if (!hasDragged && Math.abs(walk) > moveThreshold) {
        hasDragged = true;
        row.classList.add("is-dragging");
      }

      if (hasDragged) {
        e.preventDefault();
        row.scrollLeft = scrollLeft - walk;
      }
    };

    row.addEventListener("mousedown", onDown);
    row.addEventListener("mouseleave", onUp);
    row.addEventListener("mouseup", onUp);
    row.addEventListener("mousemove", onMove);

    return () => {
      row.removeEventListener("mousedown", onDown);
      row.removeEventListener("mouseleave", onUp);
      row.removeEventListener("mouseup", onUp);
      row.removeEventListener("mousemove", onMove);
    };
  }, []);

  const clients = [
    { n: "Kabak",         url: "https://www.kabak.com.br" },
    { n: "Just Beauty",   url: "https://www.justbeauty.com.br" },
    { n: "Sincere",       url: "https://sincere.com.br" },
    { n: "Relaxmedic",    url: "https://relaxmedic.com.br" },
    { n: "Vista Beagle",  url: "https://www.vistabeagle.com.br/" },
    { n: "Store Dot",     url: "https://storedot.com.br" },
    { n: "Tittanium",     url: "https://tittanium.ag" },
    { n: "Lionz Clothes", url: "https://lionzclothes.com.br" },
  ];
  const projects = [
    {
      n: "01", title: "Shopify Projects",
      status: "SHOPIFY · COMMERCE",
      problem: "Lojas com seções rígidas, PDPs fracas, landings genéricas e dependência de dev para cada ajuste.",
      system: "Temas Shopify com seções modulares, product pages e landing pages construídas para vender com mais clareza.",
      value: "Mais autonomia para marketing, melhor experiência comercial e páginas que ajudam a vender — não só a compor visualmente.",
      tags: ["Shopify", "Theme Sections", "PDP", "Landing"],
      accent: "ember",
      principal: true,
    },
    {
      n: "02", title: "Dashboard Agência",
      status: "DECISÃO · PERFORMANCE",
      problem: "Dados espalhados em várias ferramentas, sem leitura comercial clara.",
      system: "Dashboard conectando Shopify, GA4, Meta Ads, RD Station, Supabase e fontes operacionais em uma leitura única.",
      value: "Mais clareza para priorizar canais, produtos e oportunidades sem depender de relatórios soltos.",
      tags: ["Shopify", "GA4", "Meta Ads", "RD Station", "Supabase"],
      accent: "cyan",
    },
    {
      n: "03", title: "Creative Performance Flow",
      status: "CREATIVE · PERFORMANCE",
      problem: "Ideias, hipóteses e aprendizados criativos perdidos entre planilhas, briefings e conversas.",
      system: "Fluxo para transformar dados, produto e insights em copies, direcionamentos, checklists e handoffs.",
      value: "Criativos mais rastreáveis, menos retrabalho e mais contexto para quem executa mídia e design.",
      tags: ["Hypothesis", "Briefing", "Handoff", "Variations"],
      accent: "cyan",
    },
    {
      n: "04", title: "Shopify Ops Flow",
      status: "OPS · WORKFLOWS",
      problem: "Processos manuais, briefings soltos e informações importantes espalhadas entre loja, campanha e operação.",
      system: "Fluxos para organizar demandas, handoffs, documentação, produto, campanhas e decisões com mais contexto operacional.",
      value: "Menos retrabalho, mais velocidade operacional e uma rotina mais clara para marketing, design e e-commerce.",
      tags: ["Automation", "Workflows", "Handoffs", "Ops"],
      accent: "cyan",
    },
  ];

  React.useLayoutEffect(() => {
    const el = sectionRef.current;
    const M = window.RSMotion;
    if (!el || !M || !M.ready || M.reduced) return;

    const gsap = window.gsap;
    const isMobile = M.isMobile();

    const ctx = M.context(() => {
      const q = gsap.utils.selector(el);
      const cards = q(".rs-proj-card");
      if (!cards.length) return;

      // Pré-estados — só com GSAP. Sem GSAP, cards já ficam visíveis (sem reveal class).
      gsap.set(cards, { opacity: 0, y: 24, scale: 0.985, transformOrigin: "center top" });
      gsap.set(q(".rs-proj-badge"), { opacity: 0, y: -4 });
      gsap.set(q(".rs-proj-head > *, .rs-proj-title, .rs-proj-rows > div, .rs-chip-sm"), { opacity: 0, y: 8 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
          once: true,
          invalidateOnRefresh: true,
        },
      });

      // 1. Card principal (Shopify) entra primeiro, com leve "ignição" no anel ember
      const principal = cards.find(c => c.classList.contains("rs-proj-principal"));
      const others = cards.filter(c => c !== principal);

      if (principal) {
        tl.to(principal, { opacity: 1, y: 0, scale: 1, duration: 0.7 });
        // pulso ember discreto: realça a borda por ~600ms e volta ao default
        tl.fromTo(principal,
          { boxShadow: "inset 0 0 0 1px rgba(149,242,15,0.32)" },
          { boxShadow: "inset 0 0 0 1px rgba(149,242,15,0.55), 0 0 36px rgba(149,242,15,0.18)", duration: 0.35, yoyo: true, repeat: 1, ease: "sine.inOut" },
          "<+0.15"
        );
        // badge entra depois
        const badge = principal.querySelector(".rs-proj-badge");
        if (badge) tl.to(badge, { opacity: 1, y: 0, duration: 0.35 }, "<+0.1");
        // Conteúdo interno do principal
        tl.to(principal.querySelectorAll(".rs-proj-head > *"), { opacity: 1, y: 0, duration: 0.4, stagger: 0.06 }, "-=0.45");
        tl.to(principal.querySelectorAll(".rs-proj-title"), { opacity: 1, y: 0, duration: 0.45 }, "-=0.25");
        tl.to(principal.querySelectorAll(".rs-proj-rows > div"), { opacity: 1, y: 0, duration: 0.4, stagger: 0.07 }, "-=0.2");
        tl.to(principal.querySelectorAll(".rs-chip-sm"), { opacity: 1, y: 0, duration: 0.3, stagger: 0.04 }, "-=0.2");
      }

      // 2. Outros cards entram em cascata
      tl.addLabel("rest", principal ? "-=0.35" : "+=0");
      others.forEach((card, idx) => {
        const at = `rest+=${(idx * 0.12).toFixed(2)}`;
        tl.to(card, { opacity: 1, y: 0, scale: 1, duration: 0.55 }, at);
        tl.to(card.querySelectorAll(".rs-proj-head > *"), { opacity: 1, y: 0, duration: 0.35, stagger: 0.05 }, `${at}+=0.05`);
        tl.to(card.querySelectorAll(".rs-proj-title"), { opacity: 1, y: 0, duration: 0.4 }, `${at}+=0.12`);
        tl.to(card.querySelectorAll(".rs-proj-rows > div"), { opacity: 1, y: 0, duration: 0.35, stagger: 0.05 }, `${at}+=0.18`);
        tl.to(card.querySelectorAll(".rs-chip-sm"), { opacity: 1, y: 0, duration: 0.28, stagger: 0.03 }, `${at}+=0.28`);
      });

      if (isMobile) tl.timeScale(1.25);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="rs-section rs-projects" id="projetos">
      <div className="rs-container">
        <SectionHeader
          n="05"
          eyebrow="EXPERIÊNCIA REAL"
          title={<>Projetos aplicados<br/>em <span className="rs-italic rs-ember">operações reais</span><br/>de e-commerce.</>}
          kicker="Desenvolvimento Shopify e páginas comerciais como núcleo do trabalho — com dados, IA e automações apoiando operação, performance e decisão."
        />

        <div className="rs-clients reveal" data-reveal>
          <div className="rs-clients-label">CLIENTES & COLABORAÇÕES</div>
          <div className="rs-clients-row">
            {clients.map(c => (
              <a key={c.n}
                 className="rs-client-chip"
                 href={c.url}
                 target="_blank"
                 rel="noopener noreferrer"
                 aria-label={`${c.n} — abrir site em nova aba`}>
                <span className="rs-client-chip-name">{c.n}</span>
                <svg className="rs-client-chip-arrow" width="10" height="10" viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M4 8 L8 4 M5 4 L8 4 L8 7" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div className="rs-proj-grid">
          {projects.map((p) => (
            <article
              key={p.n}
              className={`rs-proj-card rs-${p.accent}${p.principal ? " rs-proj-principal" : ""}`}
            >
              <CornerTicks color={p.accent === "ember" ? "var(--ember-500)" : "var(--cyan-400)"} />
              {p.principal && <span className="rs-proj-badge" aria-label="Projeto principal">BASE SHOPIFY</span>}
              <div className="rs-proj-head">
                <span className="rs-proj-num">[ {p.n} ]</span>
                <span className={`rs-proj-status ${p.accent === "ember" ? "" : "rs-status-cyan"}`}>{p.status}</span>
              </div>
              <h3 className="rs-proj-title">{p.title}</h3>
              <div className="rs-proj-rows">
                <div><span className="rs-proj-k">PROBLEMA</span><span className="rs-proj-v">{p.problem}</span></div>
                <div><span className="rs-proj-k">SISTEMA</span><span className="rs-proj-v">{p.system}</span></div>
                <div><span className="rs-proj-k rs-k-out">VALOR</span><span className="rs-proj-v rs-proj-v-out">{p.value}</span></div>
              </div>
              <div className="rs-proj-tags">{p.tags.map(t => <span key={t} className="rs-chip rs-chip-sm">{t}</span>)}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------- ABOUT ----------
const About = () => {
  const sectionRef = React.useRef(null);

  React.useLayoutEffect(() => {
    const el = sectionRef.current;
    const M = window.RSMotion;
    if (!el || !M || !M.ready || M.reduced) return;
    const gsap = window.gsap;

    // Helper: split a text node into per-char spans (preserves whitespace)
    const splitChars = (target) => {
      if (!target) return [];
      if (target.dataset.split === "1") {
        return Array.from(target.querySelectorAll(".rs-about-char"));
      }
      const text = target.textContent;
      target.textContent = "";
      const frag = document.createDocumentFragment();
      const spans = [];
      for (const ch of text) {
        const s = document.createElement("span");
        s.className = "rs-about-char";
        s.textContent = ch === " " ? " " : ch;
        frag.appendChild(s);
        spans.push(s);
      }
      target.appendChild(frag);
      target.dataset.split = "1";
      return spans;
    };

    // Helper: scramble swap-in (homemade — no SplitText/ScrambleText plugin)
    const scrambleTo = (target, finalText, duration = 0.55) => {
      const glyphs = "01<>{}/!@#$%&*?ABXYZ▓░█";
      const arr = Array.from(finalText);
      const obj = { p: 0 };
      return gsap.to(obj, {
        p: 1, duration, ease: "none",
        onUpdate: () => {
          const t = obj.p;
          let out = "";
          for (let i = 0; i < arr.length; i++) {
            const settle = (i / arr.length) * 0.82;
            if (t >= settle + 0.18 || arr[i] === " ") out += arr[i];
            else out += glyphs[(Math.random() * glyphs.length) | 0];
          }
          target.textContent = out;
        },
        onComplete: () => { target.textContent = finalText; },
      });
    };

    const ctx = M.context(() => {
      const q = gsap.utils.selector(el);

      const eyebrowEls = q(".rs-about-head .rs-section-eyebrow > *");
      const t1         = el.querySelector(".rs-about-t1");
      const t2Em       = el.querySelector(".rs-about-t2-em");
      const t2Tail     = el.querySelector(".rs-about-t2-tail");
      const frame      = el.querySelector(".rs-about-frame");
      const photoImg   = el.querySelector(".rs-about-photo img");
      const cornerTL   = el.querySelector(".rs-about-photo-corner--tl");
      const cornerTR   = el.querySelector(".rs-about-photo-corner--tr");
      const cornerBL   = el.querySelector(".rs-about-photo-corner--bl");
      const cornerBR   = el.querySelector(".rs-about-photo-corner--br");
      const scanBoot   = el.querySelector(".rs-about-photo-scan-boot");
      const headBar    = q(".rs-about-frame-head > *");
      const footRows   = q(".rs-about-frame-foot-row");
      const bodyEls    = q(".rs-about-body > *");
      const badgeEls   = q(".rs-about-badges .rs-chip");

      const t1Chars  = splitChars(t1);
      const t2EmText = t2Em ? t2Em.textContent : "";
      if (t2Em) t2Em.textContent = "";

      // Initial states
      gsap.set(eyebrowEls, { opacity: 0, y: 8 });
      gsap.set(t1Chars,    { opacity: 0, y: 22, rotateX: -45, transformOrigin: "50% 100%" });
      gsap.set(t2Em,       { opacity: 0 });
      gsap.set(t2Tail,     { opacity: 0, y: 6 });
      if (frame) gsap.set(frame, { opacity: 0, y: 22, filter: "blur(10px)" });
      if (photoImg) gsap.set(photoImg, {
        filter: "brightness(0.35) saturate(0.2) blur(6px) contrast(1.1)",
        scale: 1.06,
        transformOrigin: "50% 50%",
      });
      if (cornerTL) gsap.set(cornerTL, { transformOrigin: "0% 0%",     scale: 0 });
      if (cornerTR) gsap.set(cornerTR, { transformOrigin: "100% 0%",   scale: 0 });
      if (cornerBL) gsap.set(cornerBL, { transformOrigin: "0% 100%",   scale: 0 });
      if (cornerBR) gsap.set(cornerBR, { transformOrigin: "100% 100%", scale: 0 });
      if (scanBoot) gsap.set(scanBoot, { opacity: 0, top: "-3%" });
      gsap.set(headBar,  { opacity: 0, y: 6 });
      gsap.set(footRows, { opacity: 0, x: -8 });
      gsap.set(bodyEls,  { opacity: 0, y: 10 });
      gsap.set(badgeEls, { opacity: 0, y: 14, scale: 0.9 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: el, start: "top 75%", once: true, invalidateOnRefresh: true },
      });

      // 1. Eyebrow line in
      tl.to(eyebrowEls, { opacity: 1, y: 0, duration: 0.4, stagger: 0.05 });

      // 2. Title line 1 — char cascade with rotateX flip-up
      tl.to(t1Chars, {
        opacity: 1, y: 0, rotateX: 0,
        duration: 0.55, ease: "back.out(1.6)", stagger: 0.025,
      }, "-=0.20");

      // 3. Scramble swap-in for "Dados, IA e automação"
      if (t2Em && t2EmText) {
        tl.to(t2Em, { opacity: 1, duration: 0.05 }, "-=0.30")
          .add(scrambleTo(t2Em, t2EmText, 0.55), "<");
      }

      // 4. Tail "como extensão da operação." fades in
      tl.to(t2Tail, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, "-=0.05");

      // 5. Frame materializes (fade + de-blur)
      if (frame) {
        tl.to(frame, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "power2.out" }, "-=0.55");
      }

      // 6. Corners draw in TL → TR → BR → BL
      const cornerOrder = [cornerTL, cornerTR, cornerBR, cornerBL].filter(Boolean);
      tl.to(cornerOrder, { scale: 1, duration: 0.28, ease: "back.out(2)", stagger: 0.07 }, "-=0.45");

      // 7. One-shot scan-boot sweep + photo de-blur in parallel
      if (scanBoot) {
        tl.to(scanBoot, { opacity: 0.95, duration: 0.08 }, "-=0.40")
          .to(scanBoot, { top: "102%", duration: 0.95, ease: "power1.inOut" }, "<")
          .to(scanBoot, { opacity: 0, duration: 0.18 }, "-=0.20");
      }
      if (photoImg) {
        tl.to(photoImg, {
          filter: "brightness(0.96) saturate(0.92) contrast(1.04) blur(0px)",
          scale: 1,
          duration: 0.95, ease: "power2.out",
        }, "-=1.10");
      }

      // 8. Frame head bar (ID + coord) cascade
      tl.to(headBar, { opacity: 1, y: 0, duration: 0.32, stagger: 0.08 }, "-=0.70");

      // 9. Foot rows slide-in from left
      tl.to(footRows, { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, ease: "power2.out" }, "-=0.35");

      // 10. Body paragraphs + CTA
      tl.to(bodyEls, { opacity: 1, y: 0, duration: 0.5, stagger: 0.07 }, "-=0.55");

      // 11. Badges drop-in with overshoot
      tl.to(badgeEls, {
        opacity: 1, y: 0, scale: 1,
        duration: 0.42, ease: "back.out(1.8)", stagger: 0.04,
      }, "-=0.30");
    }, el);

    return () => ctx.revert();
  }, []);

  const badges = [
    { l: "RAFAEL SILVA",        accent: "shopify" },
    { l: "HEAD DE TECNOLOGIA",  accent: ""        },
    { l: "SHOPIFY DEVELOPMENT", accent: "shopify" },
    { l: "PDPs",                accent: ""        },
    { l: "LANDING PAGES",       accent: ""        },
    { l: "DASHBOARDS",          accent: "cyan"    },
    { l: "AUTOMAÇÕES",          accent: ""        },
    { l: "AI SYSTEMS",          accent: "cyan"    },
  ];

  return (
    <section ref={sectionRef} className="rs-section rs-about" id="sobre">
      <div className="rs-container">
        <div className="rs-about-grid">
          <header className="rs-about-head reveal" data-reveal>
            <div className="rs-section-eyebrow">
              <span className="rs-section-num">[06]</span>
              <span className="rs-section-line" />
              <span>SOBRE — ABOUT THE BUILDER</span>
            </div>
            <h2
              className="rs-section-title rs-about-title"
              aria-label="Shopify na base. Dados, IA e automação como extensão da operação."
            >
              <span className="rs-about-t1" aria-hidden="true">Shopify na base.</span>
              <br/>
              <span className="rs-about-t2" aria-hidden="true">
                <span className="rs-italic rs-ember rs-about-t2-em">Dados, IA e automação</span>
                <span className="rs-about-t2-tail"> como extensão da operação.</span>
              </span>
            </h2>
          </header>

          <div className="rs-about-portrait reveal" data-reveal>
            <div className="rs-about-frame">
              <div className="rs-about-frame-head">
                <span className="rs-about-frame-id">
                  <span className="rs-status-dot" /> ID · 0046 / RS
                </span>
                <span className="rs-about-frame-coord">SUBJECT · ONLINE</span>
              </div>

              <div className="rs-about-photo">
                <img
                  src="/assets/raficlx.png"
                  alt="Retrato de Rafael Silva — Head de Tecnologia"
                  loading="lazy"
                  decoding="async"
                />
                <span className="rs-about-photo-grid"     aria-hidden="true" />
                <span className="rs-about-photo-glow"     aria-hidden="true" />
                <span className="rs-about-photo-vignette" aria-hidden="true" />
                <span className="rs-about-photo-scan"     aria-hidden="true" />
                <span className="rs-about-photo-scan-boot" aria-hidden="true" />
                <span className="rs-about-photo-corner rs-about-photo-corner--tl" aria-hidden="true" />
                <span className="rs-about-photo-corner rs-about-photo-corner--tr" aria-hidden="true" />
                <span className="rs-about-photo-corner rs-about-photo-corner--bl" aria-hidden="true" />
                <span className="rs-about-photo-corner rs-about-photo-corner--br" aria-hidden="true" />
              </div>

              <div className="rs-about-frame-foot">
                <div className="rs-about-frame-foot-row">
                  <span className="rs-about-frame-foot-k">SUBJECT</span>
                  <span className="rs-about-frame-foot-v">RAFAEL SILVA</span>
                </div>
                <div className="rs-about-frame-foot-row">
                  <span className="rs-about-frame-foot-k">ROLE</span>
                  <span className="rs-about-frame-foot-v">HEAD DE TECNOLOGIA · TITTANIUM</span>
                </div>
                <div className="rs-about-frame-foot-row">
                  <span className="rs-about-frame-foot-k">FOCUS</span>
                  <span className="rs-about-frame-foot-v rs-about-frame-foot-accent">SHOPIFY · DATA · AI · AUTOMATION</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rs-about-body reveal" data-reveal>
            <p className="rs-about-text">
              Sou <span className="rs-strong">Rafael Silva</span>, Head de Tecnologia na Tittanium, e atuo no
              desenvolvimento de e-commerces em Shopify com foco em páginas que vendem
              melhor e estruturas mais bem conectadas.
            </p>
            <p className="rs-about-text">
              Além de Shopify, trabalho com dashboards, automações e <span className="rs-italic">AI systems</span> para apoiar
              decisão, acelerar processos e integrar dados, criação e operação.
            </p>
            <a
              className="rs-btn rs-btn-ghost rs-about-cta"
              href="https://wa.me/5548999255795?text=Ol%C3%A1%20Rafael!%20Vim%20pelo%20seu%20site%20e%20queria%20conversar%20sobre%20um%20projeto."
              target="_blank"
              rel="noopener noreferrer"
            >
              Conversar sobre um projeto <ArrowRight />
            </a>
          </div>

          <div className="rs-about-badges reveal" data-reveal>
            {badges.map(b => (
              <span
                key={b.l}
                className={`rs-chip rs-chip-sm${b.accent ? ` rs-chip-${b.accent}` : ""}`}
              >
                {b.accent && <span className="rs-chip-dot" />}
                {b.l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ---------- TIMELINE ----------
const Timeline = () => {
  const sectionRef = React.useRef(null);
  const steps = [
    { k: "Origem", t: "Design & UX/UI", d: "Hierarquia, experiência e conversão como base.", accent: "quiet" },
    { k: "Centro", t: "Shopify Development", d: "Temas, seções, product pages, landing pages e arquitetura comercial.", accent: "shopify" },
    { k: "Leitura", t: "Dados & Dashboards", d: "Métricas transformadas em leitura e prioridade.", accent: "data" },
    { k: "Camada atual", t: "IA, Automação & Operação", d: "Processos, criação e documentação com mais contexto e agilidade.", accent: "intelligence" },
  ];

  React.useLayoutEffect(() => {
    const el = sectionRef.current;
    const chapters = el?.querySelector(".rs-tl-chapters");
    const stepEls = Array.from(el?.querySelectorAll(".rs-tl-step") || []);
    const M = window.RSMotion;
    if (!el || !chapters || !stepEls.length) return;

    const setProgress = (progress) => {
      const p = Math.max(0, Math.min(1, progress));
      chapters.style.setProperty("--tl-progress", p.toFixed(3));
      stepEls.forEach((step, i) => {
        const threshold = stepEls.length === 1 ? 0 : i / (stepEls.length - 1);
        step.classList.toggle("is-active", p >= threshold - 0.025);
      });
    };

    const showAll = () => setProgress(1);
    if (!M || !M.ready || M.reduced) { showAll(); return; }

    const ctx = M.context(() => {
      const ScrollTrigger = window.ScrollTrigger;
      if (!ScrollTrigger) { showAll(); return; }

      setProgress(0);
      ScrollTrigger.create({
        trigger: chapters,
        start: "top 78%",
        end: "bottom 62%",
        scrub: 0.55,
        invalidateOnRefresh: true,
        onUpdate: (self) => setProgress(self.progress),
        onLeave: showAll,
        onLeaveBack: () => setProgress(0),
      });

      // Editorial mask reveal on the left story block — same idiom as the hero
      const story = el.querySelector(".rs-tl-story");
      if (story) {
        const gsap = window.gsap;
        const inners = Array.from(story.querySelectorAll(".rs-tl-mask-inner"));
        const cta = story.querySelector(".rs-tl-story-cta");
        if (inners.length || cta) {
          if (inners.length) gsap.set(inners, { yPercent: 110 });
          if (cta) gsap.set(cta, { opacity: 0, y: 14 });
          gsap.timeline({
            scrollTrigger: { trigger: story, start: "top 82%", once: true },
          })
            .to(inners, { yPercent: 0, duration: 1.05, ease: "expo.out", stagger: 0.12 })
            .to(cta, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.45");
        }
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="rs-section rs-timeline" id="evolucao">
      <div className="rs-container">
        <SectionHeader
          n="07"
          eyebrow="TRAJETÓRIA"
          title={<>Do design ao <span className="rs-italic rs-ember">Shopify Developer</span><br/>com visão de operação.</>}
          kicker="Comecei no design e UX/UI, evoluí para Shopify e hoje uso dados, IA e automação como camadas para construir lojas e páginas mais estratégicas."
        />

        <div className="rs-timeline-editorial">
          <div className="rs-tl-story">
            <span className="rs-tl-story-kicker">
              <span className="rs-tl-mask"><span className="rs-tl-mask-inner">POR QUE ESSA COMBINAÇÃO EXISTE</span></span>
            </span>
            <p>
              <span className="rs-tl-mask"><span className="rs-tl-mask-inner">A base visual virou vantagem técnica.</span></span>
            </p>
            <p>
              <span className="rs-tl-mask"><span className="rs-tl-mask-inner">O design trouxe repertório visual e de experiência. Shopify virou o centro da entrega. Dados, IA e automação ampliaram a capacidade de construir com mais contexto e clareza operacional.</span></span>
            </p>
            <a
              className="rs-btn rs-btn-primary rs-tl-story-cta"
              href="https://wa.me/5548999255795?text=Ol%C3%A1%20Rafael!%20Vim%20pelo%20seu%20site%20e%20queria%20conversar%20sobre%20um%20projeto."
              target="_blank"
              rel="noopener noreferrer"
            >
              Conversar sobre um projeto <ArrowRight />
            </a>
          </div>

          <div className="rs-tl-chapters" aria-label="Capítulos da trajetória profissional">
            {/* Scroll-driven playhead — descends along the rail */}
            <span className="rs-tl-playhead" aria-hidden="true" />
            {/* Autonomous packets — keep the rail alive while at rest */}
            <span className="rs-tl-pkt rs-tl-pkt--1" aria-hidden="true" />
            <span className="rs-tl-pkt rs-tl-pkt--2" aria-hidden="true" />
            <span className="rs-tl-pkt rs-tl-pkt--3" aria-hidden="true" />
            {steps.map((s, i) => (
              <article key={s.t} className={`rs-tl-step rs-tl-${s.accent}`}>
                <div className="rs-tl-mark">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="rs-tl-card">
                  <div className="rs-tl-kicker">{s.k}</div>
                  <div className="rs-tl-title">{s.t}</div>
                  <div className="rs-tl-desc">{s.d}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ---------- STACK ----------
const Stack = () => {
  const sectionRef = React.useRef(null);
  const gridRef = React.useRef(null);
  const groups = [
    { title: "Shopify & Front-end", accent: "ember",
      items: ["Shopify", "Theme Dev", "Liquid", "JavaScript", "React", "Next.js", "Git", "GitHub", "Vercel"] },
    { title: "Dados & Dashboards", accent: "cyan",
      items: ["GA4", "Meta Ads", "Supabase", "PostgreSQL", "Google Sheets", "Data Analysis", "Dashboards", "RD Station"] },
    { title: "IA & Automação", accent: "cyan",
      items: ["OpenAI", "Claude", "Prompts", "AI Automation", "Process Automation"] },
    { title: "Páginas & Criativos", accent: "ember",
      items: ["Landing Pages", "Product Pages", "UX/UI", "CRO", "Ads Copy", "Web Design"] },
  ];

  React.useLayoutEffect(() => {
    const el = sectionRef.current;
    const grid = gridRef.current;
    const M = window.RSMotion;
    if (!el || !grid || !M || !M.ready) return;

    const gsap = window.gsap;
    const reduced = !!M.reduced;
    const cleanups = [];

    const ctx = M.context(() => {
      const q = gsap.utils.selector(el);
      const groupEls = q(".rs-stack-group");
      const chipEls  = Array.from(grid.querySelectorAll(".rs-stack-chip"));
      if (!groupEls.length || !chipEls.length) return;

      // reduced motion: estado natural, sem animação nem tilt
      if (reduced) return;

      // ---------- SCATTER: posições aleatórias por chip ----------
      // Mede a posição NATURAL via offset chain (não depende de transforms),
      // depois sorteia um destino dentro da grid e converte em delta x/y.
      const scatterMap = new WeakMap();
      const computeScatter = () => {
        const gridRect = grid.getBoundingClientRect();
        const margin = 16;
        chipEls.forEach((chip) => {
          let nx = 0, ny = 0;
          let n = chip;
          while (n && n !== grid) {
            nx += n.offsetLeft;
            ny += n.offsetTop;
            n = n.offsetParent;
          }
          const cw = chip.offsetWidth;
          const ch = chip.offsetHeight;
          const availW = Math.max(0, gridRect.width  - cw - 2 * margin);
          const availH = Math.max(0, gridRect.height - ch - 2 * margin);
          const tX = margin + Math.random() * availW;
          const tY = margin + Math.random() * availH;
          scatterMap.set(chip, {
            x: tX - nx,
            y: tY - ny,
            rot: (Math.random() - 0.5) * 140, // -70° a 70°
            scale: 0.88 + Math.random() * 0.18,
          });
        });
      };
      computeScatter();

      // Pré-estado: chips invisíveis, espalhados, rotacionados.
      // Cards/dots/títulos/status permanecem visíveis (sem boot prévio).
      gsap.set(chipEls, {
        opacity: 0,
        x:        (i, t) => scatterMap.get(t)?.x ?? 0,
        y:        (i, t) => scatterMap.get(t)?.y ?? 0,
        rotation: (i, t) => scatterMap.get(t)?.rot ?? 0,
        scale:    (i, t) => scatterMap.get(t)?.scale ?? 1,
        transformOrigin: "center center",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          once: true,
          invalidateOnRefresh: true,
          onRefresh: computeScatter,
        },
      });

      // 1) Materializa scattered (caos)
      tl.to(chipEls, {
        opacity: 1,
        duration: 0.42,
        stagger: { each: 0.012, from: "random" },
        ease: "power2.out",
      });

      // 2) Hold curto pro caos ser percebido
      tl.addLabel("snap", "+=0.32");

      // 3) SNAP — chips voam magneticamente para a posição correta
      tl.to(chipEls, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 0.95,
        ease: "back.out(1.5)",
        stagger: { each: 0.018, from: "random" },
        onComplete: attach3DRefinement,
      }, "snap");

      // ---------- REFINAMENTO: 3D depth + chip lift (após snap) ----------
      function attach3DRefinement() {
        const isCoarse = window.matchMedia("(pointer: coarse)").matches;
        if (isCoarse) return; // touch: sem tilt parallax

        // Tilt 3D dos cards seguindo o cursor sobre a grid
        const onMove = (e) => {
          const r = grid.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width  - 0.5; // -0.5 .. 0.5
          const py = (e.clientY - r.top)  / r.height - 0.5;
          const maxTilt = 4; // graus
          groupEls.forEach((g) => {
            gsap.to(g, {
              rotateX: -py * maxTilt,
              rotateY:  px * maxTilt,
              duration: 0.6,
              ease: "power2.out",
              overwrite: "auto",
            });
          });
        };
        const onLeave = () => {
          groupEls.forEach((g) => {
            gsap.to(g, {
              rotateX: 0,
              rotateY: 0,
              duration: 0.8,
              ease: "power3.out",
              overwrite: "auto",
            });
          });
        };
        grid.addEventListener("mousemove", onMove);
        grid.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          grid.removeEventListener("mousemove", onMove);
          grid.removeEventListener("mouseleave", onLeave);
        });

        // Chip lift on hover/focus — translateZ + scale (transformação 3D)
        chipEls.forEach((chip) => {
          const lift = () => {
            gsap.to(chip, {
              z: 18,
              scale: 1.06,
              duration: 0.28,
              ease: "power3.out",
              overwrite: "auto",
            });
            chip.classList.add("is-lifted");
          };
          const drop = () => {
            gsap.to(chip, {
              z: 0,
              scale: 1,
              duration: 0.4,
              ease: "power3.out",
              overwrite: "auto",
            });
            chip.classList.remove("is-lifted");
          };
          chip.addEventListener("mouseenter", lift);
          chip.addEventListener("mouseleave", drop);
          chip.addEventListener("focus", lift);
          chip.addEventListener("blur", drop);
          cleanups.push(() => {
            chip.removeEventListener("mouseenter", lift);
            chip.removeEventListener("mouseleave", drop);
            chip.removeEventListener("focus", lift);
            chip.removeEventListener("blur", drop);
          });
        });
      }
    }, el);

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="rs-section rs-stack" id="stack">
      <div className="rs-container">
        <SectionHeader
          n="08"
          eyebrow="STACK"
          title={<>Stack conectado<br/>à <span className="rs-italic rs-ember">operação real</span>.</>}
          kicker="Ferramentas usadas para construir, medir, automatizar e melhorar lojas Shopify com mais clareza comercial."
        />
        <div className="rs-stack-grid" ref={gridRef}>
          {groups.map((g) => (
            <div key={g.title} className={`rs-stack-group rs-${g.accent}`}>
              <CornerTicks color={g.accent === "ember" ? "var(--ember-500)" : "var(--cyan-400)"} />
              <div className="rs-stack-head">
                <span className={`rs-stack-dot rs-icon-${g.accent}`} />
                <span className="rs-stack-title">{g.title}</span>
                <span className="rs-stack-status" aria-hidden="true">
                  <span className="rs-stack-status-dot" />ONLINE
                </span>
              </div>
              <div className="rs-stack-items">
                {g.items.map(it => <span key={it} className="rs-stack-chip">{it}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------- FINAL CTA ----------
const FinalCTA = () => (
  <section className="rs-section rs-cta" id="contato">
    <div className="rs-container rs-cta-inner reveal" data-reveal>
      <div className="rs-cta-glow" />
      <svg className="rs-cta-lines" viewBox="0 0 1200 400" preserveAspectRatio="none">
        <defs>
          <radialGradient id="cta-glow" cx="50%" cy="50%">
            <stop offset="0%" stopColor="rgba(149,242,15,0.15)" />
            <stop offset="60%" stopColor="rgba(149,242,15,0.035)" />
            <stop offset="100%" stopColor="rgba(149,242,15,0)" />
          </radialGradient>
        </defs>
        <ellipse cx="600" cy="200" rx="500" ry="200" fill="url(#cta-glow)" />
        {[0, 1, 2, 3, 4, 5].map(i => {
          const x1 = 100 + i * 200;
          return (
            <line key={i} x1={x1} y1="0" x2="600" y2="200"
                  stroke="rgba(149,242,15,0.15)" strokeWidth="1"
                  strokeDasharray="2 6"
                  style={{ animation: `tt-flow ${3 + i * 0.4}s linear infinite` }} />
          );
        })}
        {[0, 1, 2, 3, 4, 5].map(i => {
          const x1 = 100 + i * 200;
          return (
            <line key={`b-${i}`} x1={x1} y1="400" x2="600" y2="200"
                  stroke="rgba(94,200,255,0.12)" strokeWidth="1"
                  strokeDasharray="2 6"
                  style={{ animation: `tt-flow ${3.4 + i * 0.4}s linear infinite reverse` }} />
          );
        })}
      </svg>

      <span className="rs-section-eyebrow rs-cta-eyebrow">
        <span className="rs-section-num">[09]</span>
        <span className="rs-section-line" />
        <span>CONVERSAR SOBRE UM PROJETO</span>
      </span>

      <h2 className="rs-cta-title">
        Vamos construir sua próxima<br/>
        loja <span className="rs-shopify-green">Shopify</span>
      </h2>

      <p className="rs-cta-sub">
        Lojas, product pages e landing pages em Shopify com design, dados e
        operação trabalhando juntos para melhorar clareza, experiência de
        compra e decisão.
      </p>

      <div className="rs-cta-buttons">
        <a className="rs-btn rs-btn-primary rs-btn-lg" href="https://wa.me/5548999255795?text=Ol%C3%A1%20Rafael!%20Vim%20pelo%20seu%20site%20e%20queria%20conversar%20sobre%20um%20projeto." target="_blank" rel="noopener noreferrer">
          Conversar sobre um projeto <ArrowRight />
        </a>
        <a className="rs-btn rs-btn-ghost rs-btn-lg" href="https://www.linkedin.com/in/rafaelsilva90/" target="_blank" rel="noopener noreferrer">
          Ver LinkedIn <ArrowRight />
        </a>
      </div>

      <div className="rs-cta-meta">
        <span><span className="tt-pulse-dot" />ABERTO A NOVOS PROJETOS</span>
        <span>·</span>
        <span>REMOTO</span>
        <span>·</span>
        <span>RETORNO EM ATÉ 48H</span>
      </div>
    </div>

    <footer className="rs-footer">
      <div className="rs-container rs-footer-row">
        <div className="rs-footer-left">
          <div className="rs-footer-brand">
            <div>
              <img className="rs-footer-logo-mark" src="/assets/logo1.png" alt="Rafael Shopify.dev" />
              <div className="rs-footer-sub">SHOPIFY DEVELOPER · EXPERIÊNCIA COMERCIAL · OPERAÇÃO</div>
            </div>
          </div>
        </div>
        <div className="rs-footer-mid">© 2026 · Lojas Shopify com mais clareza comercial, estrutura e operação conectada.</div>
        <div className="rs-footer-right" aria-hidden="true"></div>
      </div>
    </footer>
  </section>
);

Object.assign(window, {
  DashSection, DashboardWidget, MiniLine, MiniFunnel, MiniDonut,
  Projects, About, Timeline, Stack, FinalCTA,
});
