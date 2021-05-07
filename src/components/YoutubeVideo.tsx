import React from "react";

type Props = {
  src: string;
};

export default function YoutubeVideo({ src }: Props) {
  return (
    <div className="centered full-width">
      <div className="youtube-video-inner-container">
        <div className="youtube-video">
          <iframe
            width="560"
            height="315"
            src={src}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
