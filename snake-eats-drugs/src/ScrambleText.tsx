import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

export interface ScrambledTextProps {
  radius?: number;
  duration?: number;
  speed?: number;
  scrambleChars?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const ScrambledText: React.FC<ScrambledTextProps> = ({
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = ".:",
  className = "",
  style = {},
  children,
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const split = SplitText.create(rootRef.current.querySelector("p"), {
      type: "chars",
      charsClass: "inline-block will-change-transform",
    });

    interface CharElement extends HTMLElement {
      dataset: {
      content?: string;
      [key: string]: string | undefined;
      };
    }

    split.chars.forEach((el: Element) => {
      const c = el as CharElement;
      gsap.set(c, { attr: { "data-content": c.innerHTML } });
    });

    const handleMove = (e: PointerEvent) => {
      interface CharElement extends HTMLElement {
        dataset: {
          content?: string;
          [key: string]: string | undefined;
        };
      }

      interface PointerMoveEvent extends PointerEvent {}

      split.chars.forEach((el: Element) => {
        const c = el as CharElement;
        const { left, top, width, height } = c.getBoundingClientRect();
        const dx: number = (e as PointerMoveEvent).clientX - (left + width / 2);
        const dy: number = (e as PointerMoveEvent).clientY - (top + height / 2);
        const dist: number = Math.hypot(dx, dy);

        if (dist < radius) {
          gsap.to(c, {
            overwrite: true,
            duration: duration * (1 - dist / radius),
            scrambleText: {
              text: c.dataset.content || "",
              chars: scrambleChars,
              speed,
            },
            ease: "none",
          });
        }
      });
    };

    const el = rootRef.current;
    el.addEventListener("pointermove", handleMove);

    return () => {
      el.removeEventListener("pointermove", handleMove);
      split.revert();
    };
  }, [radius, duration, speed, scrambleChars]);

  return (
    <div
      ref={rootRef}
      className={className}
      style={{
        ...style,
        fontFamily: "monospace",
        fontSize: "clamp(14px, 4vw, 32px)",
        color: "white",
      }}
    >
      <p
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "2rem",
          boxSizing: "border-box",
        }}
      >
        {children}
      </p>
    </div>
  );
};

export default ScrambledText;
