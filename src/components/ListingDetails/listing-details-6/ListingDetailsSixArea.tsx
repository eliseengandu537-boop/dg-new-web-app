"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import AgencyFormOne from "@/components/forms/AgencyFormOne";
import Review from "@/components/inner-pages/agency/agency-details/Review";
import { COMMERCIAL_FIELD_LABELS } from "@/data/commercialPropertyConfig";
import NiceSelect from "@/ui/NiceSelect";
import { API_ROOT } from "@/utils/api";
import { fetchSavedProperties, removePropertyFromFavorites, savePropertyToFavorites } from "@/utils/dashboardApi";
import { resolveMediaUrl } from "@/utils/publicMedia";
import MediaGallery from "./MediaGallery";
import MortgageCalculator from "../listing-details-sidebar.tsx/MortgageCalculator";
import ScheduleForm from "../listing-details-sidebar.tsx/ScheduleForm";

const CATEGORY_LABELS: Record<string, string> = {
  commercial_office: "Commercial Office",
  retail: "Retail Property",
  industrial_warehouse: "Industrial Warehouse",
  development_land: "Development Land",
  mixed_use: "Mixed-Use Development",
  investment: "Investment Property",
  fuel_station: "Fuel Station",
};

const LISTING_TYPE_LABELS: Record<string, string> = {
  sale: "For Sale",
  lease: "For Lease",
  investment: "Investment",
};

const LISTING_TYPE_ACCENTS: Record<string, { background: string; border: string; color: string }> = {
  sale: { background: "#edf7ef", border: "#d5e8d9", color: "#356244" },
  lease: { background: "#f5f7ee", border: "#dce4cd", color: "#66714d" },
  investment: { background: "#eef4fb", border: "#d5e3f4", color: "#285d96" },
};

interface AgentInfo {
  type: "client" | "broker";
  planName: string;
  data: any;
}

const formatValue = (value: unknown) => {
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "number") {
    return Number.isInteger(value)
      ? value.toLocaleString("en-ZA")
      : value.toLocaleString("en-ZA", { maximumFractionDigits: 2 });
  }

  return String(value);
};

