import React from "react";
import { useEffect, useState } from "react";
import { FeedItem } from "../feed-item";
import { IImage } from "../../models/image";
import { LazyFeedItem } from "../feed-item/lazy-feed-item";

const getImages = () => {
  return fetch("https://jsonplaceholder.typicode.com/photos").then((response) =>
    response.json()
  );
};

export const FeedContainer = () => {
  const [images, setImages] = useState<IImage[]>([]);

  useEffect(() => {
    getImages().then(setImages);
  }, []);

  return (
    <div style={{ height: "1000px" }}>
      {images.map((item) => (
        <LazyFeedItem
          alt={item.title}
          key={item.id}
          imageURL={item.url}
          id={item.id}
          text={item.title}
        ></LazyFeedItem>
      ))}
    </div>
  );
};
