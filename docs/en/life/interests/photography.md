---
date: 2026-05-13
title: My Photography 2026
description: Photography portfolio 2026 — capturing moments in life through the lens
aside: false
---

<style>
/* :has() guard — only applies to this page; auto-invalidates after SPA navigation away */
.VPDoc:has(.album-embed) {
  padding: 0;
}
.VPDoc:has(.album-embed) .content {
  padding: 0;
}
.VPDoc:has(.album-embed) .VPDocFooter {
  display: none;
}

.album-embed {
  width: 100%;
  height: calc(100dvh - var(--vp-nav-height));
}
.album-embed iframe {
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
  background: var(--vp-c-bg-soft);
}

/* Mobile (<960px) has an extra local nav bar (~48px) at the top */
@media (max-width: 959.98px) {
  .album-embed {
    height: calc(100dvh - var(--vp-nav-height) - 48px);
  }
}

/* Bottom-right button linking to the original site */
a.album-embed-link {
  position: fixed;
  right: 24px;
  bottom: calc(24px + env(safe-area-inset-bottom, 0px));
  z-index: var(--vp-z-index-nav, 30);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  font-family: var(--fs-font-mono);
  font-size: 11px;
  letter-spacing: var(--fs-track-mono);
  text-transform: uppercase;
  color: var(--fs-ink);
  background: var(--fs-bg);
  border: 1px dashed var(--fs-line);
  border-radius: 0;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition:
    border-color 0.2s ease,
    color 0.2s ease;
}
a.album-embed-link:hover {
  border-color: var(--fs-accent);
  border-style: solid;
  color: var(--fs-accent);
}
</style>

<div class="album-embed">
  <iframe src="https://albums.axello.cn" title="My Photography 2026" loading="lazy" allowfullscreen></iframe>
</div>

<a class="album-embed-link" href="https://albums.axello.cn" target="_blank" rel="noopener">Open original ↗</a>
