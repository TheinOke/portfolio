import React from "react";
import Reveal from "./Reveal";
import { TECH } from "../data";

export default function TechStack({ C, techRef, mTech, mTechB, techStripRef }) {
  return (
    <section ref={techRef} className="relative z-10" style={{ height: "190vh" }}>
      <span ref={mTech} className="absolute block h-0 w-0" style={{ left: "80%", top: "26%" }} />
      <span ref={mTechB} className="absolute block h-0 w-0" style={{ left: "22%", top: "74%" }} />
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <Reveal y={20}>
          <p className="os-eyebrow mb-10 px-5 text-center font-semibold" style={{ color: C.s500 }}>Tech stack</p>
        </Reveal>
        <div ref={techStripRef} className="flex w-max gap-3 px-5 sm:gap-4" style={{ willChange: "transform" }}>
          {TECH.concat(TECH).map((t, i) => (
            <span key={`${t.name}-${i}`} className="flex items-center gap-3 whitespace-nowrap rounded-md px-6 py-4 text-sm font-semibold sm:px-8 sm:py-5 sm:text-base"
              style={{ background: C.card, border: `1px solid ${C.s200}`, color: C.s700 }}>
              <img src={t.icon} alt="" aria-hidden="true" className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" loading="lazy" />
              {t.name}
            </span>
          ))}
        </div>
        <Reveal y={20} delay={150}>
          <p className="mt-10 px-5 text-center text-xs" style={{ color: C.s400 }}>Keep scrolling — the stack moves with you</p>
        </Reveal>
      </div>
    </section>
  );
}
