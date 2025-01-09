import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import { IImage } from "../../models/image";
import { LazyFeedItem } from "../feed-item/lazy-feed-item";
import { IntersectionComponent } from "../intersection-component";
import { FeedItem } from "../feed-item";
import { VirtualizedScroll } from "../virtualized-scroll";

const getImages = ({ page = 1, limit = 5000 }) => {
  return fetch(
    `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`
  ).then((response) => response.json());
};

function debounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  timeout = 500
) {
  let timer: null | ReturnType<typeof setTimeout> = null;
  return (...args: Parameters<T>) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn(...args);
    }, timeout);
  };
}

export const FeedContainer = () => {
  const [images, setImages] = useState<IImage[]>([]);
  const [page, setPage] = useState(1);

  const debouncedGetImages = useCallback(
    debounce((page: number, limit: number) => {
      getImages({ page: page, limit }).then((res) => {
        setPage(page + 1);
        setImages((prevImages) => [...prevImages, ...res]);
      });
    }),
    []
  );

  const handleLoading = () => {
    debouncedGetImages(page, 10);
  };

  useEffect(() => {
    debouncedGetImages(page, 10);
  }, []);

  return (
    <>
      <VirtualizedScroll
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

      {/* {!!images.length && <IntersectionComponent callBack={handleLoading} />} */}
    </>
  );
};
