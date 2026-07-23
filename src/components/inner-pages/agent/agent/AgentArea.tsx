import Image from "next/image";
import Link from "next/link";
import type { Broker } from "../types";
import { resolveMediaUrl } from "@/utils/publicMedia";
import { getPublicBrokers } from "@/utils/publicServerApi";

const managementTitlePattern =
  /\b(ceo|chief|director|founder|principal|manager|management|head|executive|operations?|marketing|administrator|administration|developer|office|boss)\b/i;

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

const isManagementMember = (member: Broker) =>
  managementTitlePattern.test(member.position?.trim() || "");

type TeamCardProps = {
  member: Broker;
  group: "Management" | "Broker";
};

const TeamCard = ({ member, group }: TeamCardProps) => {
  const isManagement = group === "Management";
  const position = member.position?.trim();
  const specialization = member.specialization?.trim();

  return (
    <article
      style={{
        height: "100%",
        background: "#fff",
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 12px 36px rgba(13,31,45,0.08)",
        border: "1px solid rgba(13,31,45,0.08)",
      }}
    >
      <div style={{ position: "relative", overflow: "hidden", background: "#eef2f5", aspectRatio: "4 / 4.2" }}>
        {member.photo ? (
          <Image
            src={resolveMediaUrl(member.photo)}
            alt={member.fullName}
            fill
            sizes="(max-width: 575px) 100vw, (max-width: 1199px) 50vw, 33vw"
            style={{ objectFit: "cover", objectPosition: "center 18%" }}
          />
        ) : (
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#0d1f2d,#1a3a52)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <i className="bi bi-person-circle" style={{ fontSize: 84, color: "rgba(255,255,255,0.24)" }} />
          </div>
        )}
        <div
          style={{
            position: "absolute",
            top: 14,
            left: 14,
            background: isManagement ? "rgba(13,31,45,0.92)" : "rgba(255,255,255,0.92)",
            color: isManagement ? "#fff" : "#0d1f2d",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            padding: "7px 12px",
            borderRadius: 999,
            boxShadow: "0 4px 16px rgba(13,31,45,0.12)",
          }}
        >
          {group}
        </div>
      </div>

      <div style={{ padding: "18px 17px 20px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 11 }}>
          <span style={{ display: "inline-flex", alignItems: "center", padding: "6px 10px", borderRadius: 999, background: "#f6f1e4", color: "#9a6f1b", fontSize: 11, fontWeight: 700 }}>
            {position || (isManagement ? "Management Team" : "Commercial Broker")}
          </span>
          {specialization && specialization !== position && (
            <span style={{ display: "inline-flex", alignItems: "center", padding: "6px 10px", borderRadius: 999, background: "#f2f5f7", color: "#425466", fontSize: 11, fontWeight: 600 }}>
              {specialization}
            </span>
          )}
        </div>

        <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0d1f2d", marginBottom: 6 }}>
          <Link href={`/agent_details?id=${member.id}`} style={{ color: "inherit", textDecoration: "none" }}>
            {member.fullName.trim()}
          </Link>
        </h3>

        <p style={{ minHeight: 20, fontSize: 13, color: "#5f6b76", marginBottom: 14 }}>
          {member.officeLocation ? (
            <>
              <i className="bi bi-geo-alt" style={{ marginRight: 6, color: "#c8973a" }} />
              {member.officeLocation}
            </>
          ) : isManagement ? (
            "Supporting the direction and operations of DG Property."
          ) : (
            "Available for commercial property support across South Africa."
          )}
        </p>

        <Link
          href={`/agent_details?id=${member.id}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            width: "100%",
            padding: "11px 15px",
            borderRadius: 11,
            background: "#0d1f2d",
            color: "#fff",
            textDecoration: "none",
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          View Profile
          <i className="bi bi-arrow-right" style={{ fontSize: 15 }} />
        </Link>
      </div>
    </article>
  );
};

type TeamSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  members: Broker[];
  group: TeamCardProps["group"];
  accent: string;
};

const TeamSection = ({ eyebrow, title, description, members, group, accent }: TeamSectionProps) => {
  if (members.length === 0) return null;

  const headingId = `${group.toLowerCase()}-team-heading`;

  return (
    <section aria-labelledby={headingId}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 24,
          flexWrap: "wrap",
          marginBottom: 28,
          paddingBottom: 22,
          borderBottom: "1px solid rgba(13,31,45,0.12)",
        }}
      >
        <div style={{ maxWidth: 680 }}>
          <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: accent, marginBottom: 8 }}>
            {eyebrow}
          </p>
          <h3
            id={headingId}
            style={{ fontSize: "clamp(1.55rem, 3vw, 2.1rem)", fontWeight: 700, color: "#0d1f2d", marginBottom: 10, fontFamily: "var(--site-font-family)" }}
          >
            {title}
          </h3>
          <p style={{ color: "#5f6b76", lineHeight: 1.7, fontSize: 15, marginBottom: 0 }}>
            {description}
          </p>
        </div>
        <span
          aria-label={`${members.length} members in ${title}`}
          style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 14px", borderRadius: 999, background: "#fff", border: "1px solid rgba(13,31,45,0.1)", color: "#425466", fontSize: 12, fontWeight: 700 }}
        >
          <i className={`bi ${group === "Management" ? "bi-building" : "bi-briefcase"}`} style={{ color: accent }} />
          {members.length} {members.length === 1 ? "Team Member" : "Team Members"}
        </span>
      </div>

      <div className="row g-4">
        {members.map((member) => (
          <div key={member.id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
            <TeamCard member={member} group={group} />
          </div>
        ))}
      </div>
    </section>
  );
};

const AgentArea = async () => {
  let brokers: Broker[] = [];
  let loadFailed = false;

  try {
    brokers = await getPublicBrokers();
  } catch {
    loadFailed = true;
  }

  const management = brokers.filter(isManagementMember);
  const propertyBrokers = brokers.filter((broker) => !isManagementMember(broker));

  return (
    <section style={{ background: "#f8f9fa", padding: "clamp(72px, 9vw, 100px) 0 clamp(56px, 7vw, 80px)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#c8973a", marginBottom: 12 }}>
            Our Team
          </p>
          <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.6rem)", fontWeight: 700, color: "#0d1f2d", marginBottom: 14, fontFamily: "var(--site-font-family)" }}>
            The People Behind DG Property
          </h2>
          <p style={{ maxWidth: 620, margin: "0 auto", color: "#5f6b76", lineHeight: 1.75, fontSize: 15 }}>
            Meet the leadership and brokerage professionals who bring strategy, market knowledge and dedicated service to every client relationship.
          </p>
        </div>

        {loadFailed && (
          <div style={emptyStateStyle}>
            <h3 style={{ fontSize: 24, fontWeight: 700, color: "#0d1f2d", marginBottom: 10 }}>
              Our team is temporarily unavailable
            </h3>
            <p style={{ color: "#5f6b76", lineHeight: 1.75, marginBottom: 20 }}>
              We could not reach the team directory just now. Please try again shortly or use the contact page while we reconnect.
            </p>
            <Link href="/inquiry" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "13px 22px", borderRadius: 999, background: "#0d1f2d", color: "#fff", fontWeight: 700, textDecoration: "none" }}>
              Send an Inquiry
            </Link>
          </div>
        )}

        {!loadFailed && brokers.length === 0 && (
          <div style={emptyStateStyle}>
            <h3 style={{ fontSize: 24, fontWeight: 700, color: "#0d1f2d", marginBottom: 10 }}>
              No team members are published yet
            </h3>
            <p style={{ color: "#5f6b76", lineHeight: 1.75, marginBottom: 0 }}>
              Once team members are marked active and visible from the admin dashboard, they will appear here automatically.
            </p>
          </div>
        )}

        {!loadFailed && brokers.length > 0 && (
          <div style={{ display: "grid", gap: "clamp(56px, 8vw, 84px)" }}>
            <TeamSection
              eyebrow="Leadership & Operations"
              title="Management"
              description="The leadership and operational team responsible for DG Property’s direction, client experience and day-to-day excellence."
              members={management}
              group="Management"
              accent="#c8973a"
            />
            <TeamSection
              eyebrow="Market Specialists"
              title="Property Brokers"
              description="Commercial property professionals focused on leasing, sales and matching clients with the right opportunities."
              members={propertyBrokers}
              group="Broker"
              accent="#0d1f2d"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default AgentArea;
