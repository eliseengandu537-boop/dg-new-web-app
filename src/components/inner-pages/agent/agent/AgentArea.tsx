import Image from "next/image";
import Link from "next/link";
import type { Broker } from "../types";
import { resolveMediaUrl } from "@/utils/publicMedia";
import { getPublicBrokers } from "@/utils/publicServerApi";

const emptyStateStyle = {
  background: "#fff",
  borderRadius: 24,
  padding: "32px 24px",
  textAlign: "center" as const,
  boxShadow: "0 10px 30px rgba(13,31,45,0.08)",
  border: "1px solid rgba(13,31,45,0.08)",
  maxWidth: 620,
  margin: "0 auto",
};

const AgentArea = async () => {
  let brokers: Broker[] = [];
  let loadFailed = false;

  try {
    brokers = await getPublicBrokers();
  } catch {
    loadFailed = true;
  }

  return (
    <section style={{ background: "#f8f9fa", padding: "clamp(72px, 9vw, 100px) 0 clamp(56px, 7vw, 80px)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#c8973a", marginBottom: 12 }}>
            Our Team
          </p>
          <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.6rem)", fontWeight: 700, color: "#0d1f2d", marginBottom: 14, fontFamily: "var(--site-font-family)" }}>
            Commercial Property Specialists
          </h2>
          <p style={{ maxWidth: 620, margin: "0 auto", color: "#5f6b76", lineHeight: 1.75, fontSize: 15 }}>
            Browse our brokers, connect with the right specialist faster, and view full profiles without the heavy phone-only layout.
          </p>
        </div>

        {loadFailed && (
          <div style={emptyStateStyle}>
            <h3 style={{ fontSize: 24, fontWeight: 700, color: "#0d1f2d", marginBottom: 10 }}>
              Brokers are temporarily unavailable
            </h3>
            <p style={{ color: "#5f6b76", lineHeight: 1.75, marginBottom: 20 }}>
              We could not reach the broker directory just now. Please try again shortly or use the contact page while we reconnect.
            </p>
            <Link href="/inquiry" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "13px 22px", borderRadius: 999, background: "#0d1f2d", color: "#fff", fontWeight: 700, textDecoration: "none" }}>
              Send an Inquiry
            </Link>
          </div>
        )}

        {!loadFailed && brokers.length === 0 && (
          <div style={emptyStateStyle}>
            <h3 style={{ fontSize: 24, fontWeight: 700, color: "#0d1f2d", marginBottom: 10 }}>
              No brokers are published yet
            </h3>
            <p style={{ color: "#5f6b76", lineHeight: 1.75, marginBottom: 0 }}>
              Once brokers are marked active and visible from the admin dashboard, they will appear here automatically.
            </p>
          </div>
        )}

        {!loadFailed && brokers.length > 0 && (
          <div className="row g-4 justify-content-center">
            {brokers.map((broker) => (
              <div key={broker.id} className="col-12 col-sm-6 col-xl-4">
                <article
                  style={{
                    height: "100%",
                    background: "#fff",
                    borderRadius: 20,
                    overflow: "hidden",
                    boxShadow: "0 12px 36px rgba(13,31,45,0.08)",
                    border: "1px solid rgba(13,31,45,0.08)",
                  }}
                >
                  <div style={{ position: "relative", overflow: "hidden", background: "#eef2f5", aspectRatio: "4 / 4.6" }}>
                    {broker.photo ? (
                      <Image
                        src={resolveMediaUrl(broker.photo)}
                        alt={broker.fullName}
                        fill
                        sizes="(max-width: 575px) 100vw, (max-width: 1199px) 50vw, 33vw"
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#0d1f2d,#1a3a52)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <i className="bi bi-person-circle" style={{ fontSize: 84, color: "rgba(255,255,255,0.24)" }} />
                      </div>
                    )}
                    <div style={{ position: "absolute", top: 14, left: 14, background: "rgba(255,255,255,0.88)", color: "#0d1f2d", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "6px 12px", borderRadius: 999 }}>
                      DG Property
                    </div>
                  </div>

                  <div style={{ padding: "22px 20px 24px" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
                      <span style={{ display: "inline-flex", alignItems: "center", padding: "7px 12px", borderRadius: 999, background: "#f6f1e4", color: "#9a6f1b", fontSize: 12, fontWeight: 700 }}>
                        {broker.position || "Commercial Broker"}
                      </span>
                      {broker.specialization && (
                        <span style={{ display: "inline-flex", alignItems: "center", padding: "7px 12px", borderRadius: 999, background: "#f2f5f7", color: "#425466", fontSize: 12, fontWeight: 600 }}>
                          {broker.specialization}
                        </span>
                      )}
                    </div>

                    <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0d1f2d", marginBottom: 8 }}>
                      <Link href={`/agent_details?id=${broker.id}`} style={{ color: "inherit", textDecoration: "none" }}>
                        {broker.fullName}
                      </Link>
                    </h3>

                    <p style={{ minHeight: 22, fontSize: 14, color: "#5f6b76", marginBottom: 18 }}>
                      {broker.officeLocation ? (
                        <>
                          <i className="bi bi-geo-alt" style={{ marginRight: 6, color: "#c8973a" }} />
                          {broker.officeLocation}
                        </>
                      ) : (
                        "Available for commercial property support across South Africa."
                      )}
                    </p>

                    <Link
                      href={`/agent_details?id=${broker.id}`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        width: "100%",
                        padding: "13px 18px",
                        borderRadius: 14,
                        background: "#0d1f2d",
                        color: "#fff",
                        textDecoration: "none",
                        fontSize: 14,
                        fontWeight: 700,
                      }}
                    >
                      View Profile
                      <i className="bi bi-arrow-right" style={{ fontSize: 15 }} />
                    </Link>
                  </div>
                </article>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AgentArea;
