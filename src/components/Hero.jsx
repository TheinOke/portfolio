import React from "react";
import Reveal from "./Reveal";
import SplitWords from "./SplitWords";
import SplitChars from "./SplitChars";
import { CV_URL, PHOTO_URL, BLOB_D, BLOB_VIEW, EASE, D_MED, D_FAST } from "../data";

export default function Hero({ C, loading, mStart, scrollToRef, contactRef }) {
  return (
    <section className="relative z-10 flex min-h-screen items-center px-5 py-32 sm:px-8 md:px-10 md:py-40">
      <div className="hero-grid mx-auto w-full max-w-6xl">
        {/* copy — left on desktop */}
        <div className="flex-1">
          <Reveal hold={loading} y={18} duration={D_MED}>
            <p className="os-eyebrow font-semibold" style={{ color: C.s500 }}>Portfolio</p>
          </Reveal>

          <h1 className="mt-6 text-3xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            <SplitChars text="Thein Oke Paing Soe" hold={loading} delay={250} stagger={28} />
          </h1>

          <p className="mt-3 text-base font-semibold sm:text-xl" style={{ color: C.s600 }}>
            <SplitWords text="Software Engineer" hold={loading} delay={800} stagger={90} duration={D_MED} />
          </p>

          <Reveal hold={loading} delay={1050} y={26}>
            <p className="mt-8 max-w-lg text-sm leading-loose sm:text-base" style={{ color: C.s600 }}>
              I build backend services and the tooling around them — REST APIs, real-time pipelines and command-line
              utilities that hold up under load. Currently engineering at Frontiir and reading for a BSc in Computing
              at the University of Greenwich.
            </p>
          </Reveal>

          <Reveal hold={loading} delay={1200} y={26}>
            <p className="mt-5 max-w-lg text-sm leading-loose sm:text-base" style={{ color: C.s500 }}>
              Mostly Golang and PHP on the server, React and Tailwind when the work reaches the browser, Docker and
              Linux everywhere in between.
            </p>
          </Reveal>

          <Reveal hold={loading} delay={1400} y={22}>
            <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a href={CV_URL} download="Thein_Oke_Paing_Soe_CV.pdf"
                className="os-btn inline-block rounded-md px-7 py-3 text-sm font-semibold tracking-wide"
                style={{ background: C.s800, color: C.bg, transition: `background ${D_FAST}ms ${EASE}` }}
                onMouseEnter={(e) => (e.currentTarget.style.background = C.s700)}
                onMouseLeave={(e) => (e.currentTarget.style.background = C.s800)}>
                Download CV
              </a>
              <span ref={mStart} className="block h-0 w-0" />
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToRef(contactRef); }}
                className="text-sm font-semibold underline underline-offset-4" style={{ color: C.s600 }}>Get in touch</a>
            </div>
          </Reveal>
        </div>

        {/* blob — right on desktop */}
        <div className="flex flex-1 justify-center md:justify-end">
          <Reveal hold={loading} delay={150} y={40}>
            <svg viewBox={BLOB_VIEW} className="blob-box" role="img" aria-label="Thein Oke Paing Soe">
              <defs>
                <clipPath id="blobClip"><path d={BLOB_D} /></clipPath>
                <linearGradient id="blobFill" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={C.s200} />
                  <stop offset="100%" stopColor={C.s400} />
                </linearGradient>
                <filter id="innerShadow" x="-30%" y="-30%" width="160%" height="160%">
                  <feOffset dx="0" dy="10" />
                  <feGaussianBlur stdDeviation="14" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="arithmetic" k2="-1" k3="1" result="inner" />
                  <feColorMatrix in="inner" type="matrix" values="0 0 0 0 0.13 0 0 0 0 0.14 0 0 0 0 0.16 0 0 0 0.6 0" />
                </filter>
              </defs>
              <g clipPath="url(#blobClip)">
                <rect x="60" y="50" width="320" height="330" fill="url(#blobFill)" />
                {PHOTO_URL ? (
                  <image href={PHOTO_URL} x="74" y="62" width="286" height="374" preserveAspectRatio="xMidYMin meet" />
                ) : (
                  <text x="217" y="230" textAnchor="middle" fontSize="86" fontWeight="800" fill={C.s600}
                    style={{ fontFamily: "'Open Sans', sans-serif" }}>TPS</text>
                )}
                <path d={BLOB_D} fill="none" stroke={C.s800} strokeOpacity="0.4" strokeWidth="30" filter="url(#innerShadow)" />
              </g>
              <path d={BLOB_D} fill="none" stroke={C.s300} strokeWidth="2" />
            </svg>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
