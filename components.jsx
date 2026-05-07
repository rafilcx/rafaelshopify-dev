// ============================================================
// TITTANIUM — Core components
// All components are scoped under .tt and use tokens.css vars.
// ============================================================

// ---------- BUTTONS ----------
const TTButton = ({ variant = "primary", size = "md", icon, children, style, ...rest }) => {
  const base = {
    display: "inline-flex", alignItems: "center", gap: "10px",
    fontFamily: "var(--font-mono)",
    fontSize: size === "lg" ? "13px" : "12px",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    padding: size === "lg" ? "16px 24px" : "12px 18px",
    borderRadius: "var(--r-2)",
    transition: "all var(--dur-base) var(--ease-out)",
    cursor: "pointer",
    position: "relative",
    whiteSpace: "nowrap",
  };
  const variants = {
    primary: {
      background: "var(--ember-500)",
      color: "#0a0a0a",
      fontWeight: 600,
      boxShadow: "0 0 0 1px var(--ember-600), 0 8px 32px var(--ember-glow), inset 0 1px 0 rgba(255,255,255,0.2)",
    },
    ghost: {
      background: "transparent",
      color: "var(--fg-100)",
      boxShadow: "inset 0 0 0 1px var(--rule-300)",
    },
    glass: {
      background: "rgba(255,255,255,0.03)",
      color: "var(--fg-100)",
      boxShadow: "inset 0 0 0 1px var(--rule-300)",
      backdropFilter: "blur(12px)",
    },
  };
  return (
    <button
      style={{ ...base, ...variants[variant], ...style }}
      onMouseEnter={(e) => {
        if (variant === "primary") e.currentTarget.style.boxShadow = "0 0 0 1px var(--ember-600), 0 12px 48px var(--ember-glow), inset 0 1px 0 rgba(255,255,255,0.3)";
        if (variant !== "primary") e.currentTarget.style.boxShadow = "inset 0 0 0 1px var(--rule-400)";
      }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = variants[variant].boxShadow; }}
      {...rest}
    >
      {children}
      {icon !== false && (
        <span style={{ display: "inline-flex", transform: "translateY(-0.5px)" }}>
          {icon || <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h7M6 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square"/></svg>}
        </span>
      )}
    </button>
  );
};

// ---------- BADGE / TAG ----------
const TTBadge = ({ tone = "default", icon, children, style }) => {
  const tones = {
    default: { color: "var(--fg-200)",   border: "var(--rule-300)",        bg: "rgba(255,255,255,0.02)" },
    ember:   { color: "var(--ember-400)", border: "rgba(149,242,15,0.3)",  bg: "rgba(149,242,15,0.08)" },
    cyan:    { color: "var(--cyan-400)",  border: "rgba(94,200,240,0.25)", bg: "rgba(94,200,240,0.06)" },
    live:    { color: "var(--status-live)", border: "rgba(74,222,128,0.3)", bg: "rgba(74,222,128,0.06)" },
  };
  const t = tones[tone];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "8px",
      fontFamily: "var(--font-mono)", fontSize: "11px",
      letterSpacing: "0.14em", textTransform: "uppercase",
      padding: "5px 10px",
      borderRadius: "var(--r-2)",
      color: t.color, background: t.bg,
      boxShadow: `inset 0 0 0 1px ${t.border}`,
      ...style,
    }}>
      {tone === "live" && <span className="tt-pulse-dot" />}
      {icon}
      {children}
    </span>
  );
};

// ---------- CARD (sharp / technical glass) ----------
const TTCard = ({ children, style, accent, padding = "24px", interactive = false, label }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        background: "linear-gradient(180deg, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.01) 100%)",
        boxShadow: hover && interactive
          ? "inset 0 0 0 1px var(--rule-400), 0 24px 60px rgba(0,0,0,0.5)"
          : "inset 0 0 0 1px var(--rule-300)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        padding,
        transition: "all var(--dur-base) var(--ease-out)",
        transform: hover && interactive ? "translateY(-2px)" : "translateY(0)",
        ...style,
      }}
    >
      {/* Corner ticks — technical detail */}
      <CornerTicks />
      {accent && (
        <div style={{
          position: "absolute", top: 0, left: 0, height: "1px", width: "40px",
          background: "var(--ember-500)",
          boxShadow: "0 0 12px var(--ember-glow)",
        }} />
      )}
      {label && (
        <div style={{
          position: "absolute", top: "12px", right: "12px",
          fontFamily: "var(--font-mono)", fontSize: "10px",
          letterSpacing: "0.16em", color: "var(--fg-400)", textTransform: "uppercase",
        }}>{label}</div>
      )}
      {children}
    </div>
  );
};

