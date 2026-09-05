import React from "react";
import ThemeIcon from "./ThemeIcon";
import { EASE, D_FAST, D_MED } from "../data";

export default function Header({ C, theme, setTheme, navOpen, setNavOpen, NAV_LINKS, scrollToY, scrollToRef }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40"
      style={{
        background: `${C.bg}E6`,
        backdropFilter: "blur(10px)",
        borderBottom: `1px solid ${C.s200}`,
        transition: `background ${D_FAST}ms ${EASE}, border-color ${D_FAST}ms ${EASE}`,
      }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8 md:px-10">
        <button onClick={() => scrollToY(0)} className="os-btn text-sm font-extrabold tracking-tight" style={{ color: C.s800 }}>
          Thein Oke
        </button>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <button key={l.label} onClick={() => scrollToRef(l.ref)}
              className="os-btn text-sm font-semibold" style={{ color: C.s600, transition: `color ${D_FAST}ms ${EASE}` }}>
              {l.label}
            </button>
          ))}
          <button onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))} aria-label="Toggle color theme"
            className="os-btn flex h-9 w-9 items-center justify-center rounded-full"
            style={{ border: `1px solid ${C.s300}`, color: C.s700 }}>
            <ThemeIcon theme={theme} />
          </button>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <button onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))} aria-label="Toggle color theme"
            className="os-btn flex h-9 w-9 items-center justify-center rounded-full"
            style={{ border: `1px solid ${C.s300}`, color: C.s700 }}>
            <ThemeIcon theme={theme} />
          </button>
          <button onClick={() => setNavOpen((v) => !v)} aria-label="Toggle menu" aria-expanded={navOpen}
            className="os-btn flex h-9 w-9 items-center justify-center rounded-md"
            style={{ border: `1px solid ${C.s300}`, color: C.s700 }}>
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
              <line x1="0" y1="1" x2="18" y2="1" stroke="currentColor" strokeWidth="2"
                style={{ transformOrigin: "9px 1px", transition: `transform ${D_FAST}ms ${EASE}`, transform: navOpen ? "translateY(6px) rotate(45deg)" : "none" }} />
              <line x1="0" y1="7" x2="18" y2="7" stroke="currentColor" strokeWidth="2"
                style={{ transition: `opacity ${D_FAST}ms ${EASE}`, opacity: navOpen ? 0 : 1 }} />
              <line x1="0" y1="13" x2="18" y2="13" stroke="currentColor" strokeWidth="2"
                style={{ transformOrigin: "9px 13px", transition: `transform ${D_FAST}ms ${EASE}`, transform: navOpen ? "translateY(-6px) rotate(-45deg)" : "none" }} />
            </svg>
          </button>
        </div>
      </div>

      <div className="overflow-hidden md:hidden" style={{ maxHeight: navOpen ? 320 : 0, transition: `max-height ${D_MED}ms ${EASE}` }}>
        <nav className="flex flex-col gap-1 px-5 pb-4 sm:px-8">
          {NAV_LINKS.map((l) => (
            <button key={l.label} onClick={() => scrollToRef(l.ref)}
              className="os-btn rounded-md px-2 py-2.5 text-left text-sm font-semibold" style={{ color: C.s600 }}>
              {l.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
