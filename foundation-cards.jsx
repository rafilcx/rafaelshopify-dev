// ============================================================
// FOUNDATION CARDS — token + component documentation artboards
// ============================================================

// ---- COVER ----
const FoundationCover = () => (
  <div className="tt tt-stage tt-stage--lit" style={{ width: 1200, height: 760, padding: 64,
                                                       display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 36, height: 36,
                       background: "linear-gradient(135deg, var(--ember-500), var(--ember-700))",
                       display: "flex", alignItems: "center", justifyContent: "center",
                       fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 20,
                       color: "#0a0a0a", borderRadius: "var(--r-2)",
                       boxShadow: "0 0 24px var(--ember-glow)" }}>R</div>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", color: "var(--fg-300)" }}>
            TITTANIUM · DESIGN SYSTEM
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", color: "var(--fg-500)" }}>
            v1.0 · 2026
          </div>
        </div>
      </div>
      <TTBadge tone="live">SISTEMA OPERACIONAL</TTBadge>
    </div>

    <div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ember-500)",
                     letterSpacing: "0.18em", marginBottom: 28 }}>
        [00] · OPERATING SYSTEM FOR E-COMMERCE
      </div>
      <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 400,
                    fontSize: 124, lineHeight: 0.92, letterSpacing: "-0.03em" }}>
        Rafael <span style={{ fontStyle: "italic", color: "var(--ember-500)" }}>Silva</span><br/>
        <span style={{ color: "var(--fg-300)" }}>builder of</span> systems.
      </h1>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: 18,
                   color: "var(--fg-300)", maxWidth: 640, marginTop: 32, lineHeight: 1.5 }}>
        Linguagem visual para uma operação onde <span style={{ color: "var(--fg-100)" }}>Shopify</span>,
        <span style={{ color: "var(--fg-100)" }}> dashboards</span>,
        <span style={{ color: "var(--fg-100)" }}> dados</span>,
        <span style={{ color: "var(--fg-100)" }}> IA</span> e
        <span style={{ color: "var(--fg-100)" }}> creative performance</span> se comportam
        como um único sistema operacional — não como peças soltas.
      </p>
    </div>

    <div style={{ display: "flex", gap: 32, fontFamily: "var(--font-mono)", fontSize: 11,
                   letterSpacing: "0.14em", color: "var(--fg-400)",
                   borderTop: "1px solid var(--rule-200)", paddingTop: 20 }}>
      <span>3 PRINCÍPIOS</span><span>·</span>
      <span>2 TIPOGRAFIAS</span><span>·</span>
      <span>1 ACENTO EMBER</span><span>·</span>
      <span>1 CYAN DATA</span><span>·</span>
      <span style={{ color: "var(--ember-500)", marginLeft: "auto" }}>STRATEGIC · TECHNICAL · RESTLESS</span>
    </div>
  </div>
);

