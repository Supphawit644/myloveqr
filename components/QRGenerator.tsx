"use client";

import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

type Props = {
  url: string;
  size?: number;
  className?: string;
};

export function QRGenerator({ url, size = 220, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  function handleDownload() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "myloveqr.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className={className}>
      <div className="inline-block rounded-3xl bg-white p-4 shadow-glow">
        <QRCodeCanvas
          value={url}
          size={size}
          bgColor="#FFFFFF"
          fgColor="#0b0b0f"
          includeMargin
          ref={canvasRef as unknown as React.RefObject<HTMLCanvasElement>}
        />
      </div>
      <button
        type="button"
        onClick={handleDownload}
        className="mt-3 text-xs font-semibold text-primary hover:text-glow"
      >
        Download QR
      </button>
    </div>
  );
}