const ListingDetailsSixArea = () => {
  const params = useSearchParams();
  const id = params.get("id");

  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [shareState, setShareState] = useState("");

  useEffect(() => {
    if (!id) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    axios.get(`${API_ROOT}/properties/public/${id}`)
      .then((response) => setProperty(response.data.property || response.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!id) return;

    fetchSavedProperties()
      .then((response) => {
        const favorites = response.data?.properties || [];
        setIsFavorite(favorites.some((saved: any) => String(saved.id) === String(id)));
      })
      .catch(() => setIsFavorite(false));
  }, [id]);

  const handleFavorite = async () => {
    if (!id || favoriteLoading) return;

    setFavoriteLoading(true);
    try {
      if (isFavorite) {
        await removePropertyFromFavorites(Number(id));
        setIsFavorite(false);
      } else {
        await savePropertyToFavorites(Number(id));
        setIsFavorite(true);
      }
    } catch {
      // Keep the interaction calm if the request fails.
    } finally {
      setFavoriteLoading(false);
    }
  };

  const handleShare = async () => {
    if (typeof window === "undefined") return;

    const shareUrl = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: property?.title || "DG Property Listing",
          text: property?.title || "View this DG Property listing",
          url: shareUrl,
        });
        setShareState("Shared successfully.");
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        setShareState("Link copied to clipboard.");
      }
    } catch {
      setShareState("Unable to share right now.");
    } finally {
      window.setTimeout(() => setShareState(""), 2200);
    }
  };

  if (loading) {
    return (
      <div style={pageShellStyle}>
        <div className="container" style={{ paddingTop: 190, paddingBottom: 120, textAlign: "center" }}>
          <p style={{ fontSize: 18, color: "#64748b", margin: 0 }}>Loading property...</p>
        </div>
      </div>
    );
  }

  if (notFound || !property) {
    return (
      <div style={pageShellStyle}>
        <div className="container" style={{ paddingTop: 190, paddingBottom: 120, textAlign: "center" }}>
          <h4 style={{ color: "#0f172a", marginBottom: 16 }}>Property not found</h4>
          <Link href="/listing_07" className="btn-nine mt-20">Browse All Listings</Link>
        </div>
      </div>
    );
  }

  const listingType = property.listingType || "sale";
  const accent = LISTING_TYPE_ACCENTS[listingType] || LISTING_TYPE_ACCENTS.sale;
  const listingLabel = LISTING_TYPE_LABELS[listingType] || listingType;
  const categoryLabel = CATEGORY_LABELS[property.category] || property.category || "Commercial Property";
  const categoryDetails = property.categoryDetails || {};
  const filledFields = Object.entries(categoryDetails)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(([key, value]) => ({
      key,
      value,
      label:
        COMMERCIAL_FIELD_LABELS[key] ||
        key.replace(/([A-Z])/g, " $1").replace(/^./, (first) => first.toUpperCase()),
    }));

  const fullAddress = [property.address, property.suburb, property.city, property.province, "South Africa"].filter(Boolean).join(", ");
  const areaAddress = [property.suburb, property.city, property.province].filter(Boolean).join(", ") || "South Africa";
  const mapSrc = `https://maps.google.com/maps?width=600&height=450&hl=en&q=${encodeURIComponent(fullAddress)}&t=&z=14&ie=UTF8&iwloc=B&output=embed`;
  const floorPlans: string[] = (property.floorPlans || [])
    .map((item: string) => resolveMediaUrl(item))
    .filter((item: string) => Boolean(item));

  const agentInfo: AgentInfo | null =
    property.agentInfo ||
    (property.assignedBroker
      ? { type: "broker", planName: "", data: property.assignedBroker }
      : property.brokers?.[0]
        ? { type: "broker", planName: "", data: property.brokers[0] }
        : null);

  const agent = agentInfo?.data;
  const isClientAgent = agentInfo?.type === "client";
  const agentName = agent
    ? isClientAgent
      ? (agent.name || `${agent.firstName || ""} ${agent.lastName || ""}`.trim() || "Property Owner")
      : (agent.fullName || "DG Property Broker")
    : "DG Property Broker";
  const agentRole = agent
    ? isClientAgent
      ? (agent.jobTitle || agent.company || "Property Owner")
      : (agent.position || agent.designation || "Commercial Property Broker")
    : "Commercial Property Broker";
  const agentAddress = agent
    ? isClientAgent
      ? (agent.address || areaAddress)
      : (agent.officeLocation || areaAddress)
    : areaAddress;
  const agentPhone = agent
    ? isClientAgent
      ? (agent.phoneNumber || agent.whatsapp || "")
      : (agent.phone || "")
    : "";
  const agentEmail = agent
    ? isClientAgent
      ? (agent.email || "")
      : (agent.email || "")
    : "";
  const agentAvatar = agent
    ? resolveMediaUrl(isClientAgent ? agent.avatar : agent.photo)
    : "";

  const videoLink: string = property.virtualTourLink || "";
  const videoIdMatch = videoLink.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  const videoId = videoIdMatch ? videoIdMatch[1] : null;

  const topMetrics = (
    filledFields.length > 0
      ? filledFields.slice(0, 4).map((field) => ({
        icon: "bi-building",
        label: field.label,
        value: formatValue(field.value),
      }))
      : [
        { icon: "bi-house", label: "Listing", value: listingLabel },
        { icon: "bi-buildings", label: "Category", value: categoryLabel },
        { icon: "bi-upc-scan", label: "Reference", value: property.referenceNumber || "Pending" },
      ]
  );

  const priceLabel =
    listingType === "lease"
      ? "Rental guide"
      : listingType === "investment"
        ? "Investment guide"
        : "Asking price";
  const heroLead =
    property.referenceNumber
      ? `Reference: ${property.referenceNumber}`
      : "Commercial property presented by DG Property";

  return (
    <div style={pageShellStyle}>
      <div className="container" style={{ paddingTop: 158, paddingBottom: 120 }}>
        <div style={breadcrumbStyle}>
          <Link href="/listing_07" style={breadcrumbLinkStyle}>
            <i className="bi bi-arrow-left" style={{ fontSize: 14 }}></i>
            Property details
          </Link>
          <span>/</span>
          <Link href="/home-two" style={{ ...breadcrumbLinkStyle, color: "#64748b", fontWeight: 500 }}>
            Home
          </Link>
        </div>

        <div className="row gx-4 gy-4 align-items-start">
          <div className="col-xl-8">
            <MediaGallery
              featuredImage={property.featuredImage}
              gallery={property.gallery || []}
              title={property.title}
            />

            <div style={heroInfoCardStyle}>
              <div className="d-flex flex-wrap justify-content-between align-items-start gap-3">
                <div style={{ flex: "1 1 460px" }}>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
                    <BadgePill
                      label={listingLabel}
                      background={accent.background}
                      borderColor={accent.border}
                      color={accent.color}
                    />
                    <BadgePill
                      label={categoryLabel}
                      background="#ffffff"
                      borderColor="#d9e2ec"
                      color="#1e293b"
                    />
                  </div>

                  <h1 style={{ color: "#0f172a", fontSize: "clamp(2rem, 3.3vw, 2.9rem)", lineHeight: 1.06, marginBottom: 8 }}>
                    {property.title}
                  </h1>

                  <div style={{ color: "#64748b", fontSize: 15, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
                    <i className="bi bi-geo-alt" style={{ color: "#64748b" }}></i>
                    <span>{fullAddress}</span>
                  </div>

                  <div style={{ color: "#64748b", fontSize: 14, lineHeight: 1.8, maxWidth: 780 }}>
                    {heroLead}
                  </div>
                </div>

                <div style={pricePanelStyle}>
                  <div style={{ color: "#64748b", fontSize: 11, fontWeight: 700, letterSpacing: 1.1, textTransform: "uppercase", marginBottom: 8 }}>
                    {priceLabel}
                  </div>
                  <div style={{ color: "#0f172a", fontSize: "clamp(2rem, 3vw, 2.5rem)", fontWeight: 700, lineHeight: 1 }}>
                    {property.price ? `R ${Number(property.price).toLocaleString("en-ZA")}` : "Price on Request"}
                  </div>
                </div>
              </div>

              <div style={heroActionRowStyle}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, flex: "1 1 520px" }}>
                  {topMetrics.map((metric, index) => (
                    <MetricChip
                      key={`${metric.label}-${metric.value}-${index}`}
                      icon={metric.icon}
                      label={metric.label}
                      value={metric.value}
                    />
                  ))}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <button onClick={handleFavorite} disabled={favoriteLoading} style={ghostActionButtonStyle}>
                    <i className={isFavorite ? "fa-solid fa-heart" : "fa-regular fa-heart"} style={{ color: isFavorite ? "#2563eb" : "#334155" }}></i>
                    {isFavorite ? "Saved" : "Save"}
                  </button>
                  <button onClick={handleShare} style={ghostActionButtonStyle}>
                    <i className="fa-sharp fa-regular fa-share-nodes" style={{ color: "#334155" }}></i>
                    Share
                  </button>
                  <a href="#property-enquiry" style={primaryButtonStyle}>
                    Contact Agent
                  </a>
                </div>
              </div>

              {shareState && <div style={{ color: "#2563eb", fontSize: 12, marginTop: 12 }}>{shareState}</div>}
            </div>

            <SectionCard title="Property information" subtitle="A closer look at the opportunity, location and commercial fundamentals of this listing.">
              <p style={{ color: "#475569", fontSize: 16, lineHeight: 1.95, margin: 0 }}>
                {property.description || "A well-positioned commercial opportunity with strong access, visibility and long-term value for the right tenant or investor."}
              </p>
            </SectionCard>

            {filledFields.length > 0 && (
              <SectionCard title="Property features" subtitle="Core details and commercial specifications for this property.">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
                  {filledFields.map((field) => (
                    <DetailCard key={field.key} label={field.label} value={formatValue(field.value)} />
                  ))}
                </div>
              </SectionCard>
            )}

            {property.amenities?.length > 0 && (
              <SectionCard title="Amenities" subtitle="Additional features available with this listing.">
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                  {property.amenities.map((amenity: string, index: number) => (
                    <AmenityPill key={`${amenity}-${index}`} label={amenity} />
                  ))}
                </div>
              </SectionCard>
            )}

            {videoLink && (
              <SectionCard title="Video walkthrough" subtitle="Preview the property and surrounding environment before your visit.">
                {videoId ? (
                  <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, borderRadius: 22, overflow: "hidden", background: "#0f172a" }}>
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <a
                    href={videoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={primaryButtonStyle}
                  >
                    Watch video
                  </a>
                )}
              </SectionCard>
            )}

            {floorPlans.length > 0 && (
              <SectionCard title="Floor plans" subtitle="Download or review the current floor plan documents available for this listing.">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
                  {floorPlans.map((plan, index) => (
                    <a
                      key={`${plan}-${index}`}
                      href={plan}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "block",
                        borderRadius: 20,
                        overflow: "hidden",
                        background: "#fff",
                        border: "1px solid #dbe4ee",
                        textDecoration: "none",
                      }}
                    >
                      <img
                        src={plan}
                        alt={`Floor plan ${index + 1}`}
                        style={{ width: "100%", height: 220, objectFit: "contain", background: "#f8fafc", display: "block" }}
                      />
                      <div style={{ padding: "16px 18px", color: "#0f172a", fontSize: 14, fontWeight: 700 }}>
                        View floor plan {index + 1}
                      </div>
                    </a>
                  ))}
                </div>
              </SectionCard>
            )}

            {property.nearby?.length > 0 && (
              <SectionCard title="What's nearby" subtitle="Useful surrounding destinations and area conveniences close to the property.">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
                  {property.nearby.map((place: { name: string; distance: string }, index: number) => (
                    <DetailCard key={`${place.name}-${index}`} label={place.name} value={place.distance || "Nearby"} />
                  ))}
                </div>
              </SectionCard>
            )}

            <div id="property-enquiry">
              <SectionCard title="Enquire about this property" subtitle="Send us your details and our team will arrange a viewing or share the next steps.">
                <div className="row g-4">
                  <div className="col-lg-7">
                    <ScheduleForm propertyId={property.id} propertyTitle={property.title} />
                  </div>
                  <div className="col-lg-5">
                    <div style={calculatorCardStyle}>
                      <div style={{ color: "#94a3b8", fontSize: 11, fontWeight: 700, letterSpacing: 1.1, textTransform: "uppercase", marginBottom: 8 }}>
                        Finance
                      </div>
                      <h4 style={{ color: "#0f172a", fontSize: 24, marginBottom: 16 }}>Bond calculator</h4>
                      <MortgageCalculator sourceContext={property.title} />
                    </div>
                  </div>
                </div>
              </SectionCard>
            </div>

            <SectionCard title="Reviews" subtitle="Feedback and engagement from people who have viewed or interacted with this listing.">
              <div className="position-relative z-1">
                <div className="d-sm-flex justify-content-between align-items-center mb-20" style={{ gap: 12 }}>
                  <p style={{ color: "#64748b", fontSize: 15, margin: 0 }}>
                    Sort reviews to quickly scan the latest property feedback.
                  </p>
                  <NiceSelect
                    className="nice-select rounded-0"
                    options={[
                      { value: "01", text: "Newest" },
                      { value: "02", text: "Best Seller" },
                      { value: "03", text: "Best Match" },
                    ]}
                    defaultCurrent={0}
                    onChange={() => {}}
                    name=""
                    placeholder=""
                  />
                </div>
                <Review propertyId={property.id} />
              </div>
            </SectionCard>

            <SectionCard title="Leave a reply" subtitle="Share your thoughts or ask a question if you have viewed this property.">
              <div style={replyCardStyle}>
                <AgencyFormOne />
              </div>
            </SectionCard>
          </div>

          <div className="col-xl-4">
            <div style={sidebarGridStyle}>
              <SideCard title="Agent details">
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  {agentAvatar ? (
                    <img
                      src={agentAvatar}
                      alt={agentName}
                      style={{ width: 74, height: 74, borderRadius: 18, objectFit: "cover", display: "block", flexShrink: 0 }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 74,
                        height: 74,
                        borderRadius: 18,
                        background: "#eff4f8",
                        color: "#64748b",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 24,
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {agentName[0]?.toUpperCase() || "D"}
                    </div>
                  )}

                  <div>
                    <div style={{ color: "#0f172a", fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{agentName}</div>
                    <div style={{ color: "#64748b", fontSize: 14, marginBottom: 8 }}>{agentRole}</div>
                    <div style={{ color: "#64748b", fontSize: 13, lineHeight: 1.7 }}>{agentAddress}</div>
                  </div>
                </div>

                {(agentPhone || agentEmail) && (
                  <div style={{ display: "grid", gap: 8, marginTop: 16 }}>
                    {agentPhone && <MetaText icon="bi-telephone" text={agentPhone} />}
                    {agentEmail && <MetaText icon="bi-envelope" text={agentEmail} />}
                  </div>
                )}

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 18 }}>
                  <a href={agentPhone ? `tel:${agentPhone}` : "#property-enquiry"} style={sideButtonStyle}>
                    <i className="bi bi-telephone"></i> Contact Agent
                  </a>
                </div>
              </SideCard>

              <SideCard title="Inspection times">
                <div style={{ color: "#475569", fontSize: 14, lineHeight: 1.8, marginBottom: 10 }}>
                  Inspections are arranged around owner access, broker availability and your preferred viewing schedule.
                </div>
                <div style={{ color: "#64748b", fontSize: 13, marginBottom: 16 }}>
                  Weekdays and selected weekend appointments
                </div>
                <a href="#property-enquiry" style={sideButtonStyle}>
                  <i className="bi bi-calendar-event"></i> Add to calendar
                </a>
              </SideCard>

              <SideCard title="Location">
                <div style={{ borderRadius: 18, overflow: "hidden", border: "1px solid #dbe4ee" }}>
                  <iframe
                    src={mapSrc}
                    width="600"
                    height="280"
                    style={{ border: 0, width: "100%", display: "block" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </SideCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SectionCard = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) => (
  <div style={sectionCardStyle}>
    <div style={{ marginBottom: 22 }}>
      <h3 style={{ color: "#0f172a", fontSize: 28, lineHeight: 1.2, marginBottom: subtitle ? 8 : 0 }}>
        {title}
      </h3>
      {subtitle && (
        <p style={{ color: "#64748b", fontSize: 15, lineHeight: 1.8, margin: 0 }}>
          {subtitle}
        </p>
      )}
    </div>
    {children}
  </div>
);

const SideCard = ({ title, children }: { title: string; children: ReactNode }) => (
  <div style={sideCardStyle}>
    <div style={{ color: "#0f172a", fontSize: 18, fontWeight: 700, marginBottom: 14 }}>{title}</div>
    {children}
  </div>
);

const MetricChip = ({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) => (
  <div style={metricChipStyle}>
    <i className={`bi ${icon}`} style={{ color: "#6b7280", fontSize: 16 }}></i>
    <div>
      <div style={{ color: "#94a3b8", fontSize: 10, fontWeight: 700, letterSpacing: 1.05, textTransform: "uppercase", marginBottom: 3 }}>
        {label}
      </div>
      <div style={{ color: "#0f172a", fontSize: 14, fontWeight: 700, lineHeight: 1.4 }}>
        {value}
      </div>
    </div>
  </div>
);

const BadgePill = ({
  label,
  background,
  borderColor,
  color,
}: {
  label: string;
  background: string;
  borderColor: string;
  color: string;
}) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 999,
      padding: "8px 13px",
      background,
      border: `1px solid ${borderColor}`,
      color,
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 1.05,
      textTransform: "uppercase",
    }}
  >
    {label}
  </span>
);

