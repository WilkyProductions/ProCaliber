"use client";

import { useEffect, useState } from "react";

type Stop = [x: number, yFraction: number];

type WireConfig = {
  id: string;
  stops: Stop[];
  duration: number;
  delay: number;
  strokeWidth: number;
};

// x-coordinates are on a fixed 1440-wide canvas; the <svg> stretches that
// horizontally to fill the viewport so positions stay proportional at any
// screen width. y is a fraction of total page height (1 = bottom, 0 = top),
// so lines always span the full page regardless of content length.
//
// Wires are grouped into loose x-position pairs (bundles) with dense
// right-angle jogs — some double back out and return to the same x, like
// conduit runs branching off to a junction box and rejoining — to read as
// an assembly of raceways rather than isolated single lines.
const WIRES: WireConfig[] = [
  // Bundle A
  { id: "w1", duration: 6.4, delay: -1.6, strokeWidth: 1.6, stops: [[56, 1], [56, 0.82], [56, 0.82], [92, 0.82], [92, 0.6], [56, 0.6], [56, 0.34], [56, 0.34], [56, 0]] },
  { id: "w2", duration: 5.2, delay: -4.9, strokeWidth: 1.4, stops: [[100, 1], [100, 0.58], [128, 0.58], [128, 0.3], [100, 0.3], [100, 0]] },

  // Bundle B
  { id: "w3", duration: 7.6, delay: -0.6, strokeWidth: 1.6, stops: [[236, 1], [236, 0.85], [268, 0.85], [268, 0.66], [236, 0.66], [236, 0.44], [210, 0.44], [210, 0.2], [236, 0.2], [236, 0]] },
  { id: "w4", duration: 5.8, delay: -3.4, strokeWidth: 1.4, stops: [[276, 1], [276, 0.7], [276, 0.7], [304, 0.7], [304, 0.36], [276, 0.36], [276, 0]] },

  // Bundle C
  { id: "w5", duration: 6.8, delay: -2.2, strokeWidth: 1.6, stops: [[440, 1], [440, 0.8], [468, 0.8], [468, 0.54], [440, 0.54], [440, 0.3], [466, 0.3], [466, 0.08], [440, 0.08], [440, 0]] },
  { id: "w6", duration: 5.4, delay: -5.6, strokeWidth: 1.4, stops: [[480, 1], [480, 0.48], [504, 0.48], [504, 0.2], [480, 0.2], [480, 0]] },

  // Bundle D
  { id: "w7", duration: 7.0, delay: -1.1, strokeWidth: 1.6, stops: [[664, 1], [664, 0.62], [698, 0.62], [698, 0.34], [664, 0.34], [664, 0]] },
  { id: "w8", duration: 8.2, delay: -3.9, strokeWidth: 1.4, stops: [[706, 1], [706, 0.88], [736, 0.88], [736, 0.64], [706, 0.64], [706, 0.4], [732, 0.4], [732, 0.14], [706, 0.14], [706, 0]] },

  // Bundle E
  { id: "w9", duration: 6.1, delay: -4.3, strokeWidth: 1.6, stops: [[984, 1], [984, 0.7], [1014, 0.7], [1014, 0.42], [984, 0.42], [984, 0]] },
  { id: "w10", duration: 7.4, delay: -0.9, strokeWidth: 1.4, stops: [[1024, 1], [1024, 0.82], [1054, 0.82], [1054, 0.58], [1024, 0.58], [1024, 0.34], [1050, 0.34], [1050, 0.12], [1024, 0.12], [1024, 0]] },

  // Bundle F
  { id: "w11", duration: 5.6, delay: -2.9, strokeWidth: 1.6, stops: [[1244, 1], [1244, 0.58], [1272, 0.58], [1272, 0.3], [1244, 0.3], [1244, 0]] },
  { id: "w12", duration: 6.6, delay: -5.1, strokeWidth: 1.4, stops: [[1284, 1], [1284, 0.76], [1284, 0.76], [1308, 0.76], [1308, 0.44], [1284, 0.44], [1284, 0.2], [1308, 0.2], [1308, 0]] },

  // Edge run
  { id: "w13", duration: 6.0, delay: -1.9, strokeWidth: 1.4, stops: [[1404, 1], [1404, 0.5], [1424, 0.5], [1424, 0.2], [1404, 0.2], [1404, 0]] },
];