// ---- COLOR ----
const ColorSystem = () => {
  const swatches = [
    { group: "INK", items: [
      { n: "ink/000", v: "#05070D" },
      { n: "ink/050", v: "#080B14" },
      { n: "ink/100", v: "#0B1020" },
      { n: "ink/200", v: "#10172A" },
      { n: "ink/300", v: "#161E34" },
      { n: "ink/400", v: "#1F2A44" },
    ]},
    { group: "FOREGROUND", items: [
      { n: "fg/100", v: "#F5F5F4" },
      { n: "fg/200", v: "#D6D4CF" },
      { n: "fg/300", v: "#9A9893" },
      { n: "fg/400", v: "#6B6964" },
      { n: "fg/500", v: "#4A4844" },
    ]},
    { group: "EMBER · TITTANIUM ENERGY", items: [
      { n: "ember/300", v: "#FFB392" },
      { n: "ember/400", v: "#FF8A5C" },
      { n: "ember/500", v: "#FF6B3A", primary: true },
      { n: "ember/600", v: "#E85420" },
      { n: "ember/700", v: "#B53D12" },
    ]},
    { group: "CYAN · DATA / AI", items: [
      { n: "cyan/300", v: "#A5E8FF" },
      { n: "cyan/400", v: "#5EC8FF", primary: true },
      { n: "cyan/500", v: "#2EA7E8" },
      { n: "cyan/600", v: "#1C7FAB" },
    ]},
    { group: "STATUS", items: [
      { n: "live", v: "#4ADE80" },
      { n: "warn", v: "#FACC15" },
      { n: "err",  v: "#EF4444" },
      { n: "idle", v: "#6B6964" },
    ]},
  ];
  return (
    <div className="tt tt-stage" style={{ width: 1200, height: 760, padding: 56,
                                            display: "flex", flexDirection: "column", gap: 32 }}>
      <TTSectionHeader index="01" label="COLOR" title="Palette"
        kicker="Base escura levemente azulada. Ember conduz energia e ação. Cyan carrega dados, IA e fluxo. O resto é silêncio." />
      <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 8 }}>
        {swatches.map(g => (
          <div key={g.group} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div className="tt-eyebrow" style={{ color: "var(--fg-400)" }}>{g.group}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10 }}>
              {g.items.map(s => (
                <div key={s.n} style={{
                  display: "flex", flexDirection: "column", gap: 8,
                  padding: 12, position: "relative",
                  background: "rgba(255,255,255,0.015)",
                  boxShadow: s.primary
                    ? "inset 0 0 0 1px var(--rule-400), 0 0 24px " + (s.v.toLowerCase().includes("ff6b") ? "var(--ember-glow)" : "var(--cyan-glow)")
                    : "inset 0 0 0 1px var(--rule-200)",
                }}>
                  {s.primary && <CornerTicks />}
                  <div style={{ height: 40, background: s.v,
                                 boxShadow: "inset 0 0 0 1px var(--rule-200)" }} />
                  <div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-100)" }}>{s.n}</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-400)" }}>{s.v}</div>
                  </div>
                  {s.primary && (
                    <div style={{ position: "absolute", top: 6, right: 8, fontFamily: "var(--font-mono)", fontSize: 9,
                                   color: "var(--ember-500)", letterSpacing: "0.14em" }}>★ PRIMARY</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ---- TYPE ----
const TypeSystem = () => (
  <div className="tt tt-stage" style={{ width: 1200, height: 760, padding: 56,
                                          display: "flex", flexDirection: "column", gap: 28 }}>
    <TTSectionHeader index="02" label="TYPOGRAPHY" title="Editorial serif × system mono"
      kicker="Serif para presença e voz humana. Mono para sinais técnicos: rótulos, métricas, ids, comandos. Sans só para corpo neutro." />

    {/* Display */}
    <div style={{ display: "grid", gridTemplateColumns: "120px 1fr auto", gap: 32, alignItems: "baseline",
                   borderTop: "1px solid var(--rule-200)", paddingTop: 24 }}>
      <div className="tt-mono" style={{ color: "var(--ember-500)" }}>DISPLAY/SERIF</div>
      <div style={{ fontFamily: "var(--font-serif)", fontSize: 96, lineHeight: 0.95,
                     letterSpacing: "-0.025em" }}>
        Rafael <span style={{ fontStyle: "italic", color: "var(--ember-500)" }}>Silva</span>
      </div>
      <div className="tt-mono" style={{ color: "var(--fg-400)" }}>96 / 0.95 / -0.025em</div>
    </div>

    {/* H2 */}
    <div style={{ display: "grid", gridTemplateColumns: "120px 1fr auto", gap: 32, alignItems: "baseline",
                   borderTop: "1px solid var(--rule-200)", paddingTop: 20 }}>
      <div className="tt-mono" style={{ color: "var(--ember-500)" }}>H2/SERIF</div>
      <div style={{ fontFamily: "var(--font-serif)", fontSize: 56, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
        Da loja à decisão, <span style={{ fontStyle: "italic" }}>tudo conectado</span>.
      </div>
      <div className="tt-mono" style={{ color: "var(--fg-400)" }}>56 / 1.05 / -0.02em</div>
    </div>

    {/* H3 */}
    <div style={{ display: "grid", gridTemplateColumns: "120px 1fr auto", gap: 32, alignItems: "baseline",
                   borderTop: "1px solid var(--rule-200)", paddingTop: 20 }}>
      <div className="tt-mono" style={{ color: "var(--ember-500)" }}>H3/SERIF</div>
      <div style={{ fontFamily: "var(--font-serif)", fontSize: 32, lineHeight: 1.15 }}>
        Sistema operacional para e-commerce.
      </div>
      <div className="tt-mono" style={{ color: "var(--fg-400)" }}>32 / 1.15</div>
    </div>

    {/* Body */}
    <div style={{ display: "grid", gridTemplateColumns: "120px 1fr auto", gap: 32, alignItems: "baseline",
                   borderTop: "1px solid var(--rule-200)", paddingTop: 20 }}>
      <div className="tt-mono" style={{ color: "var(--cyan-400)" }}>BODY/SANS</div>
      <div style={{ fontFamily: "var(--font-sans)", fontSize: 17, color: "var(--fg-300)", lineHeight: 1.55, maxWidth: 620 }}>
        Construo sistemas digitais para e-commerces que precisam conectar
        loja, dados, automações, dashboards e creative performance em uma
        operação mais inteligente.
      </div>
      <div className="tt-mono" style={{ color: "var(--fg-400)" }}>17 / 1.55</div>
    </div>

    {/* Mono */}
    <div style={{ display: "grid", gridTemplateColumns: "120px 1fr auto", gap: 32, alignItems: "baseline",
                   borderTop: "1px solid var(--rule-200)", paddingTop: 20 }}>
      <div className="tt-mono" style={{ color: "var(--cyan-400)" }}>LABEL/MONO</div>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
        <span className="tt-eyebrow">[01] · OPERATIONAL FLOW</span>
        <span className="tt-eyebrow">SHOPIFY · ECOSSISTEMA</span>
        <span className="tt-eyebrow">RECEITA / 30D</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12,
                        color: "var(--ember-500)" }}>› rafael@tittanium ~ build</span>
      </div>
      <div className="tt-mono" style={{ color: "var(--fg-400)" }}>11 · 12 / 0.14em-0.18em</div>
    </div>

    {/* Signature */}
    <div style={{ display: "grid", gridTemplateColumns: "120px 1fr auto", gap: 32, alignItems: "baseline",
                   borderTop: "1px solid var(--rule-200)", paddingTop: 20 }}>
      <div className="tt-mono" style={{ color: "var(--ember-500)" }}>SIGNATURE</div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ width: 2, height: 32, background: "var(--ember-500)", boxShadow: "0 0 8px var(--ember-glow)" }} />
        <span style={{ fontFamily: '"Caveat", "Pinyon Script", cursive', fontSize: 28, color: "var(--fg-200)" }}>
          Rafael Silva
        </span>
      </div>
      <div className="tt-mono" style={{ color: "var(--fg-400)" }}>script · 28</div>
    </div>
  </div>
);

// ---- COMPONENTS ----
const ComponentsCard = () => (
  <div className="tt tt-stage" style={{ width: 1200, height: 760, padding: 56,
                                          display: "flex", flexDirection: "column", gap: 32 }}>
    <TTSectionHeader index="03" label="COMPONENTS" title="Atomic surfaces & controls"
      kicker="Cards técnicos com corner ticks. Botões com peso e glow. Badges para status, capacidade e dados. Métricas serif sobre rótulos mono." />

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
      {/* Buttons */}
      <TTCard padding="28px" label="BUTTONS">
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 18 }}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <TTButton variant="primary">Falar sobre projeto</TTButton>
            <TTButton variant="ghost">Ver sistemas</TTButton>
            <TTButton variant="glass">Ver detalhes</TTButton>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <TTButton variant="primary" size="lg">Vamos conversar</TTButton>
            <TTButton variant="ghost" size="lg">LinkedIn</TTButton>
          </div>
        </div>
      </TTCard>

      {/* Badges */}
      <TTCard padding="28px" label="BADGES">
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 18 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <TTBadge tone="live">DISPONÍVEL · Q2/26</TTBadge>
            <TTBadge tone="ember">SHOPIFY EXPERT</TTBadge>
            <TTBadge tone="cyan">AI AUTOMATION</TTBadge>
            <TTBadge tone="default">DASHBOARDS</TTBadge>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <TTBadge>Next.js</TTBadge>
            <TTBadge>Supabase</TTBadge>
            <TTBadge>GA4</TTBadge>
            <TTBadge>Liquid</TTBadge>
            <TTBadge>OpenAI</TTBadge>
          </div>
        </div>
      </TTCard>

      {/* Metric */}
      <TTCard padding="28px" label="METRIC" accent>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 18 }}>
          <TTMetric label="RECEITA / 30D"   value="R$ 1,268M" delta="+18.6%" sub="vs prev" />
          <TTMetric label="TAXA CONVERSÃO"  value="2,81"      unit="%"        delta="+12.7%" sub="vs prev" />
        </div>
      </TTCard>

      {/* Command rows */}
      <TTCard padding="28px" label="COMMAND">
        <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 4 }}>
          <TTCommandRow status="OK">init shopify-theme</TTCommandRow>
          <TTCommandRow status="RUNNING">connect ga4 + supabase</TTCommandRow>
          <TTCommandRow symbol="$" status="DONE">build dashboard.executive</TTCommandRow>
          <TTCommandRow symbol="✓" status="LIVE">deploy → vercel.app</TTCommandRow>
        </div>
      </TTCard>
    </div>
  </div>
);