const CornerTicks = () => (
  <>
    {[
      { top: "-1px", left: "-1px", borderTop: "1px solid var(--ember-500)", borderLeft: "1px solid var(--ember-500)" },
      { top: "-1px", right: "-1px", borderTop: "1px solid var(--ember-500)", borderRight: "1px solid var(--ember-500)" },
      { bottom: "-1px", left: "-1px", borderBottom: "1px solid var(--ember-500)", borderLeft: "1px solid var(--ember-500)" },
      { bottom: "-1px", right: "-1px", borderBottom: "1px solid var(--ember-500)", borderRight: "1px solid var(--ember-500)" },
    ].map((s, i) => (
      <span key={i} style={{ position: "absolute", width: "8px", height: "8px", opacity: 0.5, ...s }} />
    ))}
  </>
);

// ---------- METRIC / KPI ----------
const TTMetric = ({ label, value, unit, delta, sub }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
    <div className="tt-micro" style={{ color: "var(--fg-400)" }}>{label}</div>
    <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
      <span style={{
        fontFamily: "var(--font-serif)",
        fontSize: "clamp(36px, 4vw, 56px)",
        fontWeight: 400,
        letterSpacing: "-0.02em",
        lineHeight: 1,
        color: "var(--fg-100)",
      }}>{value}</span>
      {unit && <span style={{
        fontFamily: "var(--font-mono)", fontSize: "13px",
        color: "var(--fg-300)",
      }}>{unit}</span>}
    </div>
    {(delta || sub) && (
      <div style={{ display: "flex", alignItems: "center", gap: "8px",
                    fontFamily: "var(--font-mono)", fontSize: "11px" }}>
        {delta && (
          <span style={{
            color: delta.startsWith("+") ? "var(--status-live)" : "var(--status-err)",
            display: "inline-flex", alignItems: "center", gap: "3px",
          }}>
            <svg width="8" height="8" viewBox="0 0 8 8">
              <path d={delta.startsWith("+") ? "M1 5l3-3 3 3" : "M1 3l3 3 3-3"} stroke="currentColor" strokeWidth="1.5" fill="none"/>
            </svg>
            {delta}
          </span>
        )}
        {sub && <span style={{ color: "var(--fg-400)" }}>{sub}</span>}
      </div>
    )}
  </div>
);

// ---------- COMMAND / TERMINAL ROW ----------
const TTCommandRow = ({ symbol = "›", children, status }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: "10px",
    fontFamily: "var(--font-mono)", fontSize: "12px",
    color: "var(--fg-200)", padding: "6px 0",
  }}>
    <span style={{ color: "var(--ember-500)" }}>{symbol}</span>
    <span>{children}</span>
    {status && <span style={{ marginLeft: "auto", color: "var(--fg-400)" }}>{status}</span>}
  </div>
);

// ---------- NODE (system map) ----------
const TTNode = ({ label, sublabel, icon, x, y, size = 76, accent, live, kind = "default" }) => {
  const accentColor = accent === "ember" ? "var(--ember-500)" : accent === "cyan" ? "var(--cyan-400)" : "var(--fg-200)";
  const glow = accent === "ember" ? "var(--ember-glow)" : accent === "cyan" ? "var(--cyan-glow)" : "transparent";
  return (
    <div style={{
      position: "absolute", left: x, top: y,
      transform: "translate(-50%, -50%)",
      display: "flex", flexDirection: "column", alignItems: "center", gap: "10px",
      pointerEvents: "auto",
    }}>
      <div style={{
        width: size, height: size,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(20, 24, 31, 0.85)",
        boxShadow: `inset 0 0 0 1px var(--rule-400), 0 0 24px ${glow}`,
        backdropFilter: "blur(8px)",
        position: "relative",
        borderRadius: kind === "round" ? "50%" : "var(--r-2)",
      }}>
        {/* corner ticks */}
        {kind !== "round" && (
          <>
            <span style={{ position: "absolute", top: -1, left: -1, width: 6, height: 6, borderTop: `1px solid ${accentColor}`, borderLeft: `1px solid ${accentColor}` }} />
            <span style={{ position: "absolute", top: -1, right: -1, width: 6, height: 6, borderTop: `1px solid ${accentColor}`, borderRight: `1px solid ${accentColor}` }} />
            <span style={{ position: "absolute", bottom: -1, left: -1, width: 6, height: 6, borderBottom: `1px solid ${accentColor}`, borderLeft: `1px solid ${accentColor}` }} />
            <span style={{ position: "absolute", bottom: -1, right: -1, width: 6, height: 6, borderBottom: `1px solid ${accentColor}`, borderRight: `1px solid ${accentColor}` }} />
          </>
        )}
        <span style={{ color: accentColor, display: "inline-flex" }}>{icon}</span>
        {live && (
          <span className="tt-pulse-dot" style={{ position: "absolute", top: 6, right: 6, width: 5, height: 5 }} />
        )}
      </div>
      <div style={{ textAlign: "center", maxWidth: 140 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px",
                      letterSpacing: "0.12em", textTransform: "uppercase",
                      color: "var(--fg-100)" }}>{label}</div>
        {sublabel && (
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px",
                        color: "var(--fg-400)", marginTop: 3 }}>{sublabel}</div>
        )}
      </div>
    </div>
  );
};

