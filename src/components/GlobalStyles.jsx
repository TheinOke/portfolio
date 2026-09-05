import React from "react";
import { EASE, D_MED } from "../data";

export default function GlobalStyles({ C }) {
  return (
    <style>{`
      .os-in::placeholder { color:${C.s400}; }
      .os-in:focus-visible, .os-btn:focus-visible { outline:2px solid ${C.s600}; outline-offset:2px; }
      .os-eyebrow { font-size:11px; letter-spacing:.28em; text-transform:uppercase; }

      /* sizes Tailwind's arbitrary-value syntax can't provide without a compiler */
      .blob-box { width:18rem; }
      .slides-box { height:15rem; }
      .wheel-box { height:15rem; width:7.5rem; flex-shrink:0; }
      .ms-row { display:flex; align-items:center; gap:1.25rem; }
      .ms-card { width:100%; }
      .proj-grid { display:flex; flex-direction:column; gap:1.75rem; }
      .hero-grid { display:flex; flex-direction:column-reverse; gap:3rem; }
      .about-grid { display:grid; gap:2.5rem; }
      @media (min-width:640px) {
        .blob-box { width:24rem; }
        .slides-box { height:20rem; }
        .wheel-box { height:22rem; width:11rem; }
      }
      @media (min-width:768px) {
        .blob-box { width:27rem; }
        .slides-box { height:28rem; }
        .wheel-box { height:34rem; width:17rem; }
        .ms-row { display:grid; grid-template-columns:1fr auto 1fr; gap:2rem; }
        .ms-card { width:auto; min-width:19rem; }
        .proj-grid { display:grid; grid-template-columns:auto 1fr; align-items:center; gap:3rem; }
        .hero-grid { flex-direction:row; align-items:center; gap:3rem; }
        .about-grid { grid-template-columns:1fr 1fr; align-items:center; gap:4rem; }
      }
      @media (min-width:1024px) {
        .blob-box { width:33rem; }
        .wheel-box { height:38rem; width:19rem; }
        .hero-grid { gap:4rem; }
      }

      @keyframes lineSweep { from { stroke-dashoffset:520; } to { stroke-dashoffset:0; } }
      @keyframes linePulse { 0%,100% { opacity:.18; } 50% { opacity:.5; } }
      @keyframes dotJump { 0%,70%,100% { transform:translateY(0); } 35% { transform:translateY(-7px); } }
      @keyframes projIn { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:none; } }
      .ld-base { animation:linePulse 1.6s ease-in-out infinite; }
      .ld-sweep { stroke-dasharray:80 440; animation:lineSweep 1.6s ease-in-out infinite; }
      .ld-dot { display:inline-block; animation:dotJump 1.2s ease-in-out infinite; }
      .proj-in { animation:projIn ${D_MED}ms ${EASE} both; }

      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after { transition-duration:.01ms !important; animation-duration:.01ms !important; animation-iteration-count:1 !important; }
      }
    `}</style>
  );
}
