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
const WIRES: WireConfig[] = [
  { id: "w1", duration: 4.2, delay: -1.1, strokeWidth: 1.6, stops: [[64, 1], [64, 0]] },
  { id: "w2", duration: 5.6, delay: -3.4, strokeWidth: 1.6, stops: [[168, 1], [168, 0.72], [212, 0.72], [212, 0.44], [176, 0.44], [176, 0]] },
  { id: "w3", duration: 3.6, delay: -0.4, strokeWidth: 1.4, stops: [[292, 1], [292, 0.3], [292, 0]] },
  { id: "w4", duration: 6.1, delay: -2.6, strokeWidth: 1.6, stops: [[398, 1], [398, 0.58], [352, 0.58], [352, 0]] },
  { id: "w5", duration: 4.8, delay: -4.1, strokeWidth: 1.4, stops: [[512, 1], [512, 0]] },
  { id: "w6", duration: 5.2, delay: -1.8, strokeWidth: 1.6, stops: [[624, 1], [624, 0.8], [668, 0.8], [668, 0.5], [612, 0.5], [612, 0.2], [656, 0.2], [656, 0]] },
  { id: "w7", duration: 3.9, delay: -2.9, strokeWidth: 1.4, stops: [[748, 1], [748, 0.46], [792, 0.46], [792, 0]] },
  { id: "w8", duration: 5.9, delay: -0.9, strokeWidth: 1.6, stops: [[860, 1], [860, 0]] },
  { id: "w9", duration: 4.5, delay: -3.9, strokeWidth: 1.4, stops: [[974, 1], [974, 0.64], [934, 0.64], [934, 0.28], [986, 0.28], [986, 0]] },
  { id: "w10", duration: 6.4, delay: -1.4, strokeWidth: 1.6, stops: [[1096, 1], [1096, 0.36], [1096, 0]] },
  { id: "w11", duration: 4.0, delay: -4.6, strokeWidth: 1.4, stops: [[1208, 1], [1208, 0.7], [1252, 0.7], [1252, 0]] },
  { id: "w12", duration: 5.4, delay: -2.2, strokeWidth: 1.6, stops: [[1320, 1], [1320, 0.5], [1364, 0.5], [1364, 0]] },
  { id: "w13", duration: 3.7, delay: -3.1, strokeWidth: 1.4, stops: [[1400, 1], [1400, 0]] },
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
        <defs>
          <filter id="wire-glow" x="-75%" y="-75%" width="250%" height="250%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {WIRES.map((wire) => {
          const { d, nodes } = buildPath(wire.stops, height);
          return (
            <g key={wire.id}>
              <path
                d={d}
                stroke="var(--color-accent-dim)"
                strokeWidth={wire.strokeWidth}
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
              {nodes.map(([nx, ny], i) => (
                <circle
                  key={i}
                  cx={nx}
                  cy={ny}
                  r={3}
                  fill="var(--color-accent-dim)"
                />
              ))}
              <path
                d={d}
                stroke="var(--color-accent-bright)"
                strokeWidth={wire.strokeWidth + 0.4}
                fill="none"
                vectorEffect="non-scaling-stroke"
                filter="url(#wire-glow)"
                pathLength={100}
                strokeDasharray="14 500"
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
