import React, { useState, useEffect, useRef, useLayoutEffect, useCallback } from "react";

/* ------------------------------------------------------------------
   EDIT THESE FIRST
------------------------------------------------------------------ */
const CV_URL = "/Thein_Oke_Paing_Soe_CV.pdf"; // served from /public
const PHOTO_URL = "data:image/webp;base64,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";   // background already removed
const PLANE_INK = "#0F1112";     // paper-plane line colour (intentionally outside the palette)

/* how the plane flies. CHASE is how much of the gap to the scroll position it closes each
   frame — lower is slower and more floaty. LAG caps how far behind it may fall, in viewport
   heights, so it never drifts so far it looks broken. */
const PLANE_CHASE = 0.014;
const PLANE_LAG = 0.3;

/* motion */
const EASE = "cubic-bezier(.65,0,.35,1)";   // ease-in-out
const D_SLOW = 1200;   // ms — reveals
const D_MED = 900;     // ms — slides, project copy
const D_FAST = 600;    // ms — hovers

/* two palettes, same roles, opposite ends — s800 is always the highest-contrast ink,
   bg always the page canvas, so most of the UI re-themes just by swapping this object. */
const PALETTES = {
  light: {
    bg: "#F8F9FA",
    s100: "#E9ECEF",
    s200: "#DEE2E6",
    s300: "#CED4DA",
    s400: "#ADB5BD",
    s500: "#6C757D",
    s600: "#495057",
    s700: "#343A40",
    s800: "#212529",
    card: "#FFFFFF",
  },
  dark: {
    bg: "#121316",
    s100: "#1C1E21",
    s200: "#2B2E33",
    s300: "#3A3E44",
    s400: "#5A6068",
    s500: "#8B929A",
    s600: "#ADB4BB",
    s700: "#D3D7DC",
    s800: "#F1F3F5",
    card: "#1B1D20",
  },
};

/* Add `img: "https://…"` to any slide to use a real photo instead of the plain card.
   `title`/`body` drive the copy next to the slider, so each slide tells its own part of the story. */
const SLIDES = [
  {
    label: "Yangon, Myanmar", note: "Where it started", img: "",
    title: "Six years of learning, one habit",
    body: [
      "I started with certifications rather than a straight line — NCC diplomas, then ITPEC — because each one forced me to learn a fundamental properly instead of skipping ahead to the framework.",
      "That habit stuck. At Frontiir I work on services where a dropped message or a slow query is something a customer feels, so I care about the boring parts: retries, logging, migrations, and code someone else can read at 2am.",
    ],
  },
  {
    label: "First line of code", note: "NCC Level 4", img: "",
    title: "Where the fundamentals started",
    body: [
      "NCC Level 4 was my introduction to programming, databases and systems analysis — the first time I had to explain, not just use, how software actually works.",
      "It set the pattern I still follow: understand the mechanism underneath a tool before reaching for it.",
    ],
  },
  {
    label: "Exam season", note: "ITPEC IP & FE", img: "",
    title: "Proving it under pressure",
    body: [
      "Passing the ITPEC Information Technology Passport and Fundamental IT Engineer exams meant sitting formal, timed assessments on algorithms, architecture and systems design — no shortcuts.",
      "It's the kind of exam that rewards actually understanding the material, which is exactly why I took it.",
    ],
  },
  {
    label: "University of Greenwich", note: "BSc Computing", img: "",
    title: "Backing it with a degree",
    body: [
      "I'm reading for a BSc (Hons) in Computing at the University of Greenwich, focused on distributed systems and backend engineering.",
      "It runs alongside full-time work, so most of it happens evenings and weekends — theory feeding straight back into what I ship at Frontiir.",
    ],
  },
  {
    label: "Frontiir", note: "Software Engineer", img: "",
    title: "Building it for real, at Frontiir",
    body: [
      "I build backend services, internal tooling and data pipelines for one of Myanmar's largest ISPs — systems where uptime and correctness aren't optional.",
      "It's where the certifications and the degree meet production traffic, real users and real consequences.",
    ],
  },
];

