import React, { useEffect } from "react";

type Props = {
  formId: string;
};

export default function NGPVanForm({ formId }: Props) {
  useEffect(() => {
    loadNGPScripts();
  }, []);
  return (
    <div id="ngp-van-container">
      <div
        className="ngp-form"
        data-form-url={formId}
        data-fastaction-endpoint="https://fastaction.ngpvan.com"
        data-inline-errors="true"
        data-fastaction-nologin="true"
        data-databag-endpoint="https://profile.ngpvan.com"
        data-databag="everybody"
        data-mobile-autofocus="false"
      ></div>
    </div>
  );
}

function loadNGPScripts() {
  try {
    //@ts-ignore
    delete window.nvtag;
    const container = document.getElementById("ngp-van-container");
    const script = document.createElement("script");
    script.src = "https://d3rse9xjbp8270.cloudfront.net/at.js";
    script.setAttribute("crossorigin", '"anonymous"');
    container.appendChild(script);
    // Fix scrolling somehow broken by this van script... yikes...
    script.onload = window.scrollTo = (...args) => document.querySelector("body").scrollTo(...args);
  } catch (e) {
    console.error("Failed to load the Van form");
  }
}
