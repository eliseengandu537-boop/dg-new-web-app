"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/dashboard/admin/AdminHeader";
import { createProperty, fetchAllBrokers } from "@/utils/dashboardApi";
import { useDropzone } from "react-dropzone";
import {
  ADMIN_LISTING_CATEGORY_DEFAULT_PROPERTY_TYPE,
  ADMIN_LISTING_CATEGORY_OPTIONS,
  ADMIN_LISTING_CATEGORY_PROPERTY_TYPES,
  CATEGORY_AMENITIES,
  COMMERCIAL_CATEGORY_FIELDS,
  COMMERCIAL_CATEGORY_OPTIONS,
} from "@/data/commercialPropertyConfig";

interface Broker { id: number; fullName: string; position?: string; photo?: string; isActive?: boolean }

export default function AddPropertyPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1=category, 2=details, 3=media, 4=brokers
  const [brokers, setBrokers] = useState<Broker[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Common fields
  const [category, setCategory] = useState("");
  const [form, setForm] = useState({
    title: "", referenceNumber: "", description: "",
    listingCategory: "", listingType: "sale", price: "", province: "", city: "",
    suburb: "", address: "", gpsLat: "", gpsLng: "",
    virtualTourLink: "", status: "published", isFeatured: false,
  });

  // Category-specific fields
  const [catDetails, setCatDetails] = useState<Record<string, string>>({});

  // Media
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [featuredPreview, setFeaturedPreview] = useState("");
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [brochureFile, setBrochureFile] = useState<File | null>(null);
  const [floorPlanFiles, setFloorPlanFiles] = useState<File[]>([]);

  // Broker assignment
  const [selectedBrokers, setSelectedBrokers] = useState<number[]>([]);

  // Amenities
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const toggleAmenity = (a: string) =>
    setSelectedAmenities((p) => p.includes(a) ? p.filter((x) => x !== a) : [...p, a]);

  const propertyTypeOptions = COMMERCIAL_CATEGORY_OPTIONS.filter((option) => {
    const allowedTypes = ADMIN_LISTING_CATEGORY_PROPERTY_TYPES[form.listingCategory];
    return !allowedTypes || allowedTypes.includes(option.value);
  });

  // What's Nearby
  const [nearby, setNearby] = useState<{ name: string; distance: string }[]>([]);
  const addNearby = () => setNearby((p) => [...p, { name: "", distance: "" }]);
  const removeNearby = (i: number) => setNearby((p) => p.filter((_, j) => j !== i));
  const updateNearby = (i: number, field: "name" | "distance", val: string) =>
    setNearby((p) => p.map((item, j) => j === i ? { ...item, [field]: val } : item));

  // Map
  const [mapSrc, setMapSrc] = useState("");
  const mapDebounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateMap = useCallback((f: typeof form) => {
    const q = [f.address, f.suburb, f.city, f.province, "South Africa"].filter(Boolean).join(", ");
    if (!q.trim() || q === "South Africa") return;
    if (mapDebounce.current) clearTimeout(mapDebounce.current);
    mapDebounce.current = setTimeout(() => {
      setMapSrc(`https://maps.google.com/maps?width=600&height=350&hl=en&q=${encodeURIComponent(q)}&t=&z=14&ie=UTF8&iwloc=B&output=embed`);
    }, 800);
  }, []);

  useEffect(() => {
    fetchAllBrokers().then((r) => setBrokers(r.data)).catch(() => {});
  }, []);

  const onDropGallery = useCallback((files: File[]) => {
    setGalleryFiles((prev) => [...prev, ...files]);
    setGalleryPreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropGallery, accept: { "image/*": [] }, multiple: true,
  });

  const handleListingCategorySelect = (listingCategory: string) => {
    const allowedTypes = ADMIN_LISTING_CATEGORY_PROPERTY_TYPES[listingCategory] || [];
    const defaultCategory = ADMIN_LISTING_CATEGORY_DEFAULT_PROPERTY_TYPE[listingCategory] || "";
    const nextCategory =
      allowedTypes.length === 1
        ? allowedTypes[0]
        : allowedTypes.includes(category)
          ? category
          : defaultCategory;

    if (nextCategory !== category) {
      setCategory(nextCategory);
      setCatDetails({});
      setSelectedAmenities([]);
    }

    setForm((prev) => ({
      ...prev,
      listingCategory,
      listingType:
        listingCategory === "retail_leasing"
          ? "lease"
          : listingCategory === "investment"
            ? "investment"
            : "sale",
    }));
  };

  const handleSubmit = async () => {
    if (!form.title || !form.listingCategory || !category) {
      setError("Title, listing category, and property type are required.");
      return;
    }
    setSaving(true); setError("");
    try {
      const fd = new FormData();
      fd.append("category", category);
      Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));
      fd.append("categoryDetails", JSON.stringify(catDetails));
      fd.append("nearby", JSON.stringify(nearby.filter((n) => n.name)));
      fd.append("amenities", JSON.stringify(selectedAmenities));
      if (selectedBrokers.length > 0) fd.append("brokerIds", JSON.stringify(selectedBrokers));
      if (featuredImageFile) fd.append("featuredImage", featuredImageFile);
      galleryFiles.forEach((f) => fd.append("gallery", f));
      if (brochureFile) fd.append("brochurePdf", brochureFile);
      floorPlanFiles.forEach((f) => fd.append("floorPlans", f));

      await createProperty(fd);
      router.push("/dashboard/admin/properties");
    } catch (e: any) {
      const apiError = e.response?.data;
      setError(
        apiError?.details
          ? `${apiError.error || "Failed to create property."} ${apiError.details}`
          : apiError?.error || "Failed to create property."
      );
    }
    setSaving(false);
  };

  return (
    <>
      <AdminHeader title="Add New Property" onMenuToggle={() => {}} />
      <main style={{ padding: "24px 28px", flex: 1, maxWidth: 900, margin: "0 auto", width: "100%" }}>

        {/* Step Indicator */}
        <StepBar step={step} labels={["Listing Category", "Details", "Media", "Brokers & Submit"]} />

        {error && (
          <div style={{ background: "#fff5f5", border: "1px solid #fed7d7", borderRadius: 8, padding: "12px 16px", color: "#c53030", marginBottom: 20 }}>
            {error}
          </div>
        )}

        {/* Step 1 — Listing Category Selection */}
        {step === 1 && (
          <Section title="Select Listing Category">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
              {ADMIN_LISTING_CATEGORY_OPTIONS.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => handleListingCategorySelect(cat.value)}
                  style={{
                    padding: "20px 16px", border: `2px solid ${form.listingCategory === cat.value ? "#6dbf8b" : "#e2e8f0"}`,
                    borderRadius: 12, background: form.listingCategory === cat.value ? "#f0fff4" : "#fff",
                    cursor: "pointer", textAlign: "left", transition: "all 0.15s",
                  }}
                >
                  <div style={{ fontSize: 15, fontWeight: 600, color: form.listingCategory === cat.value ? "#276749" : "#2d3748" }}>{cat.label}</div>
                </button>
              ))}
            </div>
            <NavButtons
              onNext={() => { if (!form.listingCategory) { setError("Please select a listing category."); return; } setError(""); setStep(2); }}
              nextLabel="Next: Property Details →"
            />
          </Section>
        )}

        {/* Step 2 — Common + Category-specific fields */}
        {step === 2 && (
          <Section title="Property Details">
            <SubHeading>Basic Information</SubHeading>
            <Grid2>
              <Field label="Property Title *" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
              <Field label="Reference Number (auto if blank)" value={form.referenceNumber} onChange={(v) => setForm({ ...form, referenceNumber: v })} />
            </Grid2>
            <Grid2>
              <div>
                <label style={labelStyle}>Listing Category *</label>
                <select value={form.listingCategory} onChange={(e) => handleListingCategorySelect(e.target.value)} style={inputStyle}>
                  <option value="">Select listing category</option>
                  {ADMIN_LISTING_CATEGORY_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Property Type *</label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setCatDetails({});
                    setSelectedAmenities([]);
                  }}
                  style={inputStyle}
                >
                  <option value="">Select property type</option>
                  {propertyTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </Grid2>
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={4} style={{ ...inputStyle, resize: "vertical" }}
              />
            </div>
            <Grid2>
              <div>
                <label style={labelStyle}>Listing Type *</label>
                <select value={form.listingType} onChange={(e) => setForm({ ...form, listingType: e.target.value })} style={inputStyle}>
                  <option value="sale">For Sale</option>
                  <option value="lease">For Lease</option>
                  <option value="investment">Investment</option>
                </select>
              </div>
              <Field label="Price (R)" value={form.price} onChange={(v) => setForm({ ...form, price: v })} type="number" />
            </Grid2>
            <SubHeading>Location</SubHeading>
            <Grid2>
              <Field label="Province" value={form.province} onChange={(v) => { const f = { ...form, province: v }; setForm(f); updateMap(f); }} />
              <Field label="City" value={form.city} onChange={(v) => { const f = { ...form, city: v }; setForm(f); updateMap(f); }} />
              <Field label="Suburb" value={form.suburb} onChange={(v) => { const f = { ...form, suburb: v }; setForm(f); updateMap(f); }} />
              <Field label="Full Address" value={form.address} onChange={(v) => { const f = { ...form, address: v }; setForm(f); updateMap(f); }} />
              <Field label="GPS Latitude" value={form.gpsLat} onChange={(v) => setForm({ ...form, gpsLat: v })} type="number" />
              <Field label="GPS Longitude" value={form.gpsLng} onChange={(v) => setForm({ ...form, gpsLng: v })} type="number" />
            </Grid2>

            {/* Live Map Preview */}
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Map Preview</label>
              {mapSrc ? (
                <div style={{ width: "100%", height: 320, borderRadius: 10, overflow: "hidden", border: "1px solid #e2e8f0" }}>
                  <iframe
                    src={mapSrc}
                    width="100%" height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              ) : (
                <div style={{ width: "100%", height: 200, borderRadius: 10, background: "#f7f8fa", border: "2px dashed #e2e8f0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#a0aec0", gap: 8 }}>
                  <i className="bi bi-geo-alt" style={{ fontSize: 32 }} />
                  <span style={{ fontSize: 13 }}>Start typing an address above to see the map</span>
                </div>
              )}
            </div>

            {/* Category-specific fields */}
            {COMMERCIAL_CATEGORY_FIELDS[category]?.length > 0 && (
              <>
                <SubHeading>{COMMERCIAL_CATEGORY_OPTIONS.find((c) => c.value === category)?.label} Details</SubHeading>
                <Grid2>
                  {COMMERCIAL_CATEGORY_FIELDS[category].map((f) => (
                    <div key={f.key}>
                      <label style={labelStyle}>{f.label}{f.unit ? ` (${f.unit})` : ""}</label>
                      {f.type === "select" ? (
                        <select
                          value={catDetails[f.key] || ""}
                          onChange={(e) => setCatDetails({ ...catDetails, [f.key]: e.target.value })}
                          style={inputStyle}
                        >
                          {(f.options || []).map((option) => (
                            <option key={option.value || option.text} value={option.value}>{option.text}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={f.type === "number" ? "number" : "text"}
                          placeholder={f.placeholder || ""}
                          value={catDetails[f.key] || ""}
                          onChange={(e) => setCatDetails({ ...catDetails, [f.key]: e.target.value })}
                          style={inputStyle}
                        />
                      )}
                    </div>
                  ))}
                </Grid2>
              </>
            )}

            <Grid2>
              <div>
                <label style={labelStyle}>Status</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} style={inputStyle}>
                  {["draft", "pending", "published"].map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <Field label="Virtual Tour URL" value={form.virtualTourLink} onChange={(v) => setForm({ ...form, virtualTourLink: v })} />
            </Grid2>
            <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 16, cursor: "pointer" }}>
              <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} />
              <span style={{ fontSize: 14, color: "#4a5568" }}>Mark as Featured Listing</span>
            </label>

            <SubHeading>What&apos;s Nearby</SubHeading>
            <p style={{ fontSize: 13, color: "#718096", marginBottom: 12 }}>Add nearby places (schools, hospitals, transport, etc.) with approximate distances.</p>
            {nearby.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "center" }}>
                <input
                  type="text" placeholder="Place name (e.g. School & College)"
                  value={item.name}
                  onChange={(e) => updateNearby(i, "name", e.target.value)}
                  style={{ flex: 2, padding: "8px 10px", border: "1px solid #e2e8f0", borderRadius: 6, fontSize: 13 }}
                />
                <input
                  type="text" placeholder="Distance (e.g. 0.9km)"
                  value={item.distance}
                  onChange={(e) => updateNearby(i, "distance", e.target.value)}
                  style={{ flex: 1, padding: "8px 10px", border: "1px solid #e2e8f0", borderRadius: 6, fontSize: 13 }}
                />
                <button onClick={() => removeNearby(i)} style={{ background: "#fff5f5", border: "1px solid #fed7d7", borderRadius: 6, color: "#c53030", cursor: "pointer", padding: "6px 10px", fontSize: 13 }}>✕</button>
              </div>
            ))}
            <button onClick={addNearby} style={{ fontSize: 13, color: "#276749", background: "#f0fff4", border: "1px solid #c6f6d5", borderRadius: 6, padding: "7px 14px", cursor: "pointer", marginTop: 4 }}>+ Add Place</button>

            <SubHeading>Amenities</SubHeading>
            <p style={{ fontSize: 13, color: "#718096", marginBottom: 12 }}>Select all amenities available at this property.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 8 }}>
              {(CATEGORY_AMENITIES[category] || []).map((a) => (
                <label key={a} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, color: "#4a5568", padding: "6px 10px", border: `1px solid ${selectedAmenities.includes(a) ? "#6dbf8b" : "#e2e8f0"}`, borderRadius: 6, background: selectedAmenities.includes(a) ? "#f0fff4" : "#fff" }}>
                  <input type="checkbox" checked={selectedAmenities.includes(a)} onChange={() => toggleAmenity(a)} />
                  {a}
                </label>
              ))}
            </div>

            <NavButtons
              onBack={() => setStep(1)}
              onNext={() => { setError(""); setStep(3); }}
              nextLabel="Next: Media →"
            />
          </Section>
        )}

        {/* Step 3 — Media */}
        {step === 3 && (
          <Section title="Media & Documents">
            <SubHeading>Featured Image</SubHeading>
            {featuredPreview && <img src={featuredPreview} alt="preview" style={{ width: 200, height: 130, objectFit: "cover", borderRadius: 8, marginBottom: 12 }} />}
            <input
              type="file" accept="image/*"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) { setFeaturedImageFile(f); setFeaturedPreview(URL.createObjectURL(f)); }
              }}
              style={{ fontSize: 14 }}
            />

            <SubHeading>Gallery Images (drag & drop)</SubHeading>
            <div
              {...getRootProps()}
              style={{
                border: `2px dashed ${isDragActive ? "#6dbf8b" : "#e2e8f0"}`,
                borderRadius: 8, padding: 24, textAlign: "center", cursor: "pointer",
                background: isDragActive ? "#f0fff4" : "#fafafa", marginBottom: 12,
              }}
            >
              <input {...getInputProps()} />
              <i className="bi bi-images" style={{ fontSize: 28, color: "#a0aec0" }} />
              <p style={{ color: "#718096", margin: "8px 0 0", fontSize: 14 }}>
                {isDragActive ? "Drop images here..." : "Drag & drop images, or click to select"}
              </p>
            </div>
            {galleryPreviews.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {galleryPreviews.map((src, i) => (
                  <div key={i} style={{ position: "relative" }}>
                    <img src={src} alt="" style={{ width: 80, height: 60, objectFit: "cover", borderRadius: 4 }} />
                    <button
                      onClick={() => {
                        setGalleryFiles((p) => p.filter((_, j) => j !== i));
                        setGalleryPreviews((p) => p.filter((_, j) => j !== i));
                      }}
                      style={{ position: "absolute", top: 2, right: 2, background: "rgba(0,0,0,0.5)", color: "#fff", border: "none", borderRadius: "50%", width: 18, height: 18, cursor: "pointer", fontSize: 12, lineHeight: 1, padding: 0 }}
                    >×</button>
                  </div>
                ))}
              </div>
            )}

            <SubHeading>Brochure PDF</SubHeading>
            <input type="file" accept=".pdf" onChange={(e) => setBrochureFile(e.target.files?.[0] || null)} style={{ fontSize: 14 }} />
            {brochureFile && <div style={{ fontSize: 13, color: "#48bb78", marginTop: 4 }}>{brochureFile.name}</div>}

            <SubHeading>Floor Plans</SubHeading>
            <input
              type="file" accept="image/*,.pdf" multiple
              onChange={(e) => setFloorPlanFiles(Array.from(e.target.files || []))}
              style={{ fontSize: 14 }}
            />
            {floorPlanFiles.length > 0 && <div style={{ fontSize: 13, color: "#48bb78", marginTop: 4 }}>{floorPlanFiles.length} file(s) selected</div>}

            <NavButtons
              onBack={() => setStep(2)}
              onNext={() => { setError(""); setStep(4); }}
              nextLabel="Next: Assign Brokers →"
            />
          </Section>
        )}

        {/* Step 4 — Broker Assignment & Submit */}
        {step === 4 && (
          <Section title="Assign Brokers & Submit">
            <SubHeading>Select Brokers for this Property</SubHeading>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12, marginBottom: 24 }}>
              {brokers.filter((b) => b.isActive).length === 0 ? (
                <p style={{ color: "#a0aec0", fontSize: 14 }}>No active brokers. <a href="/dashboard/admin/brokers" style={{ color: "#6dbf8b" }}>Add brokers first.</a></p>
              ) : (
                brokers
                  .filter((b: any) => b.isActive)
                  .map((b) => {
                    const selected = selectedBrokers.includes(b.id);
                    return (
                      <button
                        key={b.id}
                        onClick={() =>
                          setSelectedBrokers((prev) =>
                            selected ? prev.filter((x) => x !== b.id) : [...prev, b.id]
                          )
                        }
                        style={{
                          display: "flex", alignItems: "center", gap: 10, padding: "12px 14px",
                          border: `2px solid ${selected ? "#6dbf8b" : "#e2e8f0"}`,
                          borderRadius: 10, background: selected ? "#f0fff4" : "#fff",
                          cursor: "pointer", textAlign: "left",
                        }}
                      >
                        {b.photo ? (
                          <img src={b.photo} alt="" style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover" }} />
                        ) : (
                          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#718096" }}>
                            {b.fullName[0]}
                          </div>
                        )}
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: selected ? "#276749" : "#2d3748" }}>{b.fullName}</div>
                          {b.position && <div style={{ fontSize: 11, color: "#718096" }}>{b.position}</div>}
                        </div>
                      </button>
                    );
                  })
              )}
            </div>

            <div style={{ display: "flex", gap: 12, justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f0f4f8", paddingTop: 20 }}>
              <button onClick={() => setStep(3)} style={btnSecondary}>← Back</button>
              <button onClick={handleSubmit} disabled={saving} style={btnPrimary}>
                {saving ? "Submitting..." : "Create Property"}
              </button>
            </div>
          </Section>
        )}
      </main>
    </>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function StepBar({ step, labels }: { step: number; labels: string[] }) {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 28, background: "#fff", borderRadius: 10, padding: "16px 20px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
      {labels.map((label, i) => {
        const num = i + 1;
        const done = step > num;
        const active = step === num;
        return (
          <div key={label} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                background: done ? "#6dbf8b" : active ? "#2d3748" : "#e2e8f0",
                color: done || active ? "#fff" : "#718096", fontWeight: 700, fontSize: 13,
              }}>
                {done ? <i className="bi bi-check" /> : num}
              </div>
              <span style={{ fontSize: 13, fontWeight: active ? 600 : 400, color: active ? "#2d3748" : "#a0aec0" }}>{label}</span>
            </div>
            {i < labels.length - 1 && <div style={{ flex: 1, height: 2, background: done ? "#6dbf8b" : "#e2e8f0", margin: "0 12px" }} />}
          </div>
        );
      })}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: "24px 28px", boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
      <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1a2332", marginTop: 0, marginBottom: 20 }}>{title}</h2>
      {children}
    </div>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 style={{ fontSize: 14, fontWeight: 600, color: "#4a5568", margin: "20px 0 12px", textTransform: "uppercase", letterSpacing: 0.5 }}>{children}</h3>;
}

