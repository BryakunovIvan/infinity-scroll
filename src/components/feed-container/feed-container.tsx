import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import { IImage } from "../../models/image";
import { FeedItem } from "../feed-item";
import { VirtualizedScroll } from "../virtualized-scroll";
import { throttle } from "../../helpers/throttle";

const getImages = ({ page = 1, limit = 5000 }) => {
  return fetch(
    `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`
  ).then((response) => response.json());
};

export const FeedContainer = () => {
  const [images, setImages] = useState<IImage[]>([]);
  const [page, setPage] = useState(1);

  const trottledGetImages = useCallback(
    throttle((page: number, limit: number) => {
      getImages({ page: page, limit }).then((res) => {
        setPage(page + 1);
        setImages((prevImages) => [...prevImages, ...res]);
      });
    }),
    []
  );

  const handleLoading = () => {
    trottledGetImages(page, 10);
  };

  useEffect(() => {
    trottledGetImages(page, 10);
  }, []);

  return (
    <>
      <VirtualizedScroll
        buffer={2000}
        onScroll={handleLoading}
        items={images.map((item) => (
          <FeedItem
            alt={item.title}
            key={item.id}
            imageURL={item.url}
            id={item.id}
            text={item.title}
          ></FeedItem>
        ))}
        itemHeight={700}
        containerHeight={1200}
      ></VirtualizedScroll>
    </>
  );
};
