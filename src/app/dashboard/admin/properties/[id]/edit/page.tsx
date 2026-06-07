"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import AdminHeader from "@/components/dashboard/admin/AdminHeader";
import { fetchPropertyById, updateProperty, fetchAllBrokers } from "@/utils/dashboardApi";
import { getApiErrorMessage } from "@/utils/apiError";
import { resolveAdminMediaUrl } from "@/utils/publicMedia";
import { useDropzone } from "react-dropzone";
import {
  ADMIN_LISTING_CATEGORY_DEFAULT_PROPERTY_TYPE,
  ADMIN_LISTING_CATEGORY_OPTIONS,
  ADMIN_LISTING_CATEGORY_PROPERTY_TYPES,
  CATEGORY_AMENITIES,
  COMMERCIAL_CATEGORY_OPTIONS,
  COMMERCIAL_CATEGORY_FIELDS,
  deriveListingCategory,
  categorySupportsUnits,
} from "@/data/commercialPropertyConfig";
import { UnitsBuilder, type UnitDraft, buildUnitsFormData, unitsToDrafts } from "@/components/dashboard/admin/UnitsBuilder";

interface Broker { id: number; fullName: string; position?: string; photo?: string; isActive: boolean }
interface SubmittedByUser { id: number; name: string; email: string; avatar?: string; jobTitle?: string; company?: string }

