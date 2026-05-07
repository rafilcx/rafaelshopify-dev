# Security Best Practices Report — RAFAEL landing

**Scope**: Static React SPA in this repo (deployed on Vercel as static files).
**Stack detected**: HTML5 + React 18 (UMD via `unpkg`), `@babel/standalone` (in‑browser JSX), GSAP + ScrollTrigger (UMD via `unpkg`), Vercel static hosting (`vercel.json`).
**Date**: 2026-05-07
**Methodology**: Reviewed against `javascript-general-web-frontend-security.md` and `javascript-typescript-react-web-frontend-security.md` from the Codex security best‑practices reference set.

---

## Executive summary

This is a brochure / portfolio site with no auth, no user input forms, no state‑changing requests, and no secrets. The realistic blast radius is therefore small. The findings below are dominated by **supply‑chain hygiene** (third‑party scripts loaded from a public CDN with no integrity check) and **defense‑in‑depth gaps** (no CSP / security headers, in‑browser Babel transpilation that forces a permissive script policy).

Top priorities, in order:

1. Add **Subresource Integrity (SRI)** to all third‑party scripts in `index.html` (and pin versions). *(F-01)*
2. Remove **`@babel/standalone`** from production by pre‑compiling JSX at build time. *(F-02)*
3. Set a basic set of **security headers** (CSP, `X-Content-Type-Options`, `Referrer-Policy`, `frame-ancestors`) via `vercel.json` headers. *(F-03)*
4. Decide what should actually ship: scrub or `.vercelignore` files not used in production (e.g., `design-canvas.jsx`, `Tittanium Design System.html` running React **development** builds, `uploads/RAFA.md`). *(F-04, F-06)*
5. Tighten the `postMessage` host‑canvas plumbing in `design-canvas.jsx` if the design system page stays public. *(F-05)*

No critical vulnerabilities found. No secrets, `dangerouslySetInnerHTML`, `eval`, `innerHTML` injection, untrusted URL navigation, or sensitive Web Storage usage detected.

---

## Findings

### F-01 — Third‑party scripts in `index.html` lack Subresource Integrity (SRI)
- **Severity**: High (defense‑in‑depth; supply‑chain)
- **Rule**: JS-SRI-001 / REACT-SRI-001
- **Location**: `index.html:52-58`
- **Evidence**:
  ```html
  <script crossorigin src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js"></script>
  <script src="https://unpkg.com/gsap@3.12.5/dist/gsap.min.js"></script>
  <script src="https://unpkg.com/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
  ```
- **Impact**: If `unpkg.com` (or any CDN edge in the path) is compromised or the file at that path is altered, the browser will execute attacker‑supplied JavaScript with full first‑party origin privileges (read DOM, set cookies the page can set, exfiltrate page content, deface, redirect). Fixed versions reduce but don’t eliminate the risk.
- **Fix**: Add `integrity="sha384-…"` and `crossorigin="anonymous"` to every third‑party `<script>`. Generate hashes with e.g. `curl -s https://unpkg.com/react@18.3.1/umd/react.production.min.js | openssl dgst -sha384 -binary | openssl base64 -A`. Better still, **self‑host** the libs from `/assets/` so they share the site’s deploy lifecycle and are covered by your CSP.
- **Mitigation if not fixed immediately**: Lock versions to exact pins (already done), add a CSP `script-src` allowlist limited to `'self' https://unpkg.com` (see F-03), and review unpkg deprecation/changes regularly.
- **Notes**: `Tittanium Design System.html:21-23` does include SRI on its three React/Babel scripts — apply the same pattern consistently across all HTML entrypoints.

### F-02 — `@babel/standalone` runs JSX transpilation at runtime in production
- **Severity**: Medium
- **Rule**: JS-XSS-003 / JS-CSP-002 (defense‑in‑depth)
- **Location**: `index.html:54, 61-64`; `Tittanium Design System.html:23-29`
- **Evidence**:
  ```html
  <script crossorigin src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js"></script>
  …
  <script type="text/babel" src="landing/sec-hero.jsx"></script>
  ```
