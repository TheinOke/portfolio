import React, { useEffect, useRef, useState } from "react";
import { EASE, D_SLOW } from "../data";

/* Fades and lifts children in when they enter the viewport, out when they leave.
   `hold` keeps it hidden (used so the hero doesn't play behind the loading screen). */
export default function Reveal({ children, delay = 0, y = 34, className = "", style = {}, duration = D_SLOW, hold = false }) {
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
