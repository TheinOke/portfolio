import React, { useEffect, useRef, useState } from "react";

const NBSP = " ";

/* Character-by-character rise + rotate, used for the hero name. */
export default function SplitChars({ text, className = "", style = {}, hold = false, delay = 0, stagger = 28 }) {
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
  return (
    <span
      ref={ref}
      className={`${className}${vis ? " play" : ""}`}
      style={{ ...style, "--char-delay": `${delay}ms`, "--char-stagger": `${stagger}ms` }}
      aria-label={text}
    >
      {[...text].map((ch, i) => (
        <span key={i} className="char" style={{ "--i": i }} aria-hidden="true">
          {ch === " " ? NBSP : ch}
        </span>
      ))}
    </span>
  );
}
