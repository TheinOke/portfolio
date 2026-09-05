import React from "react";
import Reveal from "./Reveal";
import { PROJECTS, EASE, D_MED } from "../data";

const R = 200;
const STEP = 360 / PROJECTS.length;

export default function Projects({ C, projRef, projH, mProjA, mProjB, proj, wheelAnim, goProject }) {
  return (
    <section ref={projRef} className="relative z-20" style={{ height: `${projH}vh` }}>
      <span ref={mProjA} className="absolute block h-0 w-0" style={{ left: "84%", top: "6%" }} />
      <span ref={mProjB} className="absolute block h-0 w-0" style={{ left: "18%", top: "94%" }} />
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="proj-grid mx-auto w-full max-w-6xl px-5 sm:px-8 md:px-10">
          <Reveal y={40}>
            <div className="wheel-box">
              <svg viewBox={`0 ${-R} ${R} ${R * 2}`} className="h-full w-full" aria-hidden="true">
                <g transform={`rotate(${-wheelAnim * STEP})`}>
                  {PROJECTS.map((p, i) => {
                    const a1 = ((i * STEP - STEP / 2) * Math.PI) / 180;
                    const a2 = ((i * STEP + STEP / 2) * Math.PI) / 180;
                    const ac = (i * STEP * Math.PI) / 180;
                    const r = R - 8;
                    const tx = r * 0.6 * Math.cos(ac);
                    const ty = r * 0.6 * Math.sin(ac);
                    const active = i === proj;
                    return (
                      <g key={p.short}>
                        <path
                          d={`M 0 0 L ${r * Math.cos(a1)} ${r * Math.sin(a1)} A ${r} ${r} 0 0 1 ${r * Math.cos(a2)} ${r * Math.sin(a2)} Z`}
                          fill={active ? C.s700 : C.card} stroke={active ? C.s700 : C.s400} strokeWidth="1.5"
                          style={{ transition: `fill ${D_MED}ms ${EASE}, stroke ${D_MED}ms ${EASE}` }} />
                        <text x={tx} y={ty} transform={`rotate(${i * STEP}, ${tx}, ${ty})`}
                          textAnchor="middle" dominantBaseline="middle" fontSize="18" fontWeight="700"
                          fill={active ? C.bg : C.s600}
                          style={{ fontFamily: "'Open Sans', sans-serif", transition: `fill ${D_MED}ms ${EASE}` }}>
                          {p.short}
                        </text>
                      </g>
                    );
                  })}
                </g>
                <circle cx="0" cy="0" r="9" fill={C.s800} />
              </svg>
            </div>
          </Reveal>

          <div className="min-w-0">
            <Reveal><p className="os-eyebrow mb-3 font-semibold" style={{ color: C.s500 }}>Projects</p></Reveal>
            <div key={proj} className="proj-in">
              <h2 className="text-2xl font-extrabold sm:text-4xl">{PROJECTS[proj].name}</h2>
              <p className="mt-3 text-xs font-semibold sm:text-sm" style={{ color: C.s500 }}>{PROJECTS[proj].stack}</p>
              <p className="mt-6 max-w-xl text-sm leading-loose sm:text-base" style={{ color: C.s600 }}>{PROJECTS[proj].body}</p>
            </div>

            <div className="mt-8 flex items-center gap-3 sm:mt-12 sm:gap-4">
              <button onClick={() => goProject(Math.max(0, proj - 1))} aria-label="Previous project"
                className="os-btn flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm"
                style={{ border: `1px solid ${C.s400}`, color: C.s700, background: C.card }}>◁</button>
              <div className="flex items-center gap-2 sm:gap-3">
                {PROJECTS.map((p, i) => (
                  <button key={p.short} onClick={() => goProject(i)} aria-label={`Go to ${p.name}`}
                    className="os-btn h-3 w-3 rounded-full"
                    style={{ background: i === proj ? C.s700 : "transparent", border: `1px solid ${i === proj ? C.s700 : C.s400}`, transition: `background ${D_MED}ms ${EASE}` }} />
                ))}
              </div>
              <button onClick={() => goProject(Math.min(PROJECTS.length - 1, proj + 1))} aria-label="Next project"
                className="os-btn flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm"
                style={{ border: `1px solid ${C.s400}`, color: C.s700, background: C.card }}>▷</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
