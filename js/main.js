(() => {
  "use strict";

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.innerHTML = isOpen
        ? '<svg><use href="#i-close"/></svg>'
        : '<svg><use href="#i-menu"/></svg>';
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.innerHTML = '<svg><use href="#i-menu"/></svg>';
      });
    });
  }

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll("main section[id], main#home");
  const navAnchors = document.querySelectorAll(".nav-links a");

  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navAnchors.forEach((a) => {
              a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
            });
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-item").forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    if (!question || !answer) return;

    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      document.querySelectorAll(".faq-item.open").forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove("open");
          openItem.querySelector(".faq-question").setAttribute("aria-expanded", "false");
          openItem.querySelector(".faq-answer").style.maxHeight = null;
        }
      });

      item.classList.toggle("open", !isOpen);
      question.setAttribute("aria-expanded", String(!isOpen));
      answer.style.maxHeight = !isOpen ? `${answer.scrollHeight}px` : null;
    });
  });

  /* ---------- Portfolio filter ---------- */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioCards = document.querySelectorAll(".portfolio-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      const filter = btn.dataset.filter;
      portfolioCards.forEach((card) => {
        const show = filter === "all" || card.dataset.cat === filter;
        card.classList.toggle("hidden", !show);
      });
    });
  });

  /* ---------- Click-to-play video cards ----------
     These are large raw exports (tens to hundreds of MB), so nothing loads
     until a visitor deliberately presses play — swap the placeholder card
     for a real <video controls> at that point, not before. */
  document.querySelectorAll("[data-video]").forEach((el) => {
    const activate = () => {
      if (el.dataset.activated) return;
      el.dataset.activated = "true";

      const video = document.createElement("video");
      video.src = el.dataset.video;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      video.preload = "none";
      video.className = "inline-video";

      el.innerHTML = "";
      el.appendChild(video);
      el.classList.add("is-video-active");
      el.removeAttribute("role");
      el.removeAttribute("tabindex");
      el.removeAttribute("aria-label");
    };

    el.addEventListener("click", activate);
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activate();
      }
    });
  });

  /* ---------- Contact form (Formspree) ---------- */
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  if (form && status) {
    form.addEventListener("submit", async (e) => {
      const action = form.getAttribute("action") || "";

      if (action.includes("YOUR_FORM_ID")) {
        e.preventDefault();
        status.textContent = "This form isn't wired up yet. Please use the email or TikTok link instead.";
        status.className = "form-status error";
        return;
      }

      e.preventDefault();
      status.textContent = "Sending...";
      status.className = "form-status";

      try {
        const res = await fetch(action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });

        if (res.ok) {
          status.textContent = "Message sent, thanks! I'll get back to you within a day or two.";
          status.className = "form-status success";
          form.reset();
        } else {
          status.textContent = "Something went wrong. Please email me directly instead.";
          status.className = "form-status error";
        }
      } catch (err) {
        status.textContent = "Network error. Please email me directly instead.";
        status.className = "form-status error";
      }
    });
  }

  /* ---------- Stat count-up (fallback for no-GSAP / reduced motion) ---------- */
  window.__prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (window.__prefersReducedMotion) {
    document.querySelectorAll(".stat-num").forEach((el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      el.textContent = `${target}${suffix}`;
    });
  }
})();
