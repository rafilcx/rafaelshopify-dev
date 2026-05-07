// ============================================================
// HERO SECTION — Operator dashboard (1440×900)
// Left col: editorial copy + CTA + badges  (560px fixed)
// Right col: animated E-commerce OS visual (760px fixed)
// ============================================================

const HeroSection = () => {
  return (
    <div className="tt tt-stage tt-stage--lit" style={{
      width: 1440, height: 900,
      paddingTop: 88,
      position: "relative",
    }}>
      {/* TOP NAV */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        padding: "20px 56px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        borderBottom: "1px solid var(--rule-200)",
        zIndex: 3,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 28, height: 28,
            background: "linear-gradient(135deg, var(--ember-500), var(--ember-700))",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 16,
            color: "#0a0a0a", borderRadius: "var(--r-2)",
            boxShadow: "0 0 16px var(--ember-glow)",
          }}>R</div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.16em", color: "var(--fg-200)" }}>
            RAFAEL SILVA <span style={{ color: "var(--fg-400)" }}>· TITTANIUM</span>
          </span>
        </div>
        <div style={{ display: "flex", gap: 28, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", color: "var(--fg-300)" }}>
          <span>SISTEMAS</span>
          <span>PROJETOS</span>
          <span>STACK</span>
          <span>CONTATO</span>
        </div>
        <TTBadge tone="live">DISPONÍVEL · Q2/26</TTBadge>
      </div>

      {/* MAIN GRID — fixed widths to prevent reflow */}
      <div style={{
        display: "flex",
        padding: "32px 56px 56px",
        gap: 56,
        height: "100%",
        alignItems: "center",
      }}>
        {/* LEFT — copy column */}
        <div style={{ width: 560, flex: "0 0 560px", display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ember-500)", letterSpacing: "0.16em" }}>
              [01] · OPERATOR
            </span>
            <span style={{ flex: 1, height: 1, background: "var(--rule-200)" }} />
          </div>

          <h1 style={{
            fontFamily: "var(--font-serif)", fontWeight: 400,
            fontSize: 76, lineHeight: 0.98,
            letterSpacing: "-0.025em", color: "var(--fg-100)",
            whiteSpace: "nowrap",
          }}>
            Shopify, IA &<br/>
            <span style={{ fontStyle: "italic", color: "var(--ember-500)" }}>Sistemas</span> para<br/>
            E-commerce.
          </h1>

          <p style={{
            fontFamily: "var(--font-sans)", fontSize: 16, lineHeight: 1.55,
            color: "var(--fg-300)", maxWidth: 500,
            textWrap: "pretty",
          }}>
            Construo sistemas digitais para e-commerces que precisam conectar
            loja, dados, automações, dashboards e creative performance em uma
            operação <span style={{ color: "var(--fg-100)" }}>mais inteligente</span>.
          </p>

          <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
            <TTButton variant="primary" size="lg">Falar sobre um projeto</TTButton>
            <TTButton variant="ghost" size="lg">Ver projetos</TTButton>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8, maxWidth: 560 }}>
            {["Shopify Dev", "Dashboards", "AI Automation", "Creative Perf.", "Data Systems"].map((b, i) => (
              <TTBadge key={i} tone={i === 2 ? "cyan" : "default"}>{b}</TTBadge>
            ))}
          </div>

          <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 2, height: 28, background: "var(--ember-500)", boxShadow: "0 0 8px var(--ember-glow)" }} />
            <span style={{ fontFamily: '"Caveat", cursive', fontSize: 24, color: "var(--fg-200)" }}>
              Rafael Silva
            </span>
          </div>
        </div>

        {/* RIGHT — visual */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <HeroSystemVisual />
        </div>
      </div>
    </div>
  );
};

