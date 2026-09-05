import React from "react";
import Reveal from "./Reveal";
import { SLIDES, EASE, D_MED } from "../data";

export default function About({ C, theme, aboutRef, aboutH, mAbout, mAboutB, slide }) {
  const labelFill = theme === "dark" ? "#FFFFFF" : "#000000";
  const labelOutline = theme === "dark" ? "" : "#FFFFFF";
  return (
    <section ref={aboutRef} className="relative z-20" style={{ height: `${aboutH}vh` }}>
      <span ref={mAbout} className="absolute block h-0 w-0" style={{ left: "12%", top: "9%" }} />
      <span ref={mAboutB} className="absolute block h-0 w-0" style={{ left: "82%", top: "58%" }} />
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="about-grid mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 md:px-10 md:py-24">
          <Reveal className="order-2 md:order-1" y={40}>
            <div className="slides-box relative overflow-hidden rounded-2xl"
              style={{ background: C.s100, border: `1px solid ${C.s200}` }}>
              {SLIDES.map((s, i) => {
                const active = i === slide;
                return (
                  <div key={s.label}
                    className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
                    style={{
                      opacity: active ? 1 : 0,
                      transform: `translateY(${active ? 0 : i < slide ? -34 : 34}px) scale(${active ? 1 : 1.03})`,
                      transition: `opacity ${D_MED}ms ${EASE}, transform ${D_MED}ms ${EASE}`,
                      background: C.s100,
                    }}>
                    {s.img ? <img src={s.img} alt={s.label} className="absolute inset-0 h-full w-full object-cover" /> : null}
                    <span className="relative os-eyebrow font-semibold" style={{ color: C.s500 }}>{`0${i + 1} / 0${SLIDES.length}`}</span>
                    <span className="relative mt-4 text-xl font-bold sm:text-2xl"
                      style={{
                        color: labelFill,
                        WebkitTextStroke: `1px ${labelOutline}`,
                        paintOrder: "stroke fill",
                        textShadow: `-1px -1px 0 ${labelOutline}, 1px -1px 0 ${labelOutline}, -1px 1px 0 ${labelOutline}, 1px 1px 0 ${labelOutline}`,
                      }}>{s.label}</span>
                    <span className="relative mt-2 text-xs sm:text-sm" style={{ color: C.s600 }}>{s.note}</span>
                  </div>
                );
              })}
              <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
                {SLIDES.map((s, i) => (
                  <span key={s.label} className="h-1.5 rounded-full"
                    style={{ width: i === slide ? 24 : 8, background: i === slide ? C.s700 : C.s400, transition: `width ${D_MED}ms ${EASE}, background ${D_MED}ms ${EASE}` }} />
                ))}
              </div>
            </div>
          </Reveal>

          <div className="order-1 md:order-2">
            <Reveal><p className="os-eyebrow mb-4 font-semibold" style={{ color: C.s500 }}>About me</p></Reveal>
            <div key={slide} className="proj-in">
              <h2 className="text-2xl font-extrabold sm:text-4xl">{SLIDES[slide].title}</h2>
              {SLIDES[slide].body.map((p, i) => (
                <p key={i} className={`text-sm leading-loose sm:text-base ${i === 0 ? "mt-6 sm:mt-8" : "mt-5 hidden sm:block"}`} style={{ color: C.s600 }}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