export default function EditPropertyPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [brokers, setBrokers] = useState<Broker[]>([]);
  const [selectedBrokers, setSelectedBrokers] = useState<number[]>([]);
  const [assignedBrokerId, setAssignedBrokerId] = useState<number | null>(null);
  const [submittedByUser, setSubmittedByUser] = useState<SubmittedByUser | null>(null);
  const [category, setCategory] = useState("");
  const [catDetails, setCatDetails] = useState<Record<string, string>>({});
  const [units, setUnits] = useState<UnitDraft[]>([]);
  const [form, setForm] = useState<Record<string, any>>({});
  const [existingGallery, setExistingGallery] = useState<string[]>([]);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [featuredPreview, setFeaturedPreview] = useState("");
  const [existingFloorPlans, setExistingFloorPlans] = useState<string[]>([]);
  const [floorPlanFiles, setFloorPlanFiles] = useState<File[]>([]);
  const [floorPlanPreviews, setFloorPlanPreviews] = useState<string[]>([]);
  const [nearby, setNearby] = useState<{ name: string; distance: string }[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const toggleAmenity = (a: string) =>
    setSelectedAmenities((p) => p.includes(a) ? p.filter((x) => x !== a) : [...p, a]);
  const propertyTypeOptions = COMMERCIAL_CATEGORY_OPTIONS.filter((option) => {
    const allowedTypes = ADMIN_LISTING_CATEGORY_PROPERTY_TYPES[form.listingCategory || ""];
    return !allowedTypes || allowedTypes.includes(option.value);
  });
  const addNearby = () => setNearby((p) => [...p, { name: "", distance: "" }]);
  const removeNearby = (i: number) => setNearby((p) => p.filter((_, j) => j !== i));
  const updateNearby = (i: number, field: "name" | "distance", val: string) =>
    setNearby((p) => p.map((item, j) => j === i ? { ...item, [field]: val } : item));

  // Map
  const [mapSrc, setMapSrc] = useState("");
  const mapDebounce = useRef<ReturnType<typeof setTimeout> | null>(null);
  const updateMap = useCallback((f: Record<string, any>) => {
    const q = [f.address, f.suburb, f.city, f.province, "South Africa"].filter(Boolean).join(", ");
    if (!q.trim() || q === "South Africa") return;
    if (mapDebounce.current) clearTimeout(mapDebounce.current);
    mapDebounce.current = setTimeout(() => {
      setMapSrc(`https://maps.google.com/maps?width=600&height=350&hl=en&q=${encodeURIComponent(q)}&t=&z=14&ie=UTF8&iwloc=B&output=embed`);
    }, 800);
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const [propRes, brokersRes] = await Promise.all([
          fetchPropertyById(parseInt(id)),
          fetchAllBrokers(),
        ]);
        const p = propRes.data;
        const normalizedListingCategory = deriveListingCategory(p.category, p.listingType);
        setCategory(p.category);
        setForm({
          title: p.title || "", referenceNumber: p.referenceNumber || "",
          description: p.description || "",
          listingCategory: normalizedListingCategory,
          listingType: p.listingType || "sale",
          price: p.price || "", province: p.province || "", city: p.city || "",
          suburb: p.suburb || "", address: p.address || "",
          gpsLat: p.gpsLat || "", gpsLng: p.gpsLng || "",
          virtualTourLink: p.virtualTourLink || "", status: p.status || "draft",
          isFeatured: p.isFeatured || false,
        });
        setCatDetails(p.categoryDetails || {});
        setUnits(unitsToDrafts(p.units));
        setExistingGallery(p.gallery || []);
        setExistingFloorPlans(p.floorPlans || []);
        setFeaturedPreview(p.featuredImage || "");
        setNearby(p.nearby || []);
        setSelectedAmenities(p.amenities || []);
        setSelectedBrokers((p.brokers || []).map((b: Broker) => b.id));
        setAssignedBrokerId(p.assignedBrokerId || null);
        setSubmittedByUser(p.submittedByUser || null);
        setBrokers(brokersRes.data);
        // Initialise map from saved address
        const q = [p.address, p.suburb, p.city, p.province, "South Africa"].filter(Boolean).join(", ");
        if (q && q !== "South Africa") {
          setMapSrc(`https://maps.google.com/maps?width=600&height=350&hl=en&q=${encodeURIComponent(q)}&t=&z=14&ie=UTF8&iwloc=B&output=embed`);
        }
      } catch { setError("Failed to load property."); }
      setLoading(false);
    };
    load();
  }, [id]);

  const onDropGallery = useCallback((files: File[]) => {
    setGalleryFiles((prev) => [...prev, ...files]);
    setGalleryPreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropGallery, accept: { "image/*": [] }, multiple: true,
  });

  const handleSave = async () => {
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
      if (categorySupportsUnits(category)) buildUnitsFormData(fd, units);
      fd.append("gallery", JSON.stringify(existingGallery));
      fd.append("floorPlans", JSON.stringify(existingFloorPlans));
      fd.append("brokerIds", JSON.stringify(selectedBrokers));
      if (assignedBrokerId !== null) fd.append("assignedBrokerId", String(assignedBrokerId));
      else fd.append("assignedBrokerId", "");
      if (featuredImageFile) fd.append("featuredImage", featuredImageFile);
      galleryFiles.forEach((f) => fd.append("gallery", f));
      floorPlanFiles.forEach((f) => fd.append("floorPlans", f));
      await updateProperty(parseInt(id), fd);
      router.push("/dashboard/admin/properties");
    } catch (e: unknown) {
      setError(getApiErrorMessage(e, "Failed to update property."));
    }
    setSaving(false);
  };

  if (loading) return (
    <>
      <AdminHeader title="Edit Property" onMenuToggle={() => {}} />
      <main style={{ padding: 32 }}><div style={{ textAlign: "center", color: "#718096" }}>Loading...</div></main>
    </>
  );

  return (
    <>
      <AdminHeader title="Edit Property" onMenuToggle={() => {}} />
      <main style={{ padding: "24px 28px", flex: 1, maxWidth: 900, margin: "0 auto", width: "100%" }}>
        {error && <div style={{ background: "#fff5f5", border: "1px solid #fed7d7", borderRadius: 8, padding: "12px 16px", color: "#c53030", marginBottom: 20 }}>{error}</div>}

        <div style={{ background: "#fff", borderRadius: 12, padding: "24px 28px", boxShadow: "0 1px 6px rgba(0,0,0,0.06)", marginBottom: 20 }}>
          <h2 style={sectionTitle}>Basic Information</h2>
          <div style={grid2}>
            <Field label="Title *" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
            <Field label="Reference Number" value={form.referenceNumber} onChange={(v) => setForm({ ...form, referenceNumber: v })} />
          </div>
          <div style={grid2}>
            <div>
              <label style={lbl}>Listing Category *</label>
              <select
                value={form.listingCategory || ""}
                onChange={(e) => {
                  const nextListingCategory = e.target.value;
                  const allowedTypes = ADMIN_LISTING_CATEGORY_PROPERTY_TYPES[nextListingCategory] || [];
                  const defaultCategory = ADMIN_LISTING_CATEGORY_DEFAULT_PROPERTY_TYPE[nextListingCategory] || "";
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
                    setUnits([]);
                  }

                  setForm({
                    ...form,
                    listingCategory: nextListingCategory,
                    listingType:
                      nextListingCategory === "retail_leasing"
                        ? "lease"
                        : nextListingCategory === "investment"
                          ? "investment"
                          : "sale",
                  });
                }}
                style={inp}
              >
                <option value="">Select listing category</option>
                {ADMIN_LISTING_CATEGORY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={lbl}>Property Type *</label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setCatDetails({});
                  setSelectedAmenities([]);
                  setUnits([]);
                }}
                style={inp}
              >
                <option value="">Select property type</option>
                {propertyTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={lbl}>Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} style={{ ...inp, resize: "vertical" }} />
          </div>
          <div style={grid2}>
            <div><label style={lbl}>Listing Type</label>
              <select value={form.listingType} onChange={(e) => setForm({ ...form, listingType: e.target.value })} style={inp}>
                <option value="sale">For Sale</option><option value="lease">To Let</option><option value="investment">Investment</option>
              </select>
            </div>
            <Field label="Price (R)" value={String(form.price)} onChange={(v) => setForm({ ...form, price: v })} type="number" />
          </div>
          <div style={grid2}>
            <Field label="Province" value={form.province} onChange={(v) => { const f = { ...form, province: v }; setForm(f); updateMap(f); }} />
            <Field label="City" value={form.city} onChange={(v) => { const f = { ...form, city: v }; setForm(f); updateMap(f); }} />
            <Field label="Suburb" value={form.suburb} onChange={(v) => { const f = { ...form, suburb: v }; setForm(f); updateMap(f); }} />
            <Field label="Address" value={form.address} onChange={(v) => { const f = { ...form, address: v }; setForm(f); updateMap(f); }} />
            <Field label="GPS Lat" value={String(form.gpsLat)} onChange={(v) => setForm({ ...form, gpsLat: v })} type="number" />
            <Field label="GPS Lng" value={String(form.gpsLng)} onChange={(v) => setForm({ ...form, gpsLng: v })} type="number" />
          </div>
          {/* Live Map Preview */}
          <div style={{ marginBottom: 16 }}>
            <label style={lbl}>Map Preview</label>
            {mapSrc ? (
              <div style={{ width: "100%", height: 300, borderRadius: 10, overflow: "hidden", border: "1px solid #e2e8f0" }}>
                <iframe src={mapSrc} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            ) : (
              <div style={{ width: "100%", height: 160, borderRadius: 10, background: "#f7f8fa", border: "2px dashed #e2e8f0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#a0aec0", gap: 8 }}>
                <i className="bi bi-geo-alt" style={{ fontSize: 28 }} />
                <span style={{ fontSize: 13 }}>Enter an address above to preview the location</span>
              </div>
            )}
          </div>
          <div style={grid2}>
            <div><label style={lbl}>Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} style={inp}>
                {["draft","pending","published","under_offer","sold","leased","archived"].map((s) => <option key={s} value={s}>{s.replace("_"," ")}</option>)}
              </select>
            </div>
            <Field label="Virtual Tour URL" value={form.virtualTourLink} onChange={(v) => setForm({ ...form, virtualTourLink: v })} />
          </div>
          <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14, color: "#4a5568" }}>
            <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} />
            Featured Listing
          </label>
        </div>

        {/* What's Nearby */}
        <div style={{ background: "#fff", borderRadius: 12, padding: "24px 28px", boxShadow: "0 1px 6px rgba(0,0,0,0.06)", marginBottom: 20 }}>
          <h2 style={sectionTitle}>What&apos;s Nearby</h2>
          <p style={{ fontSize: 13, color: "#718096", marginBottom: 14 }}>Add nearby places with approximate distances. These will show on the public property page.</p>
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
        </div>

        {/* Amenities */}
        <div style={{ background: "#fff", borderRadius: 12, padding: "24px 28px", boxShadow: "0 1px 6px rgba(0,0,0,0.06)", marginBottom: 20 }}>
          <h2 style={sectionTitle}>Amenities</h2>
          <p style={{ fontSize: 13, color: "#718096", marginBottom: 14 }}>Select all amenities available at this property.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 8 }}>
            {(CATEGORY_AMENITIES[category] || []).map((a) => (
              <label key={a} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, color: "#4a5568", padding: "6px 10px", border: `1px solid ${selectedAmenities.includes(a) ? "#6dbf8b" : "#e2e8f0"}`, borderRadius: 6, background: selectedAmenities.includes(a) ? "#f0fff4" : "#fff" }}>
                <input type="checkbox" checked={selectedAmenities.includes(a)} onChange={() => toggleAmenity(a)} />
                {a}
              </label>
            ))}
          </div>
        </div>

        {/* Category-specific */}
        {COMMERCIAL_CATEGORY_FIELDS[category]?.length > 0 && (
          <div style={{ background: "#fff", borderRadius: 12, padding: "24px 28px", boxShadow: "0 1px 6px rgba(0,0,0,0.06)", marginBottom: 20 }}>
            <h2 style={sectionTitle}>Category Details</h2>
            <div style={grid2}>
              {COMMERCIAL_CATEGORY_FIELDS[category].map((f) => (
                <div key={f.key}>
                  <label style={lbl}>{f.label}{f.unit ? ` (${f.unit})` : ""}</label>
                  {f.type === "select" ? (
                    <select value={catDetails[f.key] || ""} onChange={(e) => setCatDetails({ ...catDetails, [f.key]: e.target.value })} style={inp}>
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
                      style={inp}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Units / Shops */}
        {categorySupportsUnits(category) && (
          <div style={{ background: "#fff", borderRadius: 12, padding: "24px 28px", boxShadow: "0 1px 6px rgba(0,0,0,0.06)", marginBottom: 20 }}>
            <h2 style={sectionTitle}>Units / Shops</h2>
            <UnitsBuilder units={units} setUnits={setUnits} />
          </div>
        )}

        {/* Media */}
        <div style={{ background: "#fff", borderRadius: 12, padding: "24px 28px", boxShadow: "0 1px 6px rgba(0,0,0,0.06)", marginBottom: 20 }}>
          <h2 style={sectionTitle}>Media</h2>
          <label style={lbl}>Featured Image</label>
          {featuredPreview && <img src={featuredPreview} alt="" style={{ width: 160, height: 100, objectFit: "cover", borderRadius: 6, marginBottom: 8, display: "block" }} />}
          <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setFeaturedImageFile(f); setFeaturedPreview(URL.createObjectURL(f)); } }} style={{ fontSize: 14 }} />

          <label style={{ ...lbl, marginTop: 16 }}>Gallery Images</label>
          {existingGallery.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
              {existingGallery.map((src, i) => (
                <div key={i} style={{ position: "relative" }}>
                  <img src={src} alt="" style={{ width: 80, height: 60, objectFit: "cover", borderRadius: 4 }} />
                  <button onClick={() => setExistingGallery((p) => p.filter((_, j) => j !== i))} style={{ position: "absolute", top: 2, right: 2, background: "rgba(0,0,0,0.5)", color: "#fff", border: "none", borderRadius: "50%", width: 18, height: 18, cursor: "pointer", fontSize: 11 }}>×</button>
                </div>
              ))}
            </div>
          )}
          <div {...getRootProps()} style={{ border: `2px dashed ${isDragActive ? "#6dbf8b" : "#e2e8f0"}`, borderRadius: 8, padding: 20, textAlign: "center", cursor: "pointer", background: isDragActive ? "#f0fff4" : "#fafafa" }}>
            <input {...getInputProps()} />
            <p style={{ color: "#718096", margin: 0, fontSize: 14 }}>{isDragActive ? "Drop images..." : "Drag & drop or click to add images"}</p>
          </div>
          {galleryPreviews.map((src, i) => (
            <img key={i} src={src} alt="" style={{ width: 80, height: 60, objectFit: "cover", borderRadius: 4, margin: "4px 4px 0 0" }} />
          ))}

          <label style={{ ...lbl, marginTop: 20 }}>Floor Plans</label>
          <p style={{ fontSize: 12, color: "#718096", marginBottom: 8 }}>Upload floor plan images. These will appear on the public property page under Video Tour.</p>
          {existingFloorPlans.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
              {existingFloorPlans.map((src, i) => (
                <div key={i} style={{ position: "relative" }}>
                  <img src={src} alt={`Floor Plan ${i + 1}`} style={{ width: 100, height: 75, objectFit: "cover", borderRadius: 4, border: "1px solid #e2e8f0" }} />
                  <button onClick={() => setExistingFloorPlans((p) => p.filter((_, j) => j !== i))} style={{ position: "absolute", top: 2, right: 2, background: "rgba(0,0,0,0.5)", color: "#fff", border: "none", borderRadius: "50%", width: 18, height: 18, cursor: "pointer", fontSize: 11 }}>×</button>
                </div>
              ))}
            </div>
          )}
          <input type="file" accept="image/*" multiple onChange={(e) => {
            const files = Array.from(e.target.files || []);
            setFloorPlanFiles((p) => [...p, ...files]);
            setFloorPlanPreviews((p) => [...p, ...files.map((f) => URL.createObjectURL(f))]);
          }} style={{ fontSize: 14 }} />
          {floorPlanPreviews.map((src, i) => (
            <img key={i} src={src} alt="" style={{ width: 100, height: 75, objectFit: "cover", borderRadius: 4, margin: "4px 4px 0 0", border: "1px solid #6dbf8b" }} />
          ))}
        </div>

        {/* Client listing — assign contact broker (shown when property is a client submission) */}
        {submittedByUser && (
          <div style={{ background: "#fff8e1", border: "1px solid #ffc107", borderRadius: 12, padding: "24px 28px", boxShadow: "0 1px 6px rgba(0,0,0,0.06)", marginBottom: 20 }}>
            <h2 style={{ ...sectionTitle, color: "#795548" }}>Client Submission: Contact Broker</h2>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              {submittedByUser.avatar
                ? <img src={submittedByUser.avatar} alt="" style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover" }} />
                : <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#718096", fontSize: 16 }}>{submittedByUser.name?.[0] || "?"}</div>
              }
              <div>
                <div style={{ fontWeight: 600, color: "#2d3748", fontSize: 14 }}>{submittedByUser.name}</div>
                <div style={{ fontSize: 12, color: "#718096" }}>{submittedByUser.jobTitle || ""}{submittedByUser.company ? ` · ${submittedByUser.company}` : ""}</div>
                <div style={{ fontSize: 11, color: "#a0aec0" }}>{submittedByUser.email}</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: "#666", marginBottom: 14 }}>
              If this client is on the <strong>Free plan</strong>, select which broker will appear as the contact on their listing.
              Leave blank to use the first available broker.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              <button onClick={() => setAssignedBrokerId(null)}
                style={{ padding: "8px 14px", border: `2px solid ${assignedBrokerId === null ? "#6dbf8b" : "#e2e8f0"}`, borderRadius: 8, background: assignedBrokerId === null ? "#f0fff4" : "#fff", cursor: "pointer", fontSize: 13, fontWeight: assignedBrokerId === null ? 600 : 400, color: assignedBrokerId === null ? "#276749" : "#4a5568" }}>
                Auto (first broker)
              </button>
              {brokers.filter((b) => b.isActive).map((b) => (
                <button key={b.id} onClick={() => setAssignedBrokerId(b.id)}
                  style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", border: `2px solid ${assignedBrokerId === b.id ? "#6dbf8b" : "#e2e8f0"}`, borderRadius: 8, background: assignedBrokerId === b.id ? "#f0fff4" : "#fff", cursor: "pointer" }}>
                  {b.photo
                    ? <img src={resolveAdminMediaUrl(b.photo)} alt="" style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover" }} />
                    : <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#718096", fontSize: 12 }}>{b.fullName[0]}</div>}
                  <span style={{ fontSize: 13, fontWeight: assignedBrokerId === b.id ? 600 : 400, color: assignedBrokerId === b.id ? "#276749" : "#4a5568" }}>{b.fullName}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Broker assignment */}
        <div style={{ background: "#fff", borderRadius: 12, padding: "24px 28px", boxShadow: "0 1px 6px rgba(0,0,0,0.06)", marginBottom: 20 }}>
          <h2 style={sectionTitle}>Assigned Brokers</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {brokers.filter((b) => b.isActive).map((b) => {
              const sel = selectedBrokers.includes(b.id);
              return (
                <button key={b.id} onClick={() => setSelectedBrokers((p) => sel ? p.filter((x) => x !== b.id) : [...p, b.id])}
                  style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", border: `2px solid ${sel ? "#6dbf8b" : "#e2e8f0"}`, borderRadius: 8, background: sel ? "#f0fff4" : "#fff", cursor: "pointer" }}>
                  {b.photo ? <img src={resolveAdminMediaUrl(b.photo)} alt="" style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover" }} /> :
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#718096", fontSize: 12 }}>{b.fullName[0]}</div>}
                  <span style={{ fontSize: 13, fontWeight: sel ? 600 : 400, color: sel ? "#276749" : "#4a5568" }}>{b.fullName}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button onClick={() => router.push("/dashboard/admin/properties")} style={btnSec}>← Cancel</button>
          <button onClick={handleSave} disabled={saving} style={btnPri}>{saving ? "Saving..." : "Save Changes"}</button>
        </div>
      </main>
    </>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return <div><label style={lbl}>{label}</label><input type={type} value={value} onChange={(e) => onChange(e.target.value)} style={inp} /></div>;
}

const inp: React.CSSProperties = { width: "100%", padding: "9px 12px", border: "1px solid #e2e8f0", borderRadius: 6, fontSize: 14, outline: "none", boxSizing: "border-box" };
const lbl: React.CSSProperties = { display: "block", fontSize: 13, fontWeight: 500, color: "#4a5568", marginBottom: 6 };
const grid2: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 };
const sectionTitle: React.CSSProperties = { fontSize: 15, fontWeight: 700, color: "#1a2332", marginTop: 0, marginBottom: 16 };
const btnPri: React.CSSProperties = { background: "#6dbf8b", color: "#fff", border: "none", borderRadius: 8, padding: "10px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer" };
const btnSec: React.CSSProperties = { background: "#f0f4f8", color: "#4a5568", border: "1px solid #e2e8f0", borderRadius: 8, padding: "10px 20px", fontSize: 14, cursor: "pointer" };
