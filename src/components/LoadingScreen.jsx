import React from "react";
import { EASE, D_MED } from "../data";

export default function LoadingScreen({ C, loading, fading }) {
  if (!loading) return null;
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center px-6"
      style={{ zIndex: 80, background: C.bg, opacity: fading ? 0 : 1, transition: `opacity ${D_MED}ms ${EASE}` }}>
      <svg viewBox="0 0 320 130" className="w-64 sm:w-80" aria-hidden="true">
        <path className="ld-base" d="M 8 70 L 78 70 L 128 18 L 176 116 L 214 62 L 312 62"
          fill="none" stroke={C.s800} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path className="ld-sweep" d="M 8 70 L 78 70 L 128 18 L 176 116 L 214 62 L 312 62"
          fill="none" stroke={C.s800} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <p className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl" style={{ color: C.s800 }}>
        Loading
        <span className="ld-dot" style={{ animationDelay: "0ms" }}>.</span>
        <span className="ld-dot" style={{ animationDelay: "150ms" }}>.</span>
        <span className="ld-dot" style={{ animationDelay: "300ms" }}>.</span>
      </p>
    </div>
  );
}
