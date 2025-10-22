import React, { useEffect } from "react";

export default function Modal({
  open,
  onClose,
  title,
  width = 1000,
  maxWidth = "90vw",
  fullscreen = false,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  width?: number | string;
  maxWidth?: number | string;
  fullscreen?: boolean;
  children?: React.ReactNode;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      window.addEventListener("keydown", onKey);
    }
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: fullscreen ? "var(--mk-card)" : "rgba(0,0,0,0.4)",
        padding: fullscreen ? 0 : 16,
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: fullscreen ? "100vw" : width,
          maxWidth: fullscreen ? "100vw" : maxWidth,
          height: fullscreen ? "100vh" : "auto",
          maxHeight: fullscreen ? "100vh" : "90vh",
          background: "var(--mk-card)",
          border: fullscreen ? 0 : "1px solid var(--mk-border)",
          borderRadius: fullscreen ? 0 : 12,
          boxShadow: fullscreen ? "none" : "0 8px 24px rgba(16, 24, 40, 0.2)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 16px",
              borderBottom: "1px solid var(--mk-border)",
            }}
          >
            <div style={{ fontWeight: 600 }}>{title}</div>
            <button
              onClick={onClose}
              style={{
                background: "transparent",
                border: 0,
                fontSize: 16,
                cursor: "pointer",
              }}
              aria-label="Zamknij"
            >
              ×
            </button>
          </div>
        )}
        <div
          style={{
            padding: fullscreen ? 0 : 12,
            overflow: "auto",
            flex: fullscreen ? 1 : "initial",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
