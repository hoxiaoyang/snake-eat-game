import { useRef, useEffect, useState } from 'react';

interface FadeContentProps {
    children: any | undefined;
    blur?: boolean | undefined;
    duration?: number | undefined;
    easing?: string | undefined;
    delay?: number | undefined;
    threshold?: number | undefined;
    finalOpacity?: number | undefined;
    className?: string | undefined;
}

const FadeContent: React.FC<FadeContentProps> = ({
  children,
  // if no blue, will just fade out normally
  blur = false,
  duration = 1000,
  easing = 'ease-out',
  delay = 2000,
  threshold = 0.1,
  finalOpacity = 0,
  className = ''
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(el);
          setTimeout(() => {
            setInView(true);
          }, delay);
        }
      },
      { threshold }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [threshold, delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? finalOpacity : 1,
        transition: `opacity ${duration}ms ${easing}, filter ${duration}ms ${easing}`,
        filter: blur ? (inView ? 'blur(10px)' : 'blur(0px)') : 'none',
      }}
    >
      {children}
    </div>
  );
};

export default FadeContent;
