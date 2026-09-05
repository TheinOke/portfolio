import React, { useEffect, useRef, useState } from "react";
import { EASE, D_SLOW } from "../data";

/* Word-by-word rise, used for headlines. */
export default function SplitWords({ text, className = "", style = {}, hold = false, delay = 0, stagger = 80, duration = D_SLOW }) {
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
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
