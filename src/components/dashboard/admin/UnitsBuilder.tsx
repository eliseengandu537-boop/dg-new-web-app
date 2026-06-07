"use client";
import { resolveAdminMediaUrl } from "@/utils/publicMedia";

// A single unit/shop being edited in the admin form.
export interface UnitDraft {
  name: string;          // e.g. "Shop 3"
  size: string;          // size in m² (stored as string for form input)
  note: string;          // free-text note for this unit
  existingImages: string[]; // already-saved image URLs (edit mode)
  files: File[];         // newly selected image files
  previews: string[];    // object URLs for the newly selected files
}

export const emptyUnit = (): UnitDraft => ({
  name: "", size: "", note: "", existingImages: [], files: [], previews: [],
});

// Convert saved property.units (from the API) into editable drafts.
export function unitsToDrafts(saved: any): UnitDraft[] {
  if (!Array.isArray(saved)) return [];
  return saved.map((u: any) => ({
    name: u?.name || "",
    size: u?.size != null ? String(u.size) : "",
    note: u?.note || "",
    existingImages: Array.isArray(u?.images) ? u.images.filter((x: any) => typeof x === "string") : [],
    files: [],
    previews: [],
  }));
}

// Append units metadata + per-unit image files to a FormData payload.
// Each unit's new files go under field name `unitImage_<index>`, matching the
// index of the unit in the JSON array the backend receives.
export function buildUnitsFormData(fd: FormData, units: UnitDraft[]) {
  const cleaned = units.filter(
    (u) => u.name.trim() || u.size.trim() || u.note.trim() || u.existingImages.length || u.files.length
  );
  const meta = cleaned.map((u) => ({
    name: u.name.trim(),
    size: u.size.trim(),
    note: u.note.trim(),
    images: u.existingImages,
  }));
  fd.append("units", JSON.stringify(meta));
  cleaned.forEach((u, i) => {
    u.files.forEach((f) => fd.append(`unitImage_${i}`, f));
  });
}

interface UnitsBuilderProps {
  units: UnitDraft[];
  setUnits: React.Dispatch<React.SetStateAction<UnitDraft[]>>;
}

export function UnitsBuilder({ units, setUnits }: UnitsBuilderProps) {
  const addUnit = () => setUnits((p) => [...p, emptyUnit()]);
  const removeUnit = (i: number) => setUnits((p) => p.filter((_, j) => j !== i));
  const update = (i: number, field: "name" | "size" | "note", val: string) =>
    setUnits((p) => p.map((u, j) => (j === i ? { ...u, [field]: val } : u)));

  const addImages = (i: number, files: File[]) =>
    setUnits((p) => p.map((u, j) => (j === i
      ? { ...u, files: [...u.files, ...files], previews: [...u.previews, ...files.map((f) => URL.createObjectURL(f))] }
      : u)));

  const removeNewImage = (i: number, k: number) =>
    setUnits((p) => p.map((u, j) => (j === i
      ? { ...u, files: u.files.filter((_, x) => x !== k), previews: u.previews.filter((_, x) => x !== k) }
      : u)));

  const removeExistingImage = (i: number, k: number) =>
    setUnits((p) => p.map((u, j) => (j === i
      ? { ...u, existingImages: u.existingImages.filter((_, x) => x !== k) }
      : u)));

  return (
    <div>
      <p style={{ fontSize: 13, color: "#718096", marginBottom: 12 }}>
        Add each unit / shop with its size, a short note, and pictures. The number of units shows on the
        listing card; visitors click a unit on the details page to view its pictures.
      </p>

      {units.map((u, i) => (
        <div key={i} style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <strong style={{ fontSize: 13, color: "#2d3748" }}>Unit / Shop {i + 1}</strong>
            <button type="button" onClick={() => removeUnit(i)} style={removeBtn}>Remove</button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div>
              <label style={lbl}>Unit / Shop name</label>
              <input
                type="text" placeholder="e.g. Shop 3"
                value={u.name} onChange={(e) => update(i, "name", e.target.value)}
                style={inp}
              />
            </div>
            <div>
              <label style={lbl}>Size (m²)</label>
              <input
                type="number" placeholder="e.g. 30"
                value={u.size} onChange={(e) => update(i, "size", e.target.value)}
                style={inp}
              />
            </div>
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={lbl}>Note</label>
            <textarea
              rows={2} placeholder="Optional note for this unit (e.g. corner shop, high foot traffic)"
              value={u.note} onChange={(e) => update(i, "note", e.target.value)}
              style={{ ...inp, resize: "vertical" }}
            />
          </div>

          <label style={lbl}>Pictures</label>
          {(u.existingImages.length > 0 || u.previews.length > 0) && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
              {u.existingImages.map((src, k) => (
                <div key={`e${k}`} style={{ position: "relative" }}>
                  <img src={resolveAdminMediaUrl(src)} alt="" style={thumb} />
                  <button type="button" onClick={() => removeExistingImage(i, k)} style={imgRemoveBtn}>×</button>
                </div>
              ))}
              {u.previews.map((src, k) => (
                <div key={`n${k}`} style={{ position: "relative" }}>
                  <img src={src} alt="" style={{ ...thumb, border: "1px solid #6dbf8b" }} />
                  <button type="button" onClick={() => removeNewImage(i, k)} style={imgRemoveBtn}>×</button>
                </div>
              ))}
            </div>
          )}
          <input
            type="file" accept="image/*" multiple
            onChange={(e) => { addImages(i, Array.from(e.target.files || [])); e.target.value = ""; }}
            style={{ fontSize: 13 }}
          />
        </div>
      ))}

      <button type="button" onClick={addUnit} style={addBtn}>+ Add Unit</button>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  border: "1px solid #e2e8f0", borderRadius: 10, padding: "16px 18px", marginBottom: 14, background: "#fafbfc",
};
const inp: React.CSSProperties = { width: "100%", padding: "9px 12px", border: "1px solid #e2e8f0", borderRadius: 6, fontSize: 14, outline: "none", boxSizing: "border-box" };
const lbl: React.CSSProperties = { display: "block", fontSize: 13, fontWeight: 500, color: "#4a5568", marginBottom: 6 };
const thumb: React.CSSProperties = { width: 80, height: 60, objectFit: "cover", borderRadius: 4 };
const removeBtn: React.CSSProperties = { background: "#fff5f5", border: "1px solid #fed7d7", borderRadius: 6, color: "#c53030", cursor: "pointer", padding: "5px 12px", fontSize: 12 };
const imgRemoveBtn: React.CSSProperties = { position: "absolute", top: 2, right: 2, background: "rgba(0,0,0,0.5)", color: "#fff", border: "none", borderRadius: "50%", width: 18, height: 18, cursor: "pointer", fontSize: 12, lineHeight: 1, padding: 0 };
const addBtn: React.CSSProperties = { fontSize: 13, color: "#276749", background: "#f0fff4", border: "1px solid #c6f6d5", borderRadius: 6, padding: "8px 16px", cursor: "pointer" };
