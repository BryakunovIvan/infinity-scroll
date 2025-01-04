import { useState } from "react";
import { TFeedItemProps } from "./models";

export const FeedItem = ({ imageURL, id, text, alt }: TFeedItemProps) => {
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  const handleLoading = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <>
      <h1>{text}</h1>
      {isLoading && <h1>Loading...</h1>}
      {isError && <h1>ERROR</h1>}
      <img
        src={imageURL}
        data-test-id={id}
        alt={alt}
        width={600}
        height={600}
        onLoad={handleLoading}
        onError={handleError}
      ></img>
    </>
  );
};
