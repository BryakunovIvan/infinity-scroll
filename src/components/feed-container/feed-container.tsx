import React from "react";
import { useEffect, useState } from "react";
import { FeedItem } from "../feed-item";
import { IImage } from "../../models/image";

export const FeedContainer = () => {
  const [images, setImages] = useState<IImage[]>([]);

  useEffect(() => {
    console.log("fetch...");
  });

  return (
    <div>
      {images.map((item) => (
        <FeedItem key={item.id} imageURL={item.url} id={item.id}></FeedItem>
      ))}
    </div>
  );
};