function buildPath(stops: Stop[], height: number): { d: string; nodes: [number, number][] } {
  const points = stops.map(([x, yf]) => [x, yf * height] as [number, number]);
  const d = points.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]} ${p[1]}`).join(" ");
  const nodes = points.slice(1, -1);
  return { d, nodes };
}

export default function ElectricBackground() {
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    let raf = 0;
    let debounce: ReturnType<typeof setTimeout>;

    // Mobile browsers fire resize/layout events while their address bar
    // shows/hides during scroll. Debouncing and ignoring sub-threshold
    // changes keeps that from re-triggering every wire's path geometry
    // mid-scroll, which otherwise reads as the background "flashing."
    const measure = () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        raf = requestAnimationFrame(() => {
          const next = document.documentElement.scrollHeight;
          setHeight((prev) => (prev !== null && Math.abs(prev - next) < 40 ? prev : next));
        });
      }, 150);
    };

    setHeight(document.documentElement.scrollHeight);

    const ro = new ResizeObserver(measure);
    ro.observe(document.documentElement);
    window.addEventListener("resize", measure);

    return () => {
      clearTimeout(debounce);
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  if (!height) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 1440 ${height}`}
        preserveAspectRatio="none"
        className="block"
      >
        {WIRES.map((wire, i) => {
          const { d, nodes } = buildPath(wire.stops, height);
          // Two trailing "echo" copies of the same dash, delayed by a
          // fixed fraction of the loop, fake a smooth comet-tail fade
          // behind the bright tip. Because the lag is a phase offset (not
          // tied to position on the path), the tip-to-tail brightness
          // profile stays identical the entire way up — it never resets
          // at a turn, only loops once per full bottom-to-top pass.
          const echo1Delay = wire.delay + wire.duration * 0.05;
          const echo2Delay = wire.delay + wire.duration * 0.11;

          return (
            <g
              key={wire.id}
              // Every other wire is skipped below the sm breakpoint —
              // mobile GPUs choke on too many simultaneously-animating
              // paths over a page-height canvas, which reads as the whole
              // background stuttering during scroll.
              className={i % 2 === 1 ? "hidden sm:block" : undefined}
            >
              <path
                d={d}
                stroke="var(--color-accent-dim)"
                strokeWidth={wire.strokeWidth}
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
              {nodes.map(([nx, ny], j) => (
                <circle
                  key={j}
                  cx={nx}
                  cy={ny}
                  r={3}
                  fill="var(--color-accent-dim)"
                />
              ))}

              {/* Soft blurred halo behind the tip */}
              <path
                d={d}
                stroke="var(--color-accent-bright)"
                strokeWidth={wire.strokeWidth + 3}
                fill="none"
                vectorEffect="non-scaling-stroke"
                pathLength={100}
                strokeDasharray="10 500"
                strokeLinecap="round"
                className="wire-pulse wire-pulse-glow"
                style={{
                  animationDuration: `${wire.duration}s`,
                  animationDelay: `${wire.delay}s`,
                }}
              />

              {/* Trailing echoes, dimmest first so the brighter one paints on top */}
              <path
                d={d}
                stroke="var(--color-accent-bright)"
                strokeWidth={wire.strokeWidth}
                fill="none"
                vectorEffect="non-scaling-stroke"
                pathLength={100}
                strokeDasharray="6 500"
                strokeLinecap="round"
                className="wire-pulse"
                opacity={0.15}
                style={{
                  animationDuration: `${wire.duration}s`,
                  animationDelay: `${echo2Delay}s`,
                }}
              />
              <path
                d={d}
                stroke="var(--color-accent-bright)"
                strokeWidth={wire.strokeWidth}
                fill="none"
                vectorEffect="non-scaling-stroke"
                pathLength={100}
                strokeDasharray="6 500"
                strokeLinecap="round"
                className="wire-pulse"
                opacity={0.4}
                style={{
                  animationDuration: `${wire.duration}s`,
                  animationDelay: `${echo1Delay}s`,
                }}
              />

              {/* Bright tip */}
              <path
                d={d}
                stroke="var(--color-accent-bright)"
                strokeWidth={wire.strokeWidth + 0.4}
                fill="none"
                vectorEffect="non-scaling-stroke"
                pathLength={100}
                strokeDasharray="6 500"
                strokeLinecap="round"
                className="wire-pulse"
                style={{
                  animationDuration: `${wire.duration}s`,
                  animationDelay: `${wire.delay}s`,
                }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
