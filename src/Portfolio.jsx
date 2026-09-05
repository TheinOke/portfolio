import React, { useState, useEffect, useRef, useLayoutEffect, useCallback } from "react";
import emailjs from "@emailjs/browser";

import { PALETTES, SLIDES, PROJECTS, PLANE_CHASE, PLANE_LAG } from "./data";
import { clamp, catmullRom, docPoint } from "./utils";

import GlobalStyles from "./components/GlobalStyles";
import Header from "./components/Header";
import LoadingScreen from "./components/LoadingScreen";
import PaperPlane from "./components/PaperPlane";
import Hero from "./components/Hero";
import About from "./components/About";
import Milestones from "./components/Milestones";
import Projects from "./components/Projects";
import TechStack from "./components/TechStack";
import Contact from "./components/Contact";
import MilestoneModal from "./components/MilestoneModal";

/* Sign up at emailjs.com, add an email service + template, then fill these
   from your dashboard (Account > General for the public key). */
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/* ------------------------------------------------------------------ */
export default function Portfolio() {
  const pathRef = useRef(null);
  const planeGRef = useRef(null);
  const clipRectRef = useRef(null);
  const techStripRef = useRef(null);

  const mStart = useRef(null);
  const mAbout = useRef(null);
  const mAboutB = useRef(null);
  const mLineTop = useRef(null);
  const mLineEnd = useRef(null);
  const mProjA = useRef(null);
  const mProjB = useRef(null);
  const mTech = useRef(null);
  const mTechB = useRef(null);
  const mContact = useRef(null);
  const sendRef = useRef(null);
  const nodeRefs = useRef([]);
  const nodeYs = useRef([]);

  const aboutRef = useRef(null);
  const projRef = useRef(null);
  const techRef = useRef(null);
  const milestonesRef = useRef(null);
  const contactRef = useRef(null);

  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") return saved;
    } catch {}
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  const C = PALETTES[theme];

  useEffect(() => {
    try { localStorage.setItem("theme", theme); } catch {}
    document.documentElement.style.colorScheme = theme;
    document.body.style.background = C.bg;
  }, [theme, C.bg]);

  const [navOpen, setNavOpen] = useState(false);

  const [doc, setDoc] = useState(() => ({
    w: typeof document !== "undefined" ? document.documentElement.clientWidth : 0,
    h: 0,
  }));
  const [pathD, setPathD] = useState("");
  const [slide, setSlide] = useState(0);
  const [proj, setProj] = useState(0);
  const [passedCount, setPassedCount] = useState(0);
  const [openMs, setOpenMs] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sendState, setSendState] = useState("idle"); // idle | sending | sent | error

  const [loading, setLoading] = useState(true);
  const [fading, setFading] = useState(false);

  const samples = useRef([]);        // {l,x,y} lookup along the flight path
  const wheelTarget = useRef(0);
  const [wheelAnim, setWheelAnim] = useState(0);

  const glide = useRef(null);
  const modalOpen = useRef(false);
  modalOpen.current = openMs !== null;

  const isSmall = doc.w > 0 && doc.w < 768;
  const aboutH = isSmall ? 90 + SLIDES.length * 32 : 120 + SLIDES.length * 55;
  const projH = 110 + PROJECTS.length * 52;

  /* font */
  useEffect(() => {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap";
    document.head.appendChild(l);
    return () => { document.head.removeChild(l); };
  }, []);

  /* loading screen */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    const t1 = setTimeout(() => setFading(true), 2000);
    const t2 = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = prev;
      window.dispatchEvent(new Event("rv-settle"));
    }, 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); document.body.style.overflow = prev; };
  }, []);

  /* ---------- flight path ---------- */
  const measure = useCallback(() => {
    const w = document.documentElement.clientWidth;
    const h = document.documentElement.scrollHeight;
    const pts = [];
    const push = (r) => { const p = docPoint(r.current); if (p) pts.push(p); };

    push(mStart);
    push(mAbout);
    push(mAboutB);
    push(mLineTop);
    const ys = [];
    nodeRefs.current.forEach((el) => {
      const p = docPoint(el);
      if (p) { pts.push(p); ys.push(p.y); }
    });
    push(mLineEnd);
    push(mProjA);
    push(mProjB);
    push(mTech);
    push(mTechB);
    push(mContact);
    push(sendRef);

    nodeYs.current = ys;
    setDoc({ w, h });
    setPathD(catmullRom(pts));
  }, []);

  useLayoutEffect(() => {
    measure();
    const timers = [300, 900, 1800, 3000].map((ms) => setTimeout(measure, ms));
    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);
    window.addEventListener("rv-settle", measure);
    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(measure);
      ro.observe(document.body);
    }
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
      window.removeEventListener("rv-settle", measure);
      if (ro) ro.disconnect();
    };
  }, [measure]);

  /* sample the path once per shape change — keeps the per-frame lookup cheap */
  useEffect(() => {
    const path = pathRef.current;
    if (!path || !pathD || !path.getTotalLength) { samples.current = []; return; }
    const total = path.getTotalLength();
    if (!total) { samples.current = []; return; }
    const N = 500;
    const arr = new Array(N + 1);
    for (let i = 0; i <= N; i++) {
      const l = (total * i) / N;
      const pt = path.getPointAtLength(l);
      arr[i] = { l, x: pt.x, y: pt.y };
    }
    samples.current = arr;
  }, [pathD]);

  /* ---------- one rAF loop drives the plane, the slideshow, the wheel and the tech strip ----------
     reading scroll position and writing the plane's transform in the same frame keeps it locked
     to the page; a chase factor (below) is what makes its motion read as slow, floaty flight
     rather than a rigid 1:1 tether. */
  useEffect(() => {
    let raf = 0;
    let lastSlide = -1;
    let lastProj = -1;
    let lastPassed = -1;
    let flownY = null;

    const tick = () => {
      const vh = window.innerHeight;
      const scrollY = window.scrollY;
      const max = Math.max(1, document.documentElement.scrollHeight - vh);
      const p = clamp(scrollY / max, 0, 1);
      const now = performance.now();

      const s = samples.current;
      if (s.length > 1) {
        const y0 = s[0].y;
        const y1 = s[s.length - 1].y;
        const targetY = y0 + p * (y1 - y0);

        if (flownY === null) flownY = targetY;
        flownY += (targetY - flownY) * PLANE_CHASE;
        flownY = clamp(flownY, targetY - vh * PLANE_LAG, targetY + vh * PLANE_LAG);

        // binary search the sampled table (y is monotonic down the page)
        let lo = 0, hi = s.length - 1;
        while (hi - lo > 1) {
          const mid = (lo + hi) >> 1;
          if (s[mid].y < flownY) lo = mid; else hi = mid;
        }
        const a = s[lo], b = s[hi];
        const t = b.y === a.y ? 0 : (flownY - a.y) / (b.y - a.y);
        const x = a.x + (b.x - a.x) * t;
        const y = a.y + (b.y - a.y) * t;
        let ang = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;

        // idle life: a slow bob and a little roll, so it reads as flying even at rest
        const bobY = Math.sin(now / 900) * 6;
        const bobX = Math.cos(now / 1300) * 4;
        ang += Math.sin(now / 1100) * 5;

        if (planeGRef.current) {
          planeGRef.current.setAttribute(
            "transform",
            `translate(${(x + bobX).toFixed(2)},${(y + bobY).toFixed(2)}) rotate(${ang.toFixed(2)}) scale(${isSmall ? 0.8 : 1.15})`
          );
        }
        if (clipRectRef.current) clipRectRef.current.setAttribute("height", String(Math.max(0, y)));

        const ys = nodeYs.current;
        let n = 0;
        for (let i = 0; i < ys.length; i++) if (y >= ys[i] - 4) n++;
        if (n !== lastPassed) { lastPassed = n; setPassedCount(n); }
      }

      if (aboutRef.current) {
        const r = aboutRef.current.getBoundingClientRect();
        const local = clamp(-r.top / Math.max(1, r.height - vh), 0, 0.9999);
        const i = Math.floor(local * SLIDES.length);
        if (i !== lastSlide) { lastSlide = i; setSlide(i); }
      }

      if (projRef.current) {
        const r = projRef.current.getBoundingClientRect();
        const local = clamp(-r.top / Math.max(1, r.height - vh), 0, 0.9999);
        const f = local * PROJECTS.length;
        const i = clamp(Math.floor(f), 0, PROJECTS.length - 1);
        if (i !== lastProj) { lastProj = i; setProj(i); }
        wheelTarget.current = clamp(f - 0.5, 0, PROJECTS.length - 1);
      }

      if (techRef.current && techStripRef.current) {
        const r = techRef.current.getBoundingClientRect();
        const local = clamp(-r.top / Math.max(1, r.height - vh), 0, 1);
        techStripRef.current.style.transform = `translateX(${-local * 50}%)`;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isSmall]);

  /* ---------- damped wheel + magnetic settle ---------- */
  const snapPoints = useCallback(() => {
    const vh = window.innerHeight;
    const pts = [];
    const add = (el, n) => {
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const span = el.offsetHeight - vh;
      for (let i = 0; i < n; i++) pts.push(top + span * ((i + 0.5) / n));
    };
    add(aboutRef.current, SLIDES.length);
    add(projRef.current, PROJECTS.length);
    return pts;
  }, []);

  useEffect(() => {
    if (loading) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    const maxY = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    let target = window.scrollY;
    let running = false;
    let raf = 0;
    let idle = 0;

    const step = () => {
      const cur = window.scrollY;
      const d = target - cur;
      if (Math.abs(d) < 0.5) { window.scrollTo(0, target); running = false; raf = 0; return; }
      window.scrollTo(0, cur + d * 0.075);
      raf = requestAnimationFrame(step);
    };
    const start = () => { if (!running) { running = true; raf = requestAnimationFrame(step); } };
    glide.current = (y) => { target = clamp(y, 0, maxY()); start(); };

    const settle = () => {
      if (modalOpen.current) return;
      const cur = window.scrollY;
      const pts = snapPoints().sort((a, b) => a - b);
      let bestIdx = -1, bestD = Infinity;
      pts.forEach((pt, i) => {
        const d = Math.abs(pt - cur);
        if (d < bestD) { bestD = d; bestIdx = i; }
      });
      if (bestIdx === -1) return;
      const gaps = [];
      if (bestIdx > 0) gaps.push(pts[bestIdx] - pts[bestIdx - 1]);
      if (bestIdx < pts.length - 1) gaps.push(pts[bestIdx + 1] - pts[bestIdx]);
      const minGap = gaps.length ? Math.min(...gaps) : Infinity;
      const maxSnap = Math.min(window.innerHeight * 0.34, minGap * 0.4);
      if (bestD > 2 && bestD < maxSnap) glide.current(pts[bestIdx]);
    };
    const scheduleSettle = () => { clearTimeout(idle); idle = setTimeout(settle, 220); };

    const onWheel = (e) => {
      if (e.ctrlKey || modalOpen.current) return;
      e.preventDefault();
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1;
      target = clamp(target + e.deltaY * unit * 0.55, 0, maxY());
      start();
      scheduleSettle();
    };
    const onScroll = () => {
      if (!running) target = window.scrollY;
      if (coarse) scheduleSettle();
    };
    // A fresh touch, or a real wheel gesture on a coarse pointer (Chrome DevTools
    // device emulation reports coarse but still forwards a real mouse wheel — we
    // don't attach onWheel for coarse, so native scrolling runs unopposed), means
    // the user is actively driving the page: cancel any in-progress snap so it
    // can't fight them.
    const cancelGlide = () => {
      if (running) { running = false; if (raf) { cancelAnimationFrame(raf); raf = 0; } }
      target = window.scrollY;
    };

    if (!reduce && !coarse) window.addEventListener("wheel", onWheel, { passive: false });
    if (!reduce) window.addEventListener("scroll", onScroll, { passive: true });
    if (!reduce) window.addEventListener("touchstart", cancelGlide, { passive: true });
    if (!reduce && coarse) window.addEventListener("wheel", cancelGlide, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchstart", cancelGlide);
      window.removeEventListener("wheel", cancelGlide);
      clearTimeout(idle);
      if (raf) cancelAnimationFrame(raf);
      glide.current = null;
    };
  }, [loading, snapPoints]);

  const scrollToY = (y) => {
    if (glide.current) glide.current(y);
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  const scrollToRef = (ref) => {
    if (!ref.current) return;
    scrollToY(ref.current.getBoundingClientRect().top + window.scrollY);
    setNavOpen(false);
  };

  const NAV_LINKS = [
    { label: "About", ref: aboutRef },
    { label: "Journey", ref: milestonesRef },
    { label: "Projects", ref: projRef },
    { label: "Stack", ref: techRef },
    { label: "Contact", ref: contactRef },
  ];

  /* eased roulette rotation */
  useEffect(() => {
    let raf = 0;
    let cur = 0;
    const tick = () => {
      const d = wheelTarget.current - cur;
      if (Math.abs(d) > 0.0006) { cur += d * 0.075; setWheelAnim(cur); }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const k = (e) => { if (e.key === "Escape") { setOpenMs(null); setNavOpen(false); } };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  const goProject = (i) => {
    const el = projRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    scrollToY(top + span * ((i + 0.5) / PROJECTS.length));
  };

  const sendMail = async () => {
    if (!form.name || !form.email || !form.message || sendState === "sending") return;
    setSendState("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { from_name: form.name, from_email: form.email, message: form.message },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setSendState("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setSendState("error");
    }
  };

  return (
    <div
      className="relative w-full"
      style={{
        background: C.bg,
        color: C.s800,
        fontFamily: "'Open Sans', ui-sans-serif, system-ui, sans-serif",
        overflowX: "clip", // clip, not hidden — hidden would break position:sticky
      }}
    >
      <GlobalStyles C={C} />

      <Header C={C} theme={theme} setTheme={setTheme} navOpen={navOpen} setNavOpen={setNavOpen}
        NAV_LINKS={NAV_LINKS} scrollToY={scrollToY} scrollToRef={scrollToRef} />

      <LoadingScreen C={C} loading={loading} fading={fading} />

      <PaperPlane C={C} doc={doc} pathD={pathD} pathRef={pathRef} clipRectRef={clipRectRef} planeGRef={planeGRef} />

      <Hero C={C} loading={loading} mStart={mStart} scrollToRef={scrollToRef} contactRef={contactRef} />

      <About C={C} theme={theme} aboutRef={aboutRef} aboutH={aboutH} mAbout={mAbout} mAboutB={mAboutB} slide={slide} />

      <Milestones C={C} milestonesRef={milestonesRef} mLineTop={mLineTop} mLineEnd={mLineEnd}
        nodeRefs={nodeRefs} passedCount={passedCount} setOpenMs={setOpenMs} />

      <Projects C={C} projRef={projRef} projH={projH} mProjA={mProjA} mProjB={mProjB}
        proj={proj} wheelAnim={wheelAnim} goProject={goProject} />

      <TechStack C={C} techRef={techRef} mTech={mTech} mTechB={mTechB} techStripRef={techStripRef} />

      <Contact C={C} contactRef={contactRef} mContact={mContact} form={form} setForm={setForm}
        sendMail={sendMail} sendState={sendState} sendRef={sendRef} />

      <MilestoneModal C={C} openMs={openMs} setOpenMs={setOpenMs} />
    </div>
  );
}
