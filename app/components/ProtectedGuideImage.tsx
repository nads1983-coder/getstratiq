"use client";

import Image from "next/image";
import type { SyntheticEvent } from "react";

export function ProtectedGuideImage() {
  const block = (event: SyntheticEvent) => event.preventDefault();

  return (
    <div className="protected-guide-frame" onContextMenu={block} onDragStart={block}>
      <Image
        src="/stop-overexplaining-guide-cover.jpg"
        alt="Stop Overexplaining: The Leadership Reset Guide"
        width={768}
        height={1152}
        className="protected-guide-image h-auto w-full rounded-md"
        sizes="(min-width: 1024px) 280px, 68vw"
        draggable={false}
        onContextMenu={block}
        onDragStart={block}
      />
    </div>
  );
}
