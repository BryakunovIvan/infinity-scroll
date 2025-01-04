import { useState, useEffect, useRef } from "react";
import { FeedItem } from "./feed-item";
import { TFeedItemProps } from "./models";

export const LazyFeedItem = (props: TFeedItemProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        rootMargin: "200px",
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div ref={ref}>
      {isVisible ? (
        <FeedItem {...props} />
      ) : (
        <div style={{ height: 600 }}></div>
      )}
    </div>
  );
};
