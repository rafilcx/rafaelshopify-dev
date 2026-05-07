// ============================================================
// SYSTEMS MAP SECTION — Operational flow horizontal map
// Shopify → Dados → IA → Dashboard → Criativos → Decisão
// ============================================================

const SystemsMapSection = () => {
  const flow = [
    { id: "01", label: "SHOPIFY",   sub: "Loja, produto e\npáginas comerciais.",          icon: I.shopify, accent: "ember" },
    { id: "02", label: "DADOS",     sub: "Eventos, métricas e\nfontes conectadas.",       icon: I.data,    accent: "cyan" },
    { id: "03", label: "IA",        sub: "Análise, copy, docs e\napoio criativo.",        icon: I.ai,      accent: "cyan",  live: true },
    { id: "04", label: "DASHBOARD", sub: "Leitura clara para\ndecisão comercial.",        icon: I.chart,   accent: "cyan",  live: true },
    { id: "05", label: "CRIATIVOS", sub: "Ideias, testes e\naprendizados.",               icon: I.spark,   accent: "ember" },
    { id: "06", label: "DECISÃO",   sub: "Próximos passos com\nmenos achismo.",           icon: I.bolt,    accent: "ember", live: true },
  ];

  return (
    <div className="tt tt-stage" style={{
      width: 1440, height: 900,
      padding: "80px 64px 64px",
      display: "flex", flexDirection: "column",
    }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 48 }}>
        <TTSectionHeader
          index="04"
          label="OPERATIONAL FLOW"
          title={<>Da loja à decisão:<br/><span style={{ fontStyle: "italic", color: "var(--ember-500)" }}>tudo conectado.</span></>}
          kicker="O objetivo não é criar peças isoladas. É conectar loja, dados, criação e operação em um fluxo mais claro, mensurável e escalável."
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end", minWidth: 220 }}>
          <TTBadge tone="live">SISTEMA EM EXECUÇÃO</TTBadge>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-400)", letterSpacing: "0.14em" }}>
            06 NÓS · 5 CONEXÕES · 1 OPERAÇÃO
          </div>
        </div>
      </div>

      {/* Flow rail */}
      <div style={{ marginTop: 88, position: "relative", flex: 1 }}>
        {/* Horizontal connection line behind nodes */}
        <svg viewBox="0 0 1312 260" width="100%" height={260}
             style={{ position: "absolute", top: 22, left: 0, pointerEvents: "none" }}
             preserveAspectRatio="none">
          <defs>
            <linearGradient id="flow-rail" x1="0%" x2="100%">
              <stop offset="0%"  stopColor="rgba(149,242,15,0.5)" />
              <stop offset="35%" stopColor="rgba(94,200,255,0.6)" />
              <stop offset="70%" stopColor="rgba(94,200,255,0.6)" />
              <stop offset="100%" stopColor="rgba(149,242,15,0.5)" />
            </linearGradient>
          </defs>
          {/* base rule */}
          <line x1="60" y1="60" x2="1252" y2="60"
                stroke="var(--rule-300)" strokeWidth="1" />
          {/* glowing pulse layer */}
          <line x1="60" y1="60" x2="1252" y2="60"
                stroke="url(#flow-rail)" strokeWidth="1.5"
                strokeDasharray="4 10"
                style={{ animation: "tt-flow 3s linear infinite" }} />
          {/* node anchor squares */}
          {flow.map((_, i) => {
            const x = 60 + i * (1192 / 5);
            return <rect key={i} x={x - 4} y={56} width={8} height={8}
                          fill="var(--ink-100)" stroke="var(--rule-400)" />;
          })}
        </svg>

        {/* Nodes row */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(6, 1fr)",
          gap: 0, alignItems: "start",
        }}>
          {flow.map((n, i) => (
            <div key={n.id} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
              animation: `tt-tick 600ms var(--ease-out) backwards`,
              animationDelay: `${i * 80}ms`,
            }}>
              {/* Index above */}
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10,
                             color: "var(--fg-400)", letterSpacing: "0.16em" }}>
                [{n.id}]
              </div>

              {/* Node */}
              <div style={{
                width: 92, height: 92,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(16, 23, 42, 0.85)",
                boxShadow: `inset 0 0 0 1px var(--rule-400),
                            0 0 30px ${n.accent === "ember" ? "var(--ember-glow)" : "var(--cyan-glow)"}`,
                backdropFilter: "blur(8px)",
                position: "relative",
                marginTop: 4,
                color: n.accent === "ember" ? "var(--ember-500)" : "var(--cyan-400)",
              }}>
                <CornerTicks />
                <span style={{ transform: "scale(1.4)" }}>{n.icon}</span>
                {n.live && (
                  <span className="tt-pulse-dot" style={{ position: "absolute", top: 8, right: 8, width: 6, height: 6 }} />
                )}
              </div>

              {/* Label + sublabel */}
              <div style={{ textAlign: "center", maxWidth: 170, marginTop: 12 }}>
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: 12,
                  letterSpacing: "0.14em", color: "var(--fg-100)",
                }}>{n.label}</div>
                <div style={{
                  fontFamily: "var(--font-sans)", fontSize: 13,
                  color: "var(--fg-400)", marginTop: 8, lineHeight: 1.4,
                  whiteSpace: "pre-line",
                }}>{n.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom strip — system inputs/outputs annotation */}
        <div style={{
          marginTop: 80,
          display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 32,
          alignItems: "center",
          padding: "20px 24px",
          background: "rgba(255,255,255,0.02)",
          boxShadow: "inset 0 0 0 1px var(--rule-200)",
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10,
                           color: "var(--fg-400)", letterSpacing: "0.16em" }}>INPUT</div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--fg-200)" }}>
              Operação dispersa · ferramentas isoladas · decisões por achismo
            </div>
          </div>
          <div style={{ color: "var(--ember-500)", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 32, height: 1, background: "var(--ember-500)" }} />
            {I.arrow}
            <span style={{ width: 32, height: 1, background: "var(--ember-500)" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, textAlign: "right" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10,
                           color: "var(--ember-500)", letterSpacing: "0.16em" }}>OUTPUT</div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--fg-100)" }}>
              Sistema operacional · leitura clara · ação mensurável
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

window.SystemsMapSection = SystemsMapSection;