- **Impact**: Babel‑standalone uses `Function()`/`eval`‑style code generation, which forces any future CSP to include `script-src 'unsafe-eval'`, weakening one of the most effective XSS mitigations. It also adds ~750 KB of CDN JS to the critical path (LCP regression). Untrusted inputs do **not** reach Babel here, so no direct XSS — this is a hardening / performance issue.
- **Fix**: Pre‑compile JSX during build (Vite, esbuild, or `@babel/cli`) and ship plain JS. After that, remove `@babel/standalone`, drop `type="text/babel"`, and the site can run under a strict CSP without `unsafe-eval`.
- **Performance bonus**: Removing in‑browser Babel typically shaves multi‑hundred‑millisecond LCP on mobile.

### F-03 — No security headers configured (`vercel.json`)
- **Severity**: Medium
- **Rule**: JS-CSP-001 / REACT-CSP-001 / REACT-HEADERS-001
- **Location**: `vercel.json:1-4`
- **Evidence**:
  ```json
  { "cleanUrls": true, "trailingSlash": false }
  ```
- **Impact**: No CSP (defense‑in‑depth against XSS), no `X-Content-Type-Options: nosniff`, no clickjacking protection, no `Referrer-Policy`. On a brochure site with no auth this is low‑impact, but adding them is essentially free and is the baseline expectation for modern apps.
- **Fix**: Add a `headers` block to `vercel.json` (or migrate to `vercel.ts`). Minimum recommended baseline once F-01 and F-02 are addressed:
  ```json
  {
    "cleanUrls": true,
    "trailingSlash": false,
    "headers": [
      {
        "source": "/(.*)",
        "headers": [
          { "key": "X-Content-Type-Options", "value": "nosniff" },
          { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
          { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
          {
            "key": "Content-Security-Policy",
            "value": "default-src 'self'; script-src 'self' https://unpkg.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
          }
        ]
      }
    ]
  }
  ```
  Notes:
  - `script-src 'self' https://unpkg.com` is the smallest set that keeps the current setup working. Drop `https://unpkg.com` after self‑hosting (F-01).
  - `style-src 'unsafe-inline'` is needed because `index.html:41-46` ships an inline `<style>` block; replace with an external stylesheet to harden further (or use a hash/nonce).
  - While Babel standalone is in place (F-02), you also need `'unsafe-eval'` in `script-src` — yet another reason to remove it.
  - `frame-ancestors 'none'` replaces a need for `X-Frame-Options`.
  - `<meta http-equiv>` CSP is **not** equivalent: `frame-ancestors` and reporting only work via real headers (CSP2 spec). Keep CSP at the edge.

### F-04 — `Tittanium Design System.html` ships React **development** builds and is publicly reachable
- **Severity**: Low
- **Rule**: REACT-CONFIG-001 (production hygiene) / general supply‑chain
- **Location**: `Tittanium Design System.html:21-22`
- **Evidence**:
  ```html
  <script src="https://unpkg.com/react@18.3.1/umd/react.development.js" integrity="sha384-…"></script>
  <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" integrity="sha384-…"></script>
  ```
- **Impact**: Larger bundle, slower rendering, and exposes verbose React warnings/dev internals to anyone who finds the URL. No direct exploit, but it’s a leak of internal design‑system surface area.
- **Fix**: Either (a) switch to `react.production.min.js` / `react-dom.production.min.js` and regenerate the SRI hashes, or (b) add this file (and its `*.jsx` siblings) to a `.vercelignore` so it isn’t deployed publicly. Pick one based on whether the design system is intentionally public.

### F-05 — `postMessage` with `targetOrigin: '*'` and no `event.origin` allowlist (`design-canvas.jsx`)
- **Severity**: Low (Medium if the canvas iframe ever gets meaningful auth/state)
- **Rule**: JS-MSG-001 / REACT-POSTMSG-001
- **Location**: `design-canvas.jsx:266, 388, 393, 401`
- **Evidence**:
  ```js
  window.parent.postMessage({ type: '__dc_zoom', scale }, '*');           // 266
  window.parent.postMessage({ type: '__dc_present' }, '*');               // 388, 401
  window.addEventListener('message', onHostMsg);                          // 393  (no origin check)
  ```
