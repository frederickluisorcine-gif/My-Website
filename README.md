# Hebron Creatives — Digital Marketer Portfolio

Static site. No build step, no framework — just `index.html`, `css/`, `js/`, `assets/`.

## Run it locally

Open `index.html` directly in a browser, or serve it (recommended, so relative paths and fonts behave exactly like production):

```bash
npx serve .
```

## Before this goes live — things that need your input

1. **Contact form (currently hidden).** The form is commented out in `index.html` (Contact section) until it has a real [Formspree](https://formspree.io) endpoint. The Contact section shows a Book a Call button and direct links instead. The comment above the form explains how to bring it back.
2. **IG Carousel exports.** Two files in the `IG Carousel` folder ("Mira carousel 001/002", "02_IG post" x2) are `.html` exports (Canva), not plain images, so I didn't pull them in automatically. If you want them in the Portfolio grid, export them as PNG/JPG and drop them into `assets/images/` — I'll wire them in.
3. **Portfolio videos — now playable in-page.** The real short-form/VSL/testimonial files (66MB–339MB) live in `assets/videos/`. Each portfolio card and the testimonial strip show a styled placeholder until clicked; on click, a native `<video controls>` loads and plays the actual file in place — nothing downloads until a visitor presses play. Because these are large, uncompressed raw exports, playback will still be slow on a weak connection. If you'd rather have snappier playback, send me (or make) trimmed/compressed versions and I'll swap the files in `assets/videos/` — no other changes needed.
4. **Real contrast/spot-check.** I followed the accessibility checklist (contrast, focus states, touch targets, reduced-motion fallback) while building, but give the live page a look yourself once it's hosted somewhere with your real content.
5. **Hosting note.** `assets/videos/` is ~1.2GB total. That's fine for most static hosts (Netlify/Vercel free tiers included) but worth knowing before you push it anywhere with a size cap.
6. **Not on GitHub.** Four of the six videos (`client-testimonial.mp4`, `short-form-02.mp4`, `short-form-04.mp4`, `vsl-july.mp4`) are over GitHub's 100MB per-file limit and would also blow past the free Git LFS storage quota (1GB) on their own, so they're excluded via `.gitignore` and only live on this computer. The site works fully when run locally; if you deploy to Netlify/Vercel directly from this folder (not from the GitHub repo), those videos will be included. If you want them in the GitHub repo too, that needs paid Git LFS storage.

## Deploying

No backend needed. Drag-and-drop the whole folder onto **Netlify**, or connect the folder to **Vercel** / **GitHub Pages** — any static host works.

## File map

```
index.html        All page markup/content
css/tokens.css     Design tokens (colors, type, spacing)
css/style.css      Layout + components
js/main.js         Nav, FAQ accordion, portfolio filter, contact form
js/animations.js   GSAP scroll reveals, stat count-up, bento hover (all reduced-motion safe)
assets/images/     About photo + 10 real thumbnail/carousel design samples
assets/videos/     Real short-form/VSL/testimonial exports (click-to-play in Portfolio)
```