function Grid2({ children }: { children: React.ReactNode }) {
  return <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>{children}</div>;
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} style={inputStyle} />
    </div>
  );
}

function NavButtons({ onBack, onNext, nextLabel }: { onBack?: () => void; onNext?: () => void; nextLabel?: string }) {
  return (
    <div style={{ display: "flex", gap: 12, marginTop: 24, justifyContent: "space-between" }}>
      {onBack ? <button onClick={onBack} style={btnSecondary}>← Back</button> : <span />}
      {onNext && <button onClick={onNext} style={btnPrimary}>{nextLabel || "Next →"}</button>}
    </div>
  );
}

const inputStyle: React.CSSProperties = { width: "100%", padding: "9px 12px", border: "1px solid #e2e8f0", borderRadius: 6, fontSize: 14, outline: "none", boxSizing: "border-box" };
const labelStyle: React.CSSProperties = { display: "block", fontSize: 13, fontWeight: 500, color: "#4a5568", marginBottom: 6 };
const btnPrimary: React.CSSProperties = { background: "#6dbf8b", color: "#fff", border: "none", borderRadius: 8, padding: "10px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer" };
const btnSecondary: React.CSSProperties = { background: "#f0f4f8", color: "#4a5568", border: "1px solid #e2e8f0", borderRadius: 8, padding: "10px 20px", fontSize: 14, cursor: "pointer" };