- **Impact**: Outbound: any frame that ever embeds this canvas can read the messages — currently only a `scale` number, so leakage is negligible. Inbound: any embedder can send `__dc_set_zoom`/`__dc_probe` and change the displayed zoom. No code execution path, no DOM injection (`d.scale` is type‑checked as `number`), so impact is contained to UI state. This is still a deviation from the standard guidance and would become more dangerous if message handlers are extended later.
- **Fix**: Replace `'*'` with the expected parent origin (or at minimum `window.location.origin` when the parent is same‑origin), and validate `event.origin` against an allowlist before acting:
  ```js
  const ALLOWED_ORIGINS = new Set([window.location.origin]);
  const onHostMsg = (e) => {
    if (!ALLOWED_ORIGINS.has(e.origin)) return;
    const d = e.data;
    if (d?.type === '__dc_set_zoom' && typeof d.scale === 'number') { /* … */ }
    else if (d?.type === '__dc_probe') { /* … */ }
  };
  window.parent.postMessage({ type: '__dc_zoom', scale }, window.location.origin);
  ```

### F-06 — Files unused by the production landing are still deployed
- **Severity**: Low (information disclosure / attack‑surface)
- **Rule**: JS-SUPPLY-001 (general hygiene)
- **Location**: repo root
- **Evidence**: `index.html` only references `landing/*.jsx` + `tokens.css` + `landing/landing.css`, but the repo also contains and Vercel will serve: `case-study-section.jsx`, `components.jsx`, `design-canvas.jsx`, `foundation-cards.jsx`, `hero-section.jsx`, `systems-map-section.jsx`, `Tittanium Design System.html`, `uploads/RAFA.md`, `uploads/RAFA.png`, `uploads/.png`.
- **Impact**: Internal/work‑in‑progress source, design‑system docs, and unredacted notes (`uploads/RAFA.md`) are publicly fetchable by anyone who guesses or scrapes the path. Likely not a direct vulnerability, but a leak of internal material that may not be intended.
- **Fix**: Decide intent. If these are meant to be private:
  - Add a `.vercelignore` excluding the unused files, or
  - Move them out of the deploy root (e.g. into `private/`) and exclude that path, or
  - Use Vercel’s deployment `excludeFiles` / project ignore command.
  If the design system page is meant to be public, link it from somewhere and treat it as a first‑class entrypoint (apply F-01–F-04 to it as well).
- **False‑positive note**: `uploads/RAFA.md` may be intentional reference material; please confirm.

---

## Verified non‑issues (so they don’t reappear in future scans)

- **No `dangerouslySetInnerHTML`, `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `document.write`, `eval`, or `new Function`** in any project source (excluding the bundled Babel runtime, F-02).
- **No untrusted URL → navigation/`href`/`src`** sinks. All `<a>` tags use static `href` or React‑interpolated values originating from local data structures. (`landing/app.jsx:142`, `landing/sec-late.jsx:574`).
- **`target="_blank"` always paired with `rel="noopener noreferrer"`** — `landing/sec-hero.jsx:149`, `landing/sec-late.jsx:576, 686, 902, 905`, `landing/app.jsx:156`.
- **No secrets / API keys / tokens** in the bundle, env files, or HTML.
- **`localStorage` usage** in `design-canvas.jsx:270, 277, 280` stores only a numeric pan/zoom transform — not sensitive.
- **No service worker, no auth, no cookie‑authenticated state‑changing requests** → CSRF, session‑storage and SW rules are not applicable.
- **Production React build** is used in `index.html` (good).

---

## Recommended order of work

1. **F-01** — add SRI + `crossorigin="anonymous"` to all five CDN scripts in `index.html`. (~10 min)
2. **F-03** — add the `headers` block to `vercel.json` with the baseline above. (~10 min)
3. **F-04** — pick a fate for `Tittanium Design System.html` (production builds + SRI, or `.vercelignore`). (~10 min)
4. **F-06** — `.vercelignore` for anything not intended to ship. (~10 min)
5. **F-02** — migrate JSX to a build step (Vite is the smallest path). After this, remove `'unsafe-eval'` from CSP and drop `@babel/standalone`. (Half‑day)
6. **F-05** — tighten `design-canvas.jsx` `postMessage` plumbing. (~15 min)

Happy to start the fixes one at a time — say which finding to tackle first and I’ll keep changes minimal and behavior‑preserving.
