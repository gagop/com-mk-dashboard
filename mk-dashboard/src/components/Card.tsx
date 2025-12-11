export default function Card({
  title,
  subtitle,
  right,
  children,
  height,
  onOpen,
}: {
  title?: string;
  subtitle?: string;
  right?: React.ReactNode;
  children?: React.ReactNode;
  height?: number;
  onOpen?: () => void;
}) {
  return (
    <div
      className="card"
      style={{
        padding: 12,
        height,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {(title || subtitle || right) && (
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: 8,
            flexShrink: 0,
          }}
        >
          <div>
            {title && (
              <div
                style={{
                  fontWeight: 600,
                  cursor: onOpen ? "pointer" : "default",
                }}
                onClick={onOpen}
              >
                {title}
              </div>
            )}
            {subtitle && (
              <div style={{ color: "#6b7280", fontSize: 12 }}>{subtitle}</div>
            )}
          </div>
          {right}
        </div>
      )}
      <div style={{ flex: 1, minHeight: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {children}
      </div>
    </div>
  );
}
