import { useEffect, useRef, useState } from "react";

type TProps = {
  items: React.ReactElement[];
  itemHeight: number;
  containerHeight?: number;
  onScroll?: () => void;
  buffer?: number;
};

export const VirtualizedScroll = ({
  onScroll = () => {},
  items,
  itemHeight,
  containerHeight = 600,
  buffer = 200,
}: TProps) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);

  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight) + 3,
    items.length
  );

  const visibleItems = items.slice(startIndex, endIndex);

  const handleScroll: React.UIEventHandler<HTMLDivElement> = (event) => {
    // @ts-ignore
    setScrollTop(event.target.scrollTop);
    // @ts-ignore
    setScrollHeight(event.target.scrollHeight);
  };

  useEffect(() => {
    console.log(scrollHeight - containerHeight - buffer, scrollTop);
    if (scrollHeight - containerHeight - buffer < scrollTop) {
      onScroll();
    }
  }, [scrollTop, scrollHeight]);

  return (
    <div
      style={{ overflowY: "scroll", height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: `${items.length * itemHeight}px` }}>
        <div
          style={{
            position: "relative",
            height: `${visibleItems.length * itemHeight}px`,
            top: `${startIndex * itemHeight}px`,
          }}
        >
          {visibleItems.map((item) => (
            <div style={{ height: `${itemHeight}px` }}>{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
