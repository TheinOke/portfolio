import React from "react";
import { PLANE_INK } from "../data";

/* Background flight-path SVG (behind every section) — the animated plane
   is driven by the rAF loop in Portfolio.jsx, which writes directly to
   planeGRef/clipRectRef each frame. */
export default function PaperPlane({ C, doc, pathD, pathRef, clipRectRef, planeGRef }) {
  return (
    <svg className="pointer-events-none absolute left-0 top-0"
      style={{ width: doc.w || "100%", height: doc.h, zIndex: 0 }}
      viewBox={`0 0 ${doc.w || 1} ${doc.h || 1}`} aria-hidden="true">
      <defs>
        <clipPath id="trailClip">
          <rect ref={clipRectRef} x="0" y="0" width={doc.w} height="0" />
        </clipPath>
        <filter id="planeShadow" x="-60%" y="-60%" width="220%" height="220%">
          <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor={PLANE_INK} floodOpacity="0.2" />
        </filter>
      </defs>

      <path ref={pathRef} d={pathD} fill="none" stroke={C.s300} strokeWidth="2" strokeDasharray="2 10" strokeLinecap="round" />
      <g clipPath="url(#trailClip)">
        <path d={pathD} fill="none" stroke={C.s600} strokeWidth="2" strokeDasharray="2 10" strokeLinecap="round" />
      </g>

      <g ref={planeGRef} transform="translate(-400,-400)" filter="url(#planeShadow)">
        <path d="M 34 -2 L -34 -8 L -9 7 Z" fill="#FFFFFF" stroke={PLANE_INK} strokeWidth="2.4" strokeLinejoin="round" />
        <path d="M 34 -2 L -9 7 L -20 20 Z" fill="#FFFFFF" stroke={PLANE_INK} strokeWidth="2.4" strokeLinejoin="round" />
        <path d="M 34 -2 L -9 7" fill="none" stroke={PLANE_INK} strokeWidth="2.4" strokeLinecap="round" />
        <path d="M -9 7 L -13 19" fill="none" stroke={PLANE_INK} strokeWidth="2.4" strokeLinecap="round" />
      </g>
    </svg>
  );
}
