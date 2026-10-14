(() => {
  "use strict";

  const reduced = window.__prefersReducedMotion ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const hasGSAP = typeof window.gsap !== "undefined";

  /* ---------- Scroll reveals ---------- */
  const revealEls = document.querySelectorAll("[data-reveal]");

  if (reduced || !hasGSAP) {
    // Static final state — no motion.
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    gsap.registerPlugin(ScrollTrigger);

    revealEls.forEach((el, i) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: (i % 6) * 0.06,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
        onStart: () => el.classList.add("is-visible"),
      });
    });

    // Google Fonts swap in asynchronously and reflow the page, which can
    // stale-out ScrollTrigger's cached trigger positions (elements above
    // the fold end up never "entering"). Re-measure once type has settled.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
    window.addEventListener("load", () => ScrollTrigger.refresh());
  }

  /* ---------- Stat count-up (progressive enhancement) ----------
     The real numbers are written in the HTML, so they show with no script,
     no GSAP, or reduced motion. This only replays a count-up from 0 when
     GSAP is available, and an unconditional timer restores the exact HTML
     text if the tween stalls (backgrounded tab, font reflow, etc.). */
  document.querySelectorAll(".stat-num").forEach((el) => {
    const finalText = el.textContent.trim();
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const decimals = target % 1 === 0 ? 0 : 1;
    if (reduced || !hasGSAP || Number.isNaN(target)) return;

    let settled = false;
    const settle = () => {
      if (settled) return;
      settled = true;
      el.textContent = finalText;
    };

    const counter = { val: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: "top 95%",
      once: true,
      onEnter: () => {
        // Safety net starts with the count, not at page load, so a stat row
        // below the fold still animates when it is scrolled into view.
        setTimeout(settle, 2500);
        gsap.to(counter, {
          val: target,
          duration: 1.4,
          ease: "power2.out",
          onUpdate: () => {
            if (!settled) el.textContent = `${counter.val.toFixed(decimals)}${suffix}`;
          },
          onComplete: settle,
        });
      },
    });
  });

  /* ---------- Add-on card tilt-lite on hover (desktop only, subtle) ---------- */
  if (!reduced && window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll(".addon-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `scale(1.02) rotateX(${(-y * 3).toFixed(2)}deg) rotateY(${(x * 3).toFixed(2)}deg)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }
})();
