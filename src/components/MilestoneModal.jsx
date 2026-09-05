import React from "react";
import { MILESTONES } from "../data";

export default function MilestoneModal({ C, openMs, setOpenMs }) {
  if (openMs === null) return null;
  return (
    <div className="fixed inset-0 flex items-end justify-center px-4 py-6 sm:items-center sm:px-6"
      style={{ zIndex: 70, background: "rgba(33,37,41,0.55)" }} onClick={() => setOpenMs(null)} role="dialog" aria-modal="true">
      <div className="proj-in w-full max-w-lg rounded-2xl p-6 sm:p-8"
        style={{ background: C.card, border: `1px solid ${C.s200}`, boxShadow: "0 24px 60px rgba(33,37,41,0.3)" }}
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="os-eyebrow font-semibold" style={{ color: C.s500 }}>{MILESTONES[openMs].year}</p>
            <h3 className="mt-2 text-xl font-extrabold leading-snug sm:text-2xl">{MILESTONES[openMs].title}</h3>
          </div>
          <button onClick={() => setOpenMs(null)} aria-label="Close" className="os-btn shrink-0 rounded-md px-3 py-1 text-lg"
            style={{ color: C.s500, border: `1px solid ${C.s200}` }}>✕</button>
        </div>
        <p className="mt-6 text-sm leading-loose sm:text-base" style={{ color: C.s600 }}>{MILESTONES[openMs].body}</p>
        <a href={MILESTONES[openMs].link} download
          className="os-btn mt-8 inline-block rounded-md px-6 py-3 text-sm font-semibold"
          style={{ background: C.s800, color: C.bg }}>
          {MILESTONES[openMs].linkLabel}
        </a>
      </div>
    </div>
  );
}