// ---------- SECTION HEADER ----------
const TTSectionHeader = ({ index, label, title, kicker }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: 880 }}>
    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      {index && (
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px",
                       color: "var(--ember-500)", letterSpacing: "0.16em" }}>
          [{index}]
        </span>
      )}
      <span className="tt-eyebrow">{label}</span>
    </div>
    <h2 style={{
      fontFamily: "var(--font-serif)", fontWeight: 400,
      fontSize: "var(--t-h2)", lineHeight: 1.05,
      letterSpacing: "-0.02em", color: "var(--fg-100)",
      textWrap: "balance",
    }}>
      {title}
    </h2>
    {kicker && (
      <p style={{
        fontFamily: "var(--font-sans)", fontSize: "17px",
        color: "var(--fg-300)", maxWidth: 620, lineHeight: 1.5,
        textWrap: "pretty",
      }}>{kicker}</p>
    )}
  </div>
);

// ---------- ICONS (line, 1.4 stroke, square caps) ----------
const I = {
  shopify: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2.5l4 1.5v3l3 .8L15.5 17l-7 .5L7 5l3-1V2.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/><path d="M10 7.5c-1 0-1.5.6-1.5 1.3 0 1.5 2.3 1.4 2.3 2.7 0 .6-.4 1-1.1 1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square"/></svg>,
  data:    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><ellipse cx="10" cy="5" rx="6" ry="2" stroke="currentColor" strokeWidth="1.3"/><path d="M4 5v5c0 1.1 2.7 2 6 2s6-.9 6-2V5M4 10v5c0 1.1 2.7 2 6 2s6-.9 6-2v-5" stroke="currentColor" strokeWidth="1.3"/></svg>,
  ai:      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="2" stroke="currentColor" strokeWidth="1.3"/><circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.3" strokeDasharray="2 2"/><circle cx="4" cy="10" r="1.2" fill="currentColor"/><circle cx="16" cy="10" r="1.2" fill="currentColor"/><circle cx="10" cy="4" r="1.2" fill="currentColor"/><circle cx="10" cy="16" r="1.2" fill="currentColor"/></svg>,
  bolt:    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M11 2L4 11h5l-1 7 7-9h-5l1-7z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>,
  chart:   <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 17V3M3 17h14M6 14l3-4 3 2 4-7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square" strokeLinejoin="round"/></svg>,
  flow:    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="3" width="6" height="4" stroke="currentColor" strokeWidth="1.3"/><rect x="12" y="13" width="6" height="4" stroke="currentColor" strokeWidth="1.3"/><path d="M5 7v3h10v3" stroke="currentColor" strokeWidth="1.3"/></svg>,
  spark:   <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2v4M10 14v4M2 10h4M14 10h4M4.5 4.5l2.8 2.8M12.7 12.7l2.8 2.8M4.5 15.5l2.8-2.8M12.7 7.3l2.8-2.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square"/></svg>,
  arrow:   <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h9M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square"/></svg>,
  user:    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.3"/><path d="M3 17c1-3 4-5 7-5s6 2 7 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square"/></svg>,
  external:<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M5 2H2v8h8V7M7 2h3v3M5 7l5-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square"/></svg>,
};

Object.assign(window, {
  TTButton, TTBadge, TTCard, TTMetric, TTCommandRow, TTNode, TTSectionHeader,
  CornerTicks, I,
});