// ---- PRINCIPLES ----
const Principles = () => (
  <div className="tt tt-stage" style={{ width: 1200, height: 760, padding: 56,
                                          display: "flex", flexDirection: "column", gap: 32 }}>
    <TTSectionHeader index="00" label="PRINCIPLES" title="Strategic. Technical. Restless."
      kicker="Três palavras que filtram cada decisão visual. Se não for estratégico, técnico ou inquieto — está fora." />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginTop: 12 }}>
      {[
        {
          n: "01", w: "STRATEGIC",
          desc: "Cada elemento serve a uma decisão. Hierarquia clara, CTAs visíveis, dados que apontam para ação. Nada decorativo.",
          accent: "ember",
        },
        {
          n: "02", w: "TECHNICAL",
          desc: "Linguagem de operação: corner ticks, mono labels, índices [01], status lights, traços precisos. O sistema mostra o sistema.",
          accent: "cyan",
        },
        {
          n: "03", w: "RESTLESS",
          desc: "Movimento contido mas constante. Pulsos em conexões, chips ao vivo, micro-tickagens. Nunca parado, nunca frenético.",
          accent: "ember",
        },
      ].map(p => (
        <TTCard key={p.n} padding="32px" accent>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, height: "100%" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: p.accent === "ember" ? "var(--ember-500)" : "var(--cyan-400)", letterSpacing: "0.18em" }}>
              [{p.n}]
            </div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 44, lineHeight: 1, letterSpacing: "-0.02em", fontStyle: "italic" }}>
              {p.w.toLowerCase()}.
            </div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--fg-300)", lineHeight: 1.55 }}>
              {p.desc}
            </p>
            <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 6, height: 6, background: p.accent === "ember" ? "var(--ember-500)" : "var(--cyan-400)" }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-400)", letterSpacing: "0.16em" }}>
                {p.accent === "ember" ? "ENERGY · ACTION" : "DATA · INTELLIGENCE"}
              </span>
            </div>
          </div>
        </TTCard>
      ))}
    </div>
  </div>
);

Object.assign(window, { FoundationCover, ColorSystem, TypeSystem, ComponentsCard, Principles });
