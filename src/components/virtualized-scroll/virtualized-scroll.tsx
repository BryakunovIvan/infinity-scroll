import { useState } from "react";

type TProps = {
  items: React.ReactElement[];
  itemHeight: number;
  containerHeight: number;
};

export const VirtualizedScroll = ({
  items,
  itemHeight,
  containerHeight,
}: TProps) => {
  const [scrollTop, setScrollTop] = useState(0);

  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight),
    items.length
  );

  const visibleItems = items.slice(startIndex, endIndex);
  const invisibleItemsHeight =
    (startIndex + visibleItems.length - endIndex) * itemHeight;

  const handleScroll: React.UIEventHandler<HTMLDivElement> = (event) => {
    // @ts-ignore
    setScrollTop(event.target.scrollTop);

    // @ts-ignore
    console.log(event.target.scrollTop);
  };

  return (
    <div
      style={{ height: `${containerHeight}px`, overflowY: "scroll" }}
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
        <div
          style={{
            height: `${invisibleItemsHeight}px`,
          }}
        />
      </div>
    </div>
  );
};