const MILESTONES = [
  { title: "Matriculation Exam passed", year: "2019", body: "Passed the national matriculation examination and moved straight into computing studies.", link: "#", linkLabel: "Download certificate" },
  { title: "NCC Level 4 & Level 5 passed", year: "2022", body: "Completed NCC Education Level 4 and Level 5 Diplomas in Computing — programming, databases and systems analysis.", link: "#", linkLabel: "Download diploma" },
  { title: "ITPEC IP & FE passed", year: "2023", body: "Passed the Information Technology Passport and Fundamental Information Technology Engineer examinations under ITPEC.", link: "#", linkLabel: "Download certificate" },
  { title: "BSc in Computing — University of Greenwich", year: "2024 — present", body: "Reading for a BSc (Hons) in Computing, focused on distributed systems and backend engineering.", link: "#", linkLabel: "Download transcript" },
  { title: "Software Engineer at Frontiir", year: "Mar 2025 — present", body: "Building backend services, internal tooling and data pipelines for one of Myanmar's largest ISPs.", link: "#", linkLabel: "Download resume" },
];

const PROJECTS = [
  { short: "REST API", name: "Service REST API", body: "A production REST API with layered architecture, token auth, request validation and structured logging. Ships with OpenAPI docs and containerised deploys.", stack: "Golang · MySQL · Docker" },
  { short: "RT Web App", name: "Real-time web app", body: "A dashboard that streams live events over websockets, with optimistic UI updates and a reconnect strategy that survives flaky mobile networks.", stack: "React · Tailwind · Golang" },
  { short: "RT Archive", name: "Real-time archive", body: "An ingest and archival service that batches high-volume event streams into queryable cold storage without dropping messages under load.", stack: "Golang · Kafka · MySQL" },
  { short: "CSV Util", name: "CSV utility", body: "A command-line tool for cleaning, diffing and reshaping very large CSV exports. Streams rows instead of loading files into memory.", stack: "Golang · Perl · Linux" },
  { short: "Kafka Util", name: "Kafka utility", body: "Operator tooling for inspecting topics, replaying offsets and moving messages between clusters during migrations.", stack: "Golang · Kafka · Docker" },
];

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";
const TECH = [
  { name: "HTML", icon: `${DEVICON}/html5/html5-original.svg` },
  { name: "CSS", icon: `${DEVICON}/css3/css3-original.svg` },
  { name: "JavaScript", icon: `${DEVICON}/javascript/javascript-original.svg` },
  { name: "Bootstrap", icon: `${DEVICON}/bootstrap/bootstrap-original.svg` },
  { name: "PHP", icon: `${DEVICON}/php/php-original.svg` },
  { name: "Laravel", icon: `${DEVICON}/laravel/laravel-original.svg` },
  { name: "Docker", icon: `${DEVICON}/docker/docker-original.svg` },
  { name: "MySQL", icon: `${DEVICON}/mysql/mysql-original.svg` },
  { name: "Linux", icon: `${DEVICON}/linux/linux-original.svg` },
  { name: "Golang", icon: `${DEVICON}/go/go-original.svg` },
  { name: "Perl", icon: `${DEVICON}/perl/perl-original.svg` },
  { name: "Tailwind", icon: `${DEVICON}/tailwindcss/tailwindcss-original.svg` },
];

const CONTACT = [
  { label: "LinkedIn", value: "linkedin.com/in/theinokepaingsoe", href: "https://linkedin.com/in/theinokepaingsoe" },
  { label: "GitHub", value: "github.com/theinokepaingsoe", href: "https://github.com/theinokepaingsoe" },
  { label: "Phone", value: "+95 9 xxx xxx xxx", href: "tel:+959000000000" },
  { label: "Address", value: "Yangon, Myanmar", href: null },
  { label: "Email", value: "theinokepaingsoe@gmail.com", href: "mailto:theinokepaingsoe@gmail.com" },
];

const BLOB_D =
  "M330 118c26 38 34 92 17 134s-59 71-105 87-95 18-125-6-42-73-38-119 24-92 57-119 79-33 121-22 47 27 73 45z";
/* the blob only occupies x 78–356, y 68–351 of the original 420 box — this viewBox crops to it
   so the shape fills its frame instead of floating in empty padding */
