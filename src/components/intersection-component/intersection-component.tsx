import { useEffect, useRef } from "react";

type TProps = { callBack: (entry: IntersectionObserverEntry) => void };

export const IntersectionComponent = ({ callBack }: TProps) => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callBack(entry);
      }
    });

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [callBack]);

  return <div ref={ref} style={{ height: 1 }} />;
};
