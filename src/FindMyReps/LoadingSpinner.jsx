import React from "react";

export default function LoadingSpinner() {
  return (
    <svg style={{ width: 25, height: 25 }} viewBox="0 0 24 24">
      <path d="M12,20.5v-3c3,0,5.5-2.5,5.5-5.5c0-3-2.5-5.5-5.5-5.5v-3c4.7,0,8.5,3.8,8.5,8.5C20.5,16.7,16.7,20.5,12,20.5z">
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          dur="1s"
          from="0 12 12"
          to="360 12 12"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}