const BLOB_VIEW = "70 60 294 299";

/* ------------------------------------------------------------------ */
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

function catmullRom(pts, t = 1 / 8) {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1 = { x: p1.x + (p2.x - p0.x) * t, y: p1.y + (p2.y - p0.y) * t };
    const c2 = { x: p2.x - (p3.x - p1.x) * t, y: p2.y - (p3.y - p1.y) * t };
    d += ` C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

const docPoint = (el) => {
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2 + window.scrollX, y: r.top + r.height / 2 + window.scrollY };
};

/* Fades and lifts children in when they enter the viewport, out when they leave.
   `hold` keeps it hidden (used so the hero doesn't play behind the loading screen). */
function Reveal({ children, delay = 0, y = 34, className = "", style = {}, duration = D_SLOW, hold = false }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setInView(e.isIntersecting);
        if (e.isIntersecting) {
          // the flight path is anchored to real element positions — re-measure once the lift settles
          setTimeout(() => window.dispatchEvent(new Event("rv-settle")), duration + 150);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [duration]);
  const vis = inView && !hold;
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : `translateY(${y}px)`,
        transition: `opacity ${duration}ms ${EASE} ${delay}ms, transform ${duration}ms ${EASE} ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

/* Word-by-word rise, used for headlines. */
function SplitWords({ text, className = "", style = {}, hold = false, delay = 0, stagger = 80, duration = D_SLOW }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const vis = inView && !hold;
  const words = text.split(" ");
  return (
    <span ref={ref} className={className} style={style}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", paddingBottom: "0.08em" }}>
          <span
            style={{
              display: "inline-block",
              opacity: vis ? 1 : 0,
              transform: vis ? "none" : "translateY(110%)",
              transition: `opacity ${duration}ms ${EASE} ${delay + i * stagger}ms, transform ${duration}ms ${EASE} ${delay + i * stagger}ms`,
            }}
          >
            {w}
          </span>
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
}

/* Sun/moon glyph for the theme toggle — shows the mode a click switches to. */
function ThemeIcon({ theme }) {
  return theme === "dark" ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="5" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.2" y1="4.2" x2="5.6" y2="5.6" />
        <line x1="18.4" y1="18.4" x2="19.8" y2="19.8" />
        <line x1="4.2" y1="19.8" x2="5.6" y2="18.4" />
        <line x1="18.4" y1="5.6" x2="19.8" y2="4.2" />
      </g>
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" fill="currentColor" />
    </svg>
  );
}

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

  const [doc, setDoc] = useState({ w: 0, h: 0 });
  const [pathD, setPathD] = useState("");
  const [slide, setSlide] = useState(0);
  const [proj, setProj] = useState(0);
  const [passedCount, setPassedCount] = useState(0);
  const [openMs, setOpenMs] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const [loading, setLoading] = useState(true);
  const [fading, setFading] = useState(false);

  const samples = useRef([]);        // {l,x,y} lookup along the flight path
  const wheelTarget = useRef(0);
  const [wheelAnim, setWheelAnim] = useState(0);

  const glide = useRef(null);
  const modalOpen = useRef(false);
  modalOpen.current = openMs !== null;

  const isSmall = doc.w > 0 && doc.w < 768;
  const aboutH = 120 + SLIDES.length * 55;
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
      let best = null, bestD = Infinity;
      snapPoints().forEach((pt) => {
        const d = Math.abs(pt - cur);
        if (d < bestD) { bestD = d; best = pt; }
      });
      if (best !== null && bestD > 2 && bestD < window.innerHeight * 0.34) glide.current(best);
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

    if (!reduce && !coarse) window.addEventListener("wheel", onWheel, { passive: false });
    if (!reduce) window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
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

  const sendMail = () => {
    const subject = encodeURIComponent(`Portfolio message from ${form.name || "someone"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`);
    window.location.href = `mailto:theinokepaingsoe@gmail.com?subject=${subject}&body=${body}`;
  };

  const R = 200;
  const step = 360 / PROJECTS.length;
  const input = { background: C.bg, border: `1px solid ${C.s300}`, color: C.s800 };

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
      <style>{`
        .os-in::placeholder { color:${C.s400}; }
        .os-in:focus-visible, .os-btn:focus-visible { outline:2px solid ${C.s600}; outline-offset:2px; }
        .os-eyebrow { font-size:11px; letter-spacing:.28em; text-transform:uppercase; }

        /* sizes Tailwind's arbitrary-value syntax can't provide without a compiler */
        .blob-box { width:18rem; }
        .slides-box { height:15rem; }
        .wheel-box { height:15rem; width:7.5rem; flex-shrink:0; }
        .ms-row { display:flex; align-items:center; gap:1.25rem; }
        .ms-card { width:100%; }
        .proj-grid { display:flex; flex-direction:column; gap:1.75rem; }
        .hero-grid { display:flex; flex-direction:column-reverse; gap:3rem; }
        .about-grid { display:grid; gap:2.5rem; }
        @media (min-width:640px) {
          .blob-box { width:24rem; }
          .slides-box { height:20rem; }
          .wheel-box { height:22rem; width:11rem; }
        }
        @media (min-width:768px) {
          .blob-box { width:27rem; }
          .slides-box { height:28rem; }
          .wheel-box { height:34rem; width:17rem; }
          .ms-row { display:grid; grid-template-columns:1fr auto 1fr; gap:2rem; }
          .ms-card { width:auto; min-width:19rem; }
          .proj-grid { display:grid; grid-template-columns:auto 1fr; align-items:center; gap:3rem; }
          .hero-grid { flex-direction:row; align-items:center; gap:3rem; }
          .about-grid { grid-template-columns:1fr 1fr; align-items:center; gap:4rem; }
        }
        @media (min-width:1024px) {
          .blob-box { width:33rem; }
          .wheel-box { height:38rem; width:19rem; }
          .hero-grid { gap:4rem; }
        }

        @keyframes lineSweep { from { stroke-dashoffset:520; } to { stroke-dashoffset:0; } }
        @keyframes linePulse { 0%,100% { opacity:.18; } 50% { opacity:.5; } }
        @keyframes dotJump { 0%,70%,100% { transform:translateY(0); } 35% { transform:translateY(-7px); } }
        @keyframes projIn { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:none; } }
        .ld-base { animation:linePulse 1.6s ease-in-out infinite; }
        .ld-sweep { stroke-dasharray:80 440; animation:lineSweep 1.6s ease-in-out infinite; }
        .ld-dot { display:inline-block; animation:dotJump 1.2s ease-in-out infinite; }
        .proj-in { animation:projIn ${D_MED}ms ${EASE} both; }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { transition-duration:.01ms !important; animation-duration:.01ms !important; animation-iteration-count:1 !important; }
        }
      `}</style>

      {/* ---------------- nav ---------------- */}
      <header className="fixed inset-x-0 top-0 z-40"
        style={{
          background: `${C.bg}E6`,
          backdropFilter: "blur(10px)",
          borderBottom: `1px solid ${C.s200}`,
          transition: `background ${D_FAST}ms ${EASE}, border-color ${D_FAST}ms ${EASE}`,
        }}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8 md:px-10">
          <button onClick={() => scrollToY(0)} className="os-btn text-sm font-extrabold tracking-tight" style={{ color: C.s800 }}>
            TPS
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

      {/* ---------------- loading ---------------- */}
      {loading && (
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
      )}

      {/* ---------------- paper plane (behind every section) ---------------- */}
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

      {/* ---------------- hero ---------------- */}
      <section className="relative z-10 flex min-h-screen items-center px-5 py-32 sm:px-8 md:px-10 md:py-40">
        <div className="hero-grid mx-auto w-full max-w-6xl">
          {/* copy — left on desktop */}
          <div className="flex-1">
            <Reveal hold={loading} y={18} duration={D_MED}>
              <p className="os-eyebrow font-semibold" style={{ color: C.s500 }}>Portfolio</p>
            </Reveal>

            <h1 className="mt-6 text-3xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              <SplitWords text="Thein Oke Paing Soe" hold={loading} delay={250} stagger={110} />
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

      {/* ---------------- about ---------------- */}
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
                      <span className="relative mt-4 text-xl font-bold sm:text-2xl" style={{ color: C.s800 }}>{s.label}</span>
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

      {/* ---------------- milestones ---------------- */}
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

      {/* ---------------- projects ---------------- */}
      <section ref={projRef} className="relative z-20" style={{ height: `${projH}vh` }}>
        <span ref={mProjA} className="absolute block h-0 w-0" style={{ left: "84%", top: "6%" }} />
        <span ref={mProjB} className="absolute block h-0 w-0" style={{ left: "18%", top: "94%" }} />
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="proj-grid mx-auto w-full max-w-6xl px-5 sm:px-8 md:px-10">
            <Reveal y={40}>
              <div className="wheel-box">
                <svg viewBox={`0 ${-R} ${R} ${R * 2}`} className="h-full w-full" aria-hidden="true">
                  <g transform={`rotate(${-wheelAnim * step})`}>
                    {PROJECTS.map((p, i) => {
                      const a1 = ((i * step - step / 2) * Math.PI) / 180;
                      const a2 = ((i * step + step / 2) * Math.PI) / 180;
                      const ac = (i * step * Math.PI) / 180;
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
                          <text x={tx} y={ty} transform={`rotate(${i * step}, ${tx}, ${ty})`}
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

      {/* ---------------- tech stack ---------------- */}
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

      {/* ---------------- contact ---------------- */}
      <section id="contact" ref={contactRef} className="relative z-10 mx-auto max-w-6xl px-5 pb-16 pt-20 sm:px-8 md:px-10 md:pb-20 md:pt-28">
        <div className="grid gap-10 rounded-2xl p-6 sm:p-10 md:grid-cols-2 md:gap-16 md:p-14"
          style={{ background: C.card, border: `1px solid ${C.s200}` }}>
          <div>
            <Reveal><p className="os-eyebrow mb-3 font-semibold" style={{ color: C.s500 }}>Contact me</p></Reveal>
            <h2 className="text-2xl font-extrabold sm:text-4xl">
              <SplitWords text="Let's talk" delay={100} stagger={110} />
            </h2>
            <Reveal delay={240}>
              <p className="mt-5 max-w-md text-sm leading-loose sm:text-base" style={{ color: C.s600 }}>
                Open to backend and full-stack work, freelance builds and anything involving Go, queues or stubborn data.
                Replies usually land within a day.
              </p>
            </Reveal>
            <span ref={mContact} className="block h-0 w-0" />
            <dl className="mt-10 space-y-5">
              {CONTACT.map((c, i) => (
                <Reveal key={c.label} delay={120 * i} y={20}>
                  <dt className="os-eyebrow font-semibold" style={{ color: C.s400 }}>{c.label}</dt>
                  <dd className="mt-1 break-words text-sm font-semibold" style={{ color: C.s700 }}>
                    {c.href ? <a href={c.href} target="_blank" rel="noreferrer" className="underline underline-offset-4">{c.value}</a> : c.value}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>

          <Reveal className="flex flex-col justify-center gap-4" delay={150}>
            <input className="os-in w-full rounded-md px-4 py-3 text-sm" style={input} placeholder="Your name"
              value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="os-in w-full rounded-md px-4 py-3 text-sm" style={input} placeholder="Your email" inputMode="email"
              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <textarea rows={5} className="os-in w-full resize-none rounded-md px-4 py-3 text-sm" style={input} placeholder="What are you working on?"
              value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            <button ref={sendRef} onClick={sendMail}
              className="os-btn w-full rounded-md px-8 py-3 text-sm font-semibold sm:w-auto sm:self-end"
              style={{ background: C.s800, color: C.bg, transition: `background ${D_FAST}ms ${EASE}` }}
              onMouseEnter={(e) => (e.currentTarget.style.background = C.s700)}
              onMouseLeave={(e) => (e.currentTarget.style.background = C.s800)}>
              Send message
            </button>
          </Reveal>
        </div>
        <p className="mt-12 text-center text-xs" style={{ color: C.s400 }}>© {new Date().getFullYear()} Thein Oke Paing Soe</p>
      </section>

      {/* ---------------- modal ---------------- */}
      {openMs !== null && (
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
      )}
    </div>
  );
}
