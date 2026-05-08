// ============================================================
// CASE STUDY SECTION — Dashboard preview ("Dashboard Agência")
// Editorial copy on left, animated dashboard mockup on right
// All data is fake / illustrative only.
// ============================================================

const CaseStudySection = () => {
  return (
    <div className="tt tt-stage" style={{
      width: 1440, height: 900,
      padding: "72px 56px",
      display: "flex",
      gap: 48,
      alignItems: "stretch",
    }}>
      {/* LEFT — case study editorial */}
      <div style={{ width: 460, flex: "0 0 460px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11,
                           color: "var(--ember-500)", letterSpacing: "0.16em" }}>
              [05] · CASE
            </span>
            <span className="tt-eyebrow" style={{ color: "var(--fg-300)" }}>
              DASHBOARD · DATA SYSTEMS
            </span>
          </div>

          <h2 style={{
            fontFamily: "var(--font-serif)", fontWeight: 400,
            fontSize: 56, lineHeight: 1.02,
            letterSpacing: "-0.02em",
          }}>
            Menos dados espalhados.<br/>
            <span style={{ fontStyle: "italic", color: "var(--ember-500)" }}>Mais decisão</span> para vender melhor.
          </h2>

          <p style={{
            fontFamily: "var(--font-sans)", fontSize: 16, lineHeight: 1.55,
            color: "var(--fg-300)", maxWidth: 460, textWrap: "pretty",
          }}>
            Dashboards para transformar
            <span style={{ color: "var(--fg-100)" }}> Shopify, GA4, dados de Meta, RD Station,
            Supabase e Sheets</span> em uma visão única de performance, produtos,
            canais e prioridades.
          </p>

          {/* Problem / System / Outcome strip */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0,
                         marginTop: 8,
                         boxShadow: "inset 0 0 0 1px var(--rule-200)" }}>
            {[
              { k: "PROBLEMA", v: "Métricas espalhadas em várias ferramentas, sem uma leitura comercial clara." },
              { k: "SISTEMA",  v: "Dashboard executivo com KPIs, produtos, canais e funil em uma visão única." },
              { k: "VALOR",    v: "Decisões mais rápidas sobre loja, produto, campanha e prioridade operacional." },
            ].map((row, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "120px 1fr",
                gap: 16, padding: "14px 18px",
                borderTop: i ? "1px solid var(--rule-200)" : "none",
              }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10,
                               color: "var(--ember-500)", letterSpacing: "0.16em" }}>
                  {row.k}
                </div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--fg-200)" }}>
                  {row.v}
                </div>
              </div>
            ))}
          </div>

          {/* Stack tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
            {["Shopify", "GA4", "RD Station", "Supabase", "Sheets", "Dashboards"].map(t => (
              <TTBadge key={t} tone="default">{t}</TTBadge>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 32 }}>
          <TTButton variant="ghost">Ver detalhes</TTButton>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11,
                         color: "var(--fg-400)", letterSpacing: "0.14em" }}>
            01 / 04 PROJETOS
          </span>
        </div>
      </div>

      {/* RIGHT — Dashboard preview */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <DashboardPreview />
      </div>
    </div>
  );
};

