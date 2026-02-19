"use client";

import * as React from "react";

function getDocumentHeight() {
  const body = document.body;
  const html = document.documentElement;
  return Math.max(
    body?.scrollHeight ?? 0,
    body?.offsetHeight ?? 0,
    html?.clientHeight ?? 0,
    html?.scrollHeight ?? 0,
    html?.offsetHeight ?? 0
  );
}

export function FrameSizeReporter() {
  React.useEffect(() => {
    const frameId = new URLSearchParams(window.location.search).get("frameId") ?? "default";

    document.documentElement.style.margin = "0";
    document.documentElement.style.overflow = "hidden";
    document.body.style.margin = "0";
    document.body.style.overflow = "hidden";

    const postSize = () => {
      window.parent.postMessage(
        {
          type: "qa-frame-size",
          frameId,
          height: getDocumentHeight(),
        },
        window.location.origin
      );
    };

    postSize();

    const observer = new ResizeObserver(() => postSize());
    observer.observe(document.documentElement);
    if (document.body) observer.observe(document.body);

    window.addEventListener("load", postSize);
    window.addEventListener("resize", postSize);

    return () => {
      observer.disconnect();
      window.removeEventListener("load", postSize);
      window.removeEventListener("resize", postSize);
    };
  }, []);

  return null;
}