const DetailCard = ({ label, value }: { label: string; value: string }) => (
  <div
    style={{
      padding: "18px 18px 19px",
      borderRadius: 18,
      border: "1px solid #dbe4ee",
      background: "#ffffff",
      minHeight: 102,
    }}
  >
    <div style={{ color: "#94a3b8", fontSize: 10, fontWeight: 700, letterSpacing: 1.05, textTransform: "uppercase", marginBottom: 8 }}>
      {label}
    </div>
    <div style={{ color: "#1e293b", fontSize: 17, fontWeight: 700, lineHeight: 1.45 }}>
      {value}
    </div>
  </div>
);

const AmenityPill = ({ label }: { label: string }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "11px 14px",
      borderRadius: 999,
      border: "1px solid #dbe4ee",
      background: "#fff",
      color: "#334155",
      fontSize: 14,
      fontWeight: 600,
    }}
  >
    <span style={{ color: "#7c8b9a" }}>•</span>
    <span>{label}</span>
  </div>
);

const MetaText = ({ icon, text }: { icon: string; text: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#475569", fontSize: 13, lineHeight: 1.7 }}>
    <i className={`bi ${icon}`} style={{ color: "#64748b" }}></i>
    <span>{text}</span>
  </div>
);

const pageShellStyle: CSSProperties = {
  background: "linear-gradient(180deg, #f8fbff 0%, #ffffff 22%)",
};

const breadcrumbStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  flexWrap: "wrap",
  color: "#64748b",
  fontSize: 14,
  marginBottom: 22,
};

const breadcrumbLinkStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  color: "#0f172a",
  textDecoration: "none",
  fontWeight: 600,
};

const heroInfoCardStyle: CSSProperties = {
  background: "#fff",
  border: "1px solid #dbe4ee",
  borderRadius: 22,
  padding: 24,
  boxShadow: "0 18px 40px rgba(15,23,42,0.05)",
  marginBottom: 24,
};

const pricePanelStyle: CSSProperties = {
  minWidth: 220,
  padding: "18px 20px",
  borderRadius: 18,
  border: "1px solid #dbe4ee",
  background: "#f8fbff",
};

const heroActionRowStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 16,
  alignItems: "center",
  justifyContent: "space-between",
  borderTop: "1px solid #e7edf3",
  marginTop: 22,
  paddingTop: 20,
};

const metricChipStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  minHeight: 52,
  padding: "10px 14px",
  borderRadius: 16,
  background: "#f8fafc",
  border: "1px solid #e2e8f0",
};

const ghostActionButtonStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  borderRadius: 12,
  border: "1px solid #dbe4ee",
  background: "#fff",
  color: "#0f172a",
  fontSize: 13,
  fontWeight: 700,
  padding: "12px 15px",
};

const primaryButtonStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: 160,
  borderRadius: 12,
  background: "#2f80ed",
  color: "#fff",
  textDecoration: "none",
  fontSize: 14,
  fontWeight: 700,
  padding: "12px 18px",
  border: "1px solid #2f80ed",
};

