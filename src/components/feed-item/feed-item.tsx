type TProps = { imageURL: string; id: number };

export const FeedItem = ({ imageURL, id }: TProps) => {
  return <image href={imageURL} data-test-id={id}></image>;
};
