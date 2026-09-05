import React from "react";
import Reveal from "./Reveal";
import SplitWords from "./SplitWords";
import { MILESTONES, EASE, D_MED, D_SLOW } from "../data";

export default function Milestones({ C, milestonesRef, mLineTop, mLineEnd, nodeRefs, passedCount, setOpenMs }) {
  return (
    <section ref={milestonesRef} className="relative z-10 mx-auto max-w-5xl px-5 py-28 sm:px-8 md:px-10 md:py-36">
      <Reveal><p className="os-eyebrow mb-3 text-center font-semibold" style={{ color: C.s500 }}>Milestones</p></Reveal>
      <h2 className="text-center text-2xl font-extrabold sm:text-4xl">
        <SplitWords text="The route so far" delay={100} stagger={90} />
      </h2>
      <span ref={mLineTop} className="mx-auto mt-16 block h-0 w-0" />

      <ol className="mt-8 space-y-12 md:space-y-20">
        {MILESTONES.map((m, i) => {
          const passed = i < passedCount;
          const left = i % 2 === 1;
          return (
            <li key={m.title} className="ms-row">
              <div className="flex shrink-0 justify-center md:col-start-2 md:row-start-1">
                <span ref={(el) => (nodeRefs.current[i] = el)}
                  className="flex h-7 w-7 items-center justify-center rounded-full"
                  style={{
                    background: passed ? C.s700 : C.bg,
                    border: `2px solid ${passed ? C.s700 : C.s300}`,
                    boxShadow: passed ? "0 0 0 7px rgba(52,58,64,0.10)" : "none",
                    transition: `background ${D_MED}ms ${EASE}, border-color ${D_MED}ms ${EASE}, box-shadow ${D_MED}ms ${EASE}`,
                  }}>
                  <span className="h-2 w-2 rounded-full" style={{ background: passed ? C.bg : C.s300, transition: `background ${D_MED}ms ${EASE}` }} />
                </span>
              </div>

              <Reveal className={`min-w-0 flex-1 md:row-start-1 ${left ? "md:col-start-1 md:text-right" : "md:col-start-3"}`} y={26}>
                <button onClick={() => setOpenMs(i)}
                  className="ms-card os-btn rounded-xl px-5 py-5 text-left sm:px-6 sm:py-6"
                  style={{
                    background: passed ? C.card : C.s100,
                    border: `1px solid ${passed ? C.s700 : C.s200}`,
                    boxShadow: passed ? "0 12px 30px rgba(33,37,41,0.09)" : "none",
                    transform: passed ? "translateY(0)" : "translateY(8px)",
                    transition: `background ${D_SLOW}ms ${EASE}, border-color ${D_SLOW}ms ${EASE}, transform ${D_SLOW}ms ${EASE}, box-shadow ${D_SLOW}ms ${EASE}`,
                  }}>
                  <span className="os-eyebrow block font-semibold" style={{ color: passed ? C.s600 : C.s400, transition: `color ${D_SLOW}ms ${EASE}` }}>{m.year}</span>
                  <span className="mt-3 block text-base font-bold leading-snug sm:text-lg" style={{ color: passed ? C.s800 : C.s500, transition: `color ${D_SLOW}ms ${EASE}` }}>{m.title}</span>
                  <span className="mt-4 block text-xs font-semibold underline underline-offset-4" style={{ color: C.s500 }}>Open details</span>
                </button>
              </Reveal>

              <div className={`hidden md:block md:row-start-1 ${left ? "md:col-start-3" : "md:col-start-1"}`} />
            </li>
          );
        })}
      </ol>
      <span ref={mLineEnd} className="mx-auto mt-20 block h-0 w-0" />
    </section>
  );
}