const DashboardPreview = () => {
  return (
    <div style={{
      position: "relative",
      background: "linear-gradient(180deg, rgba(16,23,42,0.85), rgba(11,16,32,0.95))",
      boxShadow: "inset 0 0 0 1px var(--rule-300), 0 40px 120px rgba(0,0,0,0.6)",
      backdropFilter: "blur(14px)",
      padding: 22,
      display: "flex", flexDirection: "column", gap: 14,
      borderRadius: "var(--r-3)",
    }}>
      <CornerTicks />

      {/* Dashboard chrome */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, whiteSpace: "nowrap" }}>
          <span style={{ fontFamily: "var(--font-serif)", fontSize: 18, color: "var(--fg-100)" }}>
            Dashboard Executivo
          </span>
          <span className="tt-pulse-dot" style={{ width: 6, height: 6, flex: "0 0 auto" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap",
                       fontFamily: "var(--font-mono)", fontSize: 10,
                       letterSpacing: "0.14em", color: "var(--fg-300)" }}>
          <span style={{ color: "var(--fg-400)" }}>PERÍODO</span>
          <span style={{ padding: "4px 10px",
                         boxShadow: "inset 0 0 0 1px var(--rule-300)",
                         color: "var(--fg-100)" }}>
            30 DIAS ▾
          </span>
        </div>
      </div>

      {/* KPI row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
        {[
          { label: "RECEITA",      value: "R$ 1,268M", delta: "+18.6%" },
          { label: "PEDIDOS",      value: "24.382",     delta: "+14.2%" },
          { label: "CONVERSÃO",    value: "2,81%",      delta: "+12.7%" },
          { label: "TICKET MÉDIO", value: "R$ 198,40",  delta: "+9.3%"  },
        ].map((kpi, i) => (
          <div key={i} style={{
            padding: "14px 16px",
            background: "rgba(255,255,255,0.02)",
            boxShadow: "inset 0 0 0 1px var(--rule-200)",
            display: "flex", flexDirection: "column", gap: 6,
            position: "relative", minWidth: 0,
          }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 9,
                           letterSpacing: "0.12em", color: "var(--fg-400)",
                           whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {kpi.label}
            </div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 22,
                           lineHeight: 1, color: "var(--fg-100)", letterSpacing: "-0.01em",
                           whiteSpace: "nowrap" }}>
              {kpi.value}
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10,
                           color: "var(--status-live)" }}>
              ▲ {kpi.delta}
            </div>
            <div style={{ position: "absolute", top: 0, left: 0, height: 1, width: 24,
                           background: "var(--ember-500)" }} />
          </div>
        ))}
      </div>

      {/* Chart row */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 10 }}>
        {/* Revenue line chart */}
        <div style={{ padding: "12px 14px",
                       background: "rgba(255,255,255,0.02)",
                       boxShadow: "inset 0 0 0 1px var(--rule-200)",
                       display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10,
                           letterSpacing: "0.14em", color: "var(--fg-300)" }}>
              EVOLUÇÃO DA RECEITA
            </div>
            <div style={{ display: "flex", gap: 12, fontFamily: "var(--font-mono)", fontSize: 9,
                           color: "var(--fg-400)" }}>
              <span><span style={{ color: "var(--cyan-400)" }}>●</span> RECEITA</span>
              <span><span style={{ color: "var(--ember-500)" }}>●</span> META</span>
            </div>
          </div>
          <LineChart />
        </div>

        {/* Funnel */}
        <div style={{ padding: "12px 14px",
                       background: "rgba(255,255,255,0.02)",
                       boxShadow: "inset 0 0 0 1px var(--rule-200)",
                       display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10,
                         letterSpacing: "0.14em", color: "var(--fg-300)" }}>
            FUNIL DE CONVERSÃO
          </div>
          <Funnel />
        </div>
      </div>

      {/* Bottom row — products + channels */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div style={{ padding: "12px 14px",
                       background: "rgba(255,255,255,0.02)",
                       boxShadow: "inset 0 0 0 1px var(--rule-200)",
                       display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10,
                         letterSpacing: "0.14em", color: "var(--fg-300)" }}>
            PRODUTOS EM DESTAQUE
          </div>
          {[
            { n: "Produto Alpha", v: "R$ 342.870", w: 100 },
            { n: "Produto Beta",  v: "R$ 278.450", w: 78 },
            { n: "Produto Gamma", v: "R$ 188.230", w: 54 },
            { n: "Produto Delta", v: "R$ 112.430", w: 32 },
          ].map((p, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12,
                             fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-200)",
                             whiteSpace: "nowrap" }}>
                <span>{p.n}</span>
                <span style={{ color: "var(--fg-400)" }}>{p.v}</span>
              </div>
              <div style={{ height: 3, background: "rgba(255,255,255,0.05)", position: "relative" }}>
                <div style={{
                  position: "absolute", left: 0, top: 0, bottom: 0,
                  width: `${p.w}%`,
                  background: i === 0 ? "var(--ember-500)" : "var(--cyan-500)",
                  boxShadow: i === 0 ? "0 0 8px var(--ember-glow)" : "0 0 6px var(--cyan-glow)",
                }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ padding: "12px 14px",
                       background: "rgba(255,255,255,0.02)",
                       boxShadow: "inset 0 0 0 1px var(--rule-200)",
                       display: "grid", gridTemplateColumns: "auto 1fr", gap: 14, alignItems: "center" }}>
          <DonutChart />
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10,
                           letterSpacing: "0.14em", color: "var(--fg-300)", marginBottom: 4 }}>
              CANAIS DE AQUISIÇÃO
            </div>
            {[
              { c: "Paid Ads", p: "48%", color: "var(--ember-500)" },
              { c: "Orgânico", p: "28%", color: "var(--cyan-400)" },
              { c: "Direto",   p: "14%", color: "var(--cyan-600)" },
              { c: "Email",    p: "7%",  color: "var(--status-live)" },
              { c: "Outros",   p: "3%",  color: "var(--fg-400)" },
            ].map((ch, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
                                     fontFamily: "var(--font-mono)", fontSize: 10 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--fg-200)" }}>
                  <span style={{ width: 6, height: 6, background: ch.color, borderRadius: "50%" }} />
                  {ch.c}
                </span>
                <span style={{ color: "var(--fg-400)" }}>{ch.p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ---- mini charts ----
const LineChart = () => {
  // 12 fake points trending up
  const pts = [22, 28, 24, 32, 38, 35, 44, 50, 47, 56, 63, 70];
  const max = 80, min = 0;
  const W = 460, H = 130;
  const step = W / (pts.length - 1);
  const path = pts.map((p, i) => {
    const x = i * step;
    const y = H - ((p - min) / (max - min)) * H;
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
  const area = `${path} L${W} ${H} L0 ${H} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} preserveAspectRatio="none">
      <defs>
        <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(94,200,255,0.35)" />
          <stop offset="100%" stopColor="rgba(94,200,255,0)" />
        </linearGradient>
      </defs>
      {/* grid */}
      {[0, 0.33, 0.66, 1].map((g, i) => (
        <line key={i} x1="0" y1={H * g} x2={W} y2={H * g}
              stroke="var(--rule-200)" strokeDasharray="2 4" />
      ))}
      <path d={area} fill="url(#chart-fill)" />
      <path d={path} fill="none" stroke="var(--cyan-400)" strokeWidth="1.5"
            style={{ filter: "drop-shadow(0 0 4px rgba(94,200,255,0.6))" }} />
      {/* meta dashed line */}
      <line x1="0" y1={H * 0.35} x2={W} y2={H * 0.35}
            stroke="var(--ember-500)" strokeWidth="1" strokeDasharray="4 6" opacity="0.6" />
      {/* live dot */}
      <circle cx={W} cy={H - ((70 - min) / (max - min)) * H} r="3" fill="var(--cyan-300)">
        <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
      </circle>
      {/* x labels */}
      {["01/05", "08/05", "15/05", "22/05", "29/05"].map((l, i) => (
        <text key={i} x={i * (W / 4)} y={H - 2}
              fontFamily="ui-monospace" fontSize="8" fill="var(--fg-500)">{l}</text>
      ))}
    </svg>
  );
};

const Funnel = () => {
  const rows = [
    { l: "Sessões",  v: "356.214", w: 100 },
    { l: "Produto",  v: "82.476",  w: 78 },
    { l: "Carrinho", v: "18.742",  w: 52 },
    { l: "Checkout", v: "6.231",   w: 32 },
    { l: "Pedidos",  v: "4.892",   w: 22 },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
      {rows.map((r, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 60, fontFamily: "var(--font-mono)", fontSize: 9,
                          color: "var(--fg-400)", letterSpacing: "0.1em", textAlign: "right" }}>
            {r.l.toUpperCase()}
          </span>
          <div style={{ flex: 1, height: 18, position: "relative",
                         background: "rgba(255,255,255,0.03)" }}>
            <div style={{
              position: "absolute", left: 0, top: 0, bottom: 0,
              width: `${r.w}%`,
              background: `linear-gradient(90deg, var(--cyan-600), var(--cyan-400))`,
              boxShadow: "0 0 8px var(--cyan-glow)",
              clipPath: i < rows.length - 1
                ? `polygon(0 0, 100% 0, calc(100% - 6px) 100%, 0 100%)`
                : "none",
            }} />
            <span style={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)",
                            fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-100)" }}>
              {r.v}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

const DonutChart = () => {
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
    <svg width="110" height="110" viewBox="0 0 100 100">
      <circle cx={c} cy={c} r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="10" />
      {segs.map((s, i) => {
        const dash = s.p * cir;
        const offset = -acc * cir;
        acc += s.p;
        return (
          <circle key={i} cx={c} cy={c} r={r} fill="none"
                  stroke={s.color} strokeWidth="10"
                  strokeDasharray={`${dash} ${cir - dash}`}
                  strokeDashoffset={offset}
                  transform={`rotate(-90 ${c} ${c})`} />
        );
      })}
      <text x={c} y={c - 2} textAnchor="middle"
            fontFamily="var(--font-serif)" fontSize="14" fill="var(--fg-100)">100%</text>
      <text x={c} y={c + 10} textAnchor="middle"
            fontFamily="ui-monospace" fontSize="6" fill="var(--fg-400)" letterSpacing="0.1em">CHANNELS</text>
    </svg>
  );
};

window.CaseStudySection = CaseStudySection;
