import Link from "next/link";

const points = [
  "Retail leasing, investment sales and development advisory under one roof.",
  "Discreet, relationship-led deal support tailored to each mandate.",
  "Local market insight across South Africa's key commercial nodes.",
];

const FeatureListing = () => {
  return (
    <div
      style={{
        borderRadius: 28,
        padding: 28,
        background: "linear-gradient(160deg, #0f2231 0%, #1c3447 100%)",
        color: "#fff",
        boxShadow: "0 24px 50px rgba(15,34,49,0.18)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -60,
          right: -40,
          width: 180,
          height: 180,
          borderRadius: "50%",
          border: "1px solid rgba(240,185,94,0.18)",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            borderRadius: 999,
            padding: "8px 14px",
            background: "rgba(240,185,94,0.14)",
            color: "#f0b95e",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 1.1,
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          DG Property
        </div>

        <h5 style={{ color: "#fff", fontSize: 28, lineHeight: 1.15, marginBottom: 14 }}>
          Need a tailored shortlist?
        </h5>
        <p style={{ color: "rgba(255,255,255,0.72)", fontSize: 15, lineHeight: 1.75, marginBottom: 22 }}>
          Tell us your preferred node, size and budget and our team will help you narrow the right opportunities faster.
        </p>

        <div style={{ display: "grid", gap: 10, marginBottom: 24 }}>
          {points.map((point) => (
            <div
              key={point}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                padding: "12px 14px",
                borderRadius: 16,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <span style={{ color: "#f0b95e", fontSize: 16, lineHeight: 1 }}>•</span>
              <span style={{ color: "rgba(255,255,255,0.82)", fontSize: 14, lineHeight: 1.7 }}>
                {point}
              </span>
            </div>
          ))}
        </div>

        <Link
          href="/contact"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "14px 22px",
            borderRadius: 999,
            background: "#f0b95e",
            color: "#0f2231",
            textDecoration: "none",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          Speak to our team <i className="bi bi-arrow-up-right"></i>
        </Link>
      </div>
    </div>
  );
};

export default FeatureListing;
