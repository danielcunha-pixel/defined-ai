"use client";

import * as React from "react";

type ViewportIframeProps = {
  frameId: string;
  src: string;
  title: string;
  viewportWidth: number;
  initialHeight?: number;
};

export function ViewportIframe({
  frameId,
  src,
  title,
  viewportWidth,
  initialHeight = 320,
}: ViewportIframeProps) {
  const [height, setHeight] = React.useState(initialHeight);

  React.useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      const data = event.data as { type?: string; frameId?: string; height?: number };
      if (data?.type !== "qa-frame-size") return;
      if (data?.frameId !== frameId) return;
      if (typeof data.height === "number" && Number.isFinite(data.height) && data.height > 0) {
        setHeight(Math.ceil(data.height));
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [frameId]);

  const frameSrc = `${src}${src.includes("?") ? "&" : "?"}frameId=${encodeURIComponent(frameId)}`;

  return (
    <iframe
      title={title}
      src={frameSrc}
      scrolling="no"
      style={{ width: viewportWidth, height }}
      className="block border-0"
    />
  );
}
