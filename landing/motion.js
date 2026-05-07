/* ============================================================
   RAFAEL SILVA — Motion helper
   Centraliza GSAP + ScrollTrigger em torno do projeto vanilla
   (React via CDN + Babel Standalone). Sem build step.

   API:
     RSMotion.ready          // boolean — true se gsap carregou
     RSMotion.reduced        // boolean — prefers-reduced-motion: reduce
     RSMotion.isMobile()     // viewport <= 760px
     RSMotion.presets        // duracoes, eases, staggers
     RSMotion.batch(sel, o)  // ScrollTrigger.batch padronizado
     RSMotion.context(fn)    // gsap.context() wrapper com cleanup
     RSMotion.kill(id)       // mata trigger por id
   ============================================================ */
(function (global) {
  const ready = typeof window !== "undefined"
    && typeof global.gsap !== "undefined"
    && typeof global.ScrollTrigger !== "undefined";

  if (ready) {
    global.gsap.registerPlugin(global.ScrollTrigger);
  }

  const reduced = typeof window !== "undefined"
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const isMobile = () =>
    typeof window !== "undefined" && window.innerWidth <= 760;

  const presets = {
    dur: { fast: 0.4, base: 0.7, slow: 1.1 },
    ease: {
      out:    "power3.out",
      outQ:   "power2.out",
      expo:   "expo.out",
      inOut:  "power2.inOut",
    },
    stagger: { tight: 0.06, base: 0.09, loose: 0.15 },
    revealStart: "top 85%",
    revealEnd:   "bottom 20%",
  };

  /**
   * ScrollTrigger.batch padronizado para reveals.
   * Substitui IntersectionObserver: adiciona .is-in quando entra na viewport.
   *
   * Se GSAP não carregar OU reduced-motion: aplica .is-in imediatamente
   * para garantir que o conteúdo fique visível (fallback graceful).
   */
  function batch(selector, options) {
    const els = typeof selector === "string"
      ? document.querySelectorAll(selector)
      : selector;
    if (!els || !els.length) return;

    if (!ready || reduced) {
      els.forEach(el => el.classList.add("is-in"));
      return;
    }

    const opts = options || {};
    global.ScrollTrigger.batch(els, {
      start: opts.start || presets.revealStart,
      once: opts.once !== false,
      onEnter: (batch) => {
        batch.forEach((el, i) => {
          // Respeita --rev-delay já existente no markup como atraso adicional
          const styleDelay = parseFloat(
            getComputedStyle(el).getPropertyValue("--rev-delay")
          ) || 0;
          setTimeout(() => el.classList.add("is-in"), i * (opts.staggerMs || 90) + styleDelay);
        });
      },
    });
  }

  /**
   * Wrapper para gsap.context — facilita cleanup em useEffect.
   * Uso:
   *   const ctx = RSMotion.context(() => {
   *     gsap.from(".x", { y: 40, opacity: 0 });
   *   }, scopeRef.current);
   *   return () => ctx.revert();
   */
  function context(fn, scope) {
    if (!ready || reduced) {
      // No-op — devolve um shim com revert() pra simplificar caller
      return { revert: () => {} };
    }
    return global.gsap.context(fn, scope);
  }

  function kill(id) {
    if (!ready) return;
    const t = global.ScrollTrigger.getById(id);
    if (t) t.kill();
  }

  global.RSMotion = {
    ready,
    reduced,
    isMobile,
    presets,
    batch,
    context,
    kill,
  };
})(typeof window !== "undefined" ? window : globalThis);
