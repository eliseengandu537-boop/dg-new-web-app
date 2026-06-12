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
import FinanceTools from "../finance/FinanceTools";
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
  lease: "To Let",
  investment: "Investment",
};

const LISTING_TYPE_ACCENTS: Record<string, { background: string; border: string; color: string }> = {
  sale: { background: "#edf7ef", border: "#d5e8d9", color: "#356244" },
  lease: { background: "#f5f7ee", border: "#dce4cd", color: "#66714d" },
  investment: { background: "#eef4fb", border: "#d5e3f4", color: "#285d96" },
};


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
  const [openUnit, setOpenUnit] = useState<number | null>(null);

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

    // The saved/favourite status is a logged-in extra. Skip the
    // authenticated request entirely for public visitors so it never
    // returns a 401 (which would otherwise bounce them to login).
    if (typeof window === "undefined" || !localStorage.getItem("dg_token")) {
      setIsFavorite(false);
      return;
    }

    fetchSavedProperties()
      .then((response) => {
        const favorites = response.data?.properties || [];
        setIsFavorite(favorites.some((saved: any) => String(saved.id) === String(id)));
      })
      .catch(() => setIsFavorite(false));
  }, [id]);

  const handleFavorite = async () => {
    if (!id || favoriteLoading) return;

    // Saving a property requires an account — send guests to sign in.
    if (typeof window !== "undefined" && !localStorage.getItem("dg_token")) {
      window.location.href = "/login";
      return;
    }

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
  // Retail leasing is multi-shop, so a single total GLA figure ("size") is
  // misleading — hide it here; per-shop sizes appear under "Units available".
  const isRetailLease = property.category === "retail" && property.listingType === "lease";
  const filledFields = Object.entries(categoryDetails)
    .filter(([key, value]) =>
      value !== undefined && value !== null && value !== "" &&
      !(isRetailLease && key === "size")
    )
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

  // Retail listings call their units "Shop"; everything else uses "Unit".
  const unitWord = property.category === "retail" ? "Shop" : "Unit";
  const units: { name: string; size: string; note: string; images: string[] }[] =
    (Array.isArray(property.units) ? property.units : []).map((u: any, i: number) => {
      const rawName = (u?.name || "").trim();
      // If the admin left it blank or typed only a number, prefix the word ("Shop 1").
      const name = !rawName
        ? `${unitWord} ${i + 1}`
        : /^\d+$/.test(rawName)
          ? `${unitWord} ${rawName}`
          : rawName;
      return {
        name,
        size: u?.size != null ? String(u.size).trim() : "",
        note: (u?.note || "").trim(),
        images: (Array.isArray(u?.images) ? u.images : [])
          .map((img: string) => resolveMediaUrl(img))
          .filter(Boolean),
      };
    });

  // Normalise a client or broker record into a single display shape.
  const toAgentDisplay = (type: "client" | "broker", data: any) => ({
    id: data?.id,
    name: type === "client"
      ? (data.name || `${data.firstName || ""} ${data.lastName || ""}`.trim() || "Property Owner")
      : (data.fullName || "DG Property Broker"),
    role: type === "client"
      ? (data.jobTitle || data.company || "Property Owner")
      : (data.position || data.designation || "Commercial Property Broker"),
    address: type === "client"
      ? (data.address || areaAddress)
      : (data.officeLocation || areaAddress),
    phone: type === "client" ? (data.phoneNumber || data.whatsapp || "") : (data.phone || ""),
    email: data.email || "",
    avatar: resolveMediaUrl(type === "client" ? data.avatar : data.photo),
  });

  // Build the list of agents to show. Paid client-owned listings show the
  // client; otherwise show every broker linked to the listing (deduped).
  let agents: ReturnType<typeof toAgentDisplay>[];
  if (property.agentInfo?.type === "client" && property.agentInfo.data) {
    agents = [toAgentDisplay("client", property.agentInfo.data)];
  } else {
    const brokerRecords: any[] = [];
    if (property.assignedBroker) brokerRecords.push(property.assignedBroker);
    (property.brokers || []).forEach((b: any) => {
      if (!brokerRecords.some((x) => x.id === b.id)) brokerRecords.push(b);
    });
    agents = brokerRecords.map((b) => toAgentDisplay("broker", b));
  }
  if (agents.length === 0) {
    agents = [{
      id: undefined, name: "DG Property Broker", role: "Commercial Property Broker",
      address: areaAddress, phone: "", email: "", avatar: "",
    }];
  }

  const videoLink: string = property.virtualTourLink || "";
  const videoIdMatch = videoLink.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  const videoId = videoIdMatch ? videoIdMatch[1] : null;

  // Hero chips: show only a handful of the most important fields so the bar stays clean.
  const HERO_CHIP_KEYS = ["size", "vacantArea", "parkingRatio", "area", "suburb", "gla"];
  const heroChipFields = filledFields.filter((f) => HERO_CHIP_KEYS.includes(f.key)).slice(0, 4);
  const topMetrics = (
    heroChipFields.length > 0
      ? heroChipFields.map((field) => ({
        icon: "bi-building",
        label: field.label,
        value: formatValue(field.value),
      }))
      : filledFields.length > 0
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
      ? "Monthly Rental"
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
              singleImage={property.category === "investment" || listingType === "investment"}
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

            <SectionCard title="Property information">
              <p style={{ color: "#475569", fontSize: 16, lineHeight: 1.95, margin: 0 }}>
                {property.description || "A well-positioned commercial opportunity with strong access, visibility and long-term value for the right tenant or investor."}
              </p>
            </SectionCard>

            {filledFields.length > 0 && (
              <SectionCard title="Property details">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
                  {filledFields.map((field) => (
                    <div key={field.key} style={{
                      display: "flex", flexDirection: "column", gap: 4,
                      padding: "14px 16px", borderRadius: 12,
                      background: "#f8fafc", border: "1px solid #e2e8f0",
                    }}>
                      <span style={{ color: "#94a3b8", fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>
                        {field.label}
                      </span>
                      <span style={{ color: "#0f172a", fontSize: 15, fontWeight: 700 }}>
                        {formatValue(field.value)}
                      </span>
                    </div>
                  ))}
                </div>
              </SectionCard>
            )}


            {units.length > 0 && (
              <SectionCard title={`Units available (${units.length})`} subtitle="Click a unit to view its size, notes and pictures.">
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {units.map((unit, index) => {
                    const isOpen = openUnit === index;
                    const hasImages = unit.images.length > 0;
                    return (
                      <div key={index} style={{ border: "1px solid #dbe4ee", borderRadius: 16, overflow: "hidden", background: "#fff" }}>
                        <button
                          type="button"
                          onClick={() => setOpenUnit(isOpen ? null : index)}
                          style={{
                            width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                            gap: 16, padding: "16px 20px", background: isOpen ? "#f8fafc" : "#fff",
                            border: "none", cursor: "pointer", textAlign: "left",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "baseline", gap: 16, flexWrap: "wrap" }}>
                            <span style={{ color: "#0f172a", fontSize: 17, fontWeight: 700 }}>{unit.name}</span>
                            {unit.size && (
                              <span style={{ color: "#475569", fontSize: 15, fontWeight: 600 }}>{unit.size} m²</span>
                            )}
                            {unit.note && (
                              <span style={{ color: "#64748b", fontSize: 14 }}>{unit.note}</span>
                            )}
                          </div>
                          <span style={{ display: "flex", alignItems: "center", gap: 8, color: "#0f172a", fontSize: 13, fontWeight: 600, flexShrink: 0 }}>
                            {hasImages ? `${unit.images.length} photo${unit.images.length > 1 ? "s" : ""}` : "No photos"}
                            <i className={`bi ${isOpen ? "bi-chevron-up" : "bi-chevron-down"}`} />
                          </span>
                        </button>
                        {isOpen && hasImages && (
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12, padding: "0 20px 20px" }}>
                            {unit.images.map((img, imgIndex) => (
                              <a
                                key={imgIndex}
                                href={img}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ display: "block", borderRadius: 12, overflow: "hidden", border: "1px solid #e2e8f0" }}
                              >
                                <img
                                  src={img}
                                  alt={`${unit.name} photo ${imgIndex + 1}`}
                                  style={{ width: "100%", height: 130, objectFit: "cover", display: "block" }}
                                />
                              </a>
                            ))}
                          </div>
                        )}
                        {isOpen && !hasImages && (
                          <div style={{ padding: "0 20px 20px", color: "#94a3b8", fontSize: 14 }}>
                            No pictures added for this unit yet.
                          </div>
                        )}
                      </div>
                    );
                  })}
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
                    <FinanceTools property={property} categoryLabel={categoryLabel} />
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
              <SideCard title={agents.length > 1 ? "Agent details" : "Agent details"}>
                {agents.map((agent, agentIndex) => (
                  <div
                    key={agent.id ?? agentIndex}
                    style={agentIndex > 0 ? { marginTop: 20, paddingTop: 20, borderTop: "1px solid #eef2f7" } : undefined}
                  >
                    <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                      {agent.avatar ? (
                        <img
                          src={agent.avatar}
                          alt={agent.name}
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
                          {agent.name[0]?.toUpperCase() || "D"}
                        </div>
                      )}

                      <div>
                        <div style={{ color: "#0f172a", fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{agent.name}</div>
                        <div style={{ color: "#64748b", fontSize: 14, marginBottom: 8 }}>{agent.role}</div>
                        <div style={{ color: "#64748b", fontSize: 13, lineHeight: 1.7 }}>{agent.address}</div>
                      </div>
                    </div>

                    {(agent.phone || agent.email) && (
                      <div style={{ display: "grid", gap: 8, marginTop: 16 }}>
                        {agent.phone && <MetaText icon="bi-telephone" text={agent.phone} />}
                        {agent.email && <MetaText icon="bi-envelope" text={agent.email} />}
                      </div>
                    )}

                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 18 }}>
                      <a href={agent.phone ? `tel:${agent.phone}` : "#property-enquiry"} style={sideButtonStyle}>
                        <i className="bi bi-telephone"></i> Contact {agent.name.split(" ")[0] || "Agent"}
                      </a>
                    </div>
                  </div>
                ))}
              </SideCard>

              <SideCard title="Schedule viewing">
                <div style={{ color: "#475569", fontSize: 14, lineHeight: 1.8, marginBottom: 10 }}>
                  Arrange a private viewing with one of our brokers at a time that suits your schedule. Viewings are coordinated directly with the owner and our brokerage team to ensure a seamless inspection experience.
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