const sectionCardStyle: CSSProperties = {
  background: "#fff",
  border: "1px solid #dbe4ee",
  borderRadius: 22,
  padding: "26px 26px 28px",
  boxShadow: "0 18px 40px rgba(15,23,42,0.04)",
  marginBottom: 24,
};

const calculatorCardStyle: CSSProperties = {
  borderRadius: 18,
  padding: 20,
  background: "#f8fbff",
  border: "1px solid #dbe4ee",
  height: "100%",
};

const replyCardStyle: CSSProperties = {
  borderRadius: 20,
  background: "#f8fbff",
  padding: 22,
  border: "1px solid #dbe4ee",
};

const sidebarGridStyle: CSSProperties = {
  display: "grid",
  gap: 18,
  position: "sticky",
  top: 140,
};

const sideCardStyle: CSSProperties = {
  background: "#fff",
  border: "1px solid #cfe0f4",
  borderRadius: 20,
  padding: 22,
  boxShadow: "0 16px 34px rgba(15,23,42,0.05)",
};

const sideButtonStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  borderRadius: 12,
  border: "1px solid #c5ddfb",
  background: "#fff",
  color: "#2563eb",
  textDecoration: "none",
  fontSize: 14,
  fontWeight: 600,
  padding: "11px 16px",
};

export default ListingDetailsSixArea;
