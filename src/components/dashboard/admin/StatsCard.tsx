interface Props {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  sub?: string;
}

export default function StatsCard({ title, value, icon, color, sub }: Props) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        padding: "20px 24px",
        display: "flex",
        alignItems: "center",
        gap: 16,
        boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
        border: "1px solid #f0f4f8",
        minWidth: 0,
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 12,
          background: color + "1a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <i className={`bi ${icon}`} style={{ fontSize: 24, color }} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 13, color: "#718096", marginBottom: 2 }}>{title}</div>
        <div style={{ fontSize: 26, fontWeight: 700, color: "#1a2332", lineHeight: 1.2 }}>
          {value}
        </div>
        {sub && <div style={{ fontSize: 12, color: "#a0aec0", marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  );
}