const HeroSystemVisual = () => {
  const W = 700, H = 700;
  const cx = W / 2, cy = H / 2;
  // Spread nodes to avoid portrait collision (portrait sits bottom-right outside the SVG box now)
  const nodes = [
    { id: "shop",  x: 130, y: 130, label: "SHOPIFY",     sub: "ECOSSISTEMA",  icon: I.shopify, accent: "ember" },
    { id: "ai",    x: 90,  y: 320, label: "IA APLICADA", sub: "INTELIGÊNCIA", icon: I.ai,      accent: "cyan",  live: true },
    { id: "data",  x: 130, y: 510, label: "DADOS",       sub: "ESTRUTURADOS", icon: I.data,    accent: "cyan" },
    { id: "auto",  x: 320, y: 600, label: "AUTOMAÇÕES",  sub: "WORKFLOWS",    icon: I.bolt,    accent: "ember" },
    { id: "dash",  x: 580, y: 130, label: "DASHBOARD",   sub: "EXECUTIVO",    icon: I.chart,   accent: "cyan",  live: true },
    { id: "creat", x: 600, y: 380, label: "CREATIVE",    sub: "PERFORMANCE",  icon: I.spark,   accent: "ember" },
  ];

  return (
    <div style={{ position: "relative", width: W, height: H }}>
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H}
           style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <defs>
          <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="rgba(94,200,255,0.40)" />
            <stop offset="50%"  stopColor="rgba(94,200,255,0.10)" />
            <stop offset="100%" stopColor="rgba(94,200,255,0)" />
          </radialGradient>
        </defs>

        <circle cx={cx} cy={cy} r={200} fill="url(#hub-glow)" />

        {nodes.map((n, i) => {
          const stroke = n.accent === "ember" ? "rgba(149,242,15,0.55)" : "rgba(94,200,255,0.55)";
          return (
            <g key={n.id}>
              <line x1={n.x} y1={n.y} x2={cx} y2={cy} stroke={stroke} strokeWidth="1" />
              <line x1={n.x} y1={n.y} x2={cx} y2={cy}
                    stroke={stroke} strokeWidth="1.5"
                    strokeDasharray="3 8" strokeDashoffset={i * -3}
                    style={{ animation: `tt-flow ${2.4 + i * 0.3}s linear infinite` }} />
            </g>
          );
        })}

        <circle cx={cx} cy={cy} r="100" fill="none" stroke="rgba(94,200,255,0.18)" strokeDasharray="2 4" />
        <circle cx={cx} cy={cy} r="150" fill="none" stroke="rgba(94,200,255,0.10)" strokeDasharray="2 6" />
      </svg>

      {nodes.map(n => (
        <TTNode key={n.id} {...n} size={84} />
      ))}

      {/* CENTRAL HUB */}
      <div style={{
        position: "absolute", left: cx, top: cy,
        transform: "translate(-50%, -50%)",
        width: 170, height: 170,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: 4,
        background: "linear-gradient(135deg, rgba(46, 167, 232, 0.15), rgba(94, 200, 255, 0.05))",
        boxShadow: "inset 0 0 0 1px rgba(94, 200, 255, 0.4), 0 0 60px rgba(94, 200, 255, 0.25)",
        backdropFilter: "blur(20px)",
        borderRadius: "var(--r-3)",
      }}>
        <CornerTicks />
        <div style={{
          fontFamily: "var(--font-serif)", fontSize: 40, lineHeight: 1,
          color: "var(--cyan-300)", fontStyle: "italic",
          textShadow: "0 0 20px var(--cyan-glow)",
        }}>OS</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.18em",
                       color: "var(--fg-200)", textAlign: "center", marginTop: 6 }}>
          E-COMMERCE<br/>INTELIGENTE
        </div>
        <span className="tt-pulse-dot" style={{ position: "absolute", top: 10, right: 10, width: 5, height: 5 }} />
      </div>

      {/* Floating status chip */}
      <div style={{
        position: "absolute", top: 20, right: 110,
        background: "rgba(11, 16, 32, 0.85)",
        boxShadow: "inset 0 0 0 1px var(--rule-300)",
        backdropFilter: "blur(14px)",
        padding: "8px 12px",
        display: "flex", alignItems: "center", gap: 8,
        borderRadius: "var(--r-2)",
      }}>
        <span style={{ width: 6, height: 6, background: "var(--status-live)", borderRadius: "50%",
                        boxShadow: "0 0 8px var(--status-live)" }} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", color: "var(--fg-200)" }}>
          OS · RUNNING
        </span>
      </div>

      {/* Portrait slot — outside collision zone, bottom-right corner */}
      <div style={{
        position: "absolute", bottom: 20, right: 20, width: 130, height: 170,
        background: "linear-gradient(180deg, rgba(149,242,15,0.06), rgba(94,200,255,0.04))",
        boxShadow: "inset 0 0 0 1px var(--rule-300)",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column", gap: 8,
        backdropFilter: "blur(8px)",
        zIndex: 2,
      }}>
        <CornerTicks />
        <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--ink-300)",
                       boxShadow: "inset 0 0 0 1px var(--rule-400)",
                       display: "flex", alignItems: "center", justifyContent: "center", color: "var(--fg-400)" }}>
          {I.user}
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.16em",
                       color: "var(--fg-400)", textAlign: "center" }}>
          PORTRAIT<br/>PLACEHOLDER
        </div>
      </div>
    </div>
  );
};

window.HeroSection = HeroSection;
