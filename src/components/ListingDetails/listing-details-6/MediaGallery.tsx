import Fancybox from "@/components/common/Fancybox";
import { resolveMediaUrl } from "@/utils/publicMedia";

interface Props {
  featuredImage?: string;
  gallery?: string[];
  title?: string;
  singleImage?: boolean;
}

const MediaGallery = ({ featuredImage, gallery = [], title = "", singleImage = false }: Props) => {
  const allImages: string[] = [];
  if (featuredImage) allImages.push(resolveMediaUrl(featuredImage));

  gallery.forEach((image) => {
    const resolved = resolveMediaUrl(image);
    if (resolved && !allImages.includes(resolved)) {
      allImages.push(resolved);
    }
  });

  if (allImages.length === 0) {
    return (
      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            minHeight: 320,
            borderRadius: 22,
            border: "1px solid #e2e8f0",
            background: "#f8fafc",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            color: "#64748b",
            gap: 10,
            padding: 24,
          }}
        >
          <i className="bi bi-building" style={{ fontSize: 44 }}></i>
          <p style={{ fontSize: 17, margin: 0 }}>No media available for this property yet.</p>
        </div>
      </div>
    );
  }

  const mainImage = allImages[0];

  // Investment listings show a single image only — no side thumbnails,
  // "more photos soon" placeholders or "see all photos" affordance.
  if (singleImage) {
    return (
      <div style={{ marginBottom: 24 }}>
        <Fancybox options={{ Carousel: { infinite: true } }}>
          <div
            style={{
              background: "#fff",
              borderRadius: 22,
              padding: 10,
              border: "1px solid #dbe4ee",
              boxShadow: "0 18px 44px rgba(15,23,42,0.06)",
            }}
          >
            <a
              href={mainImage}
              data-fancybox="property-gallery"
              style={{
                position: "relative",
                display: "block",
                minHeight: 430,
                borderRadius: 18,
                overflow: "hidden",
                background: "#e2e8f0",
              }}
            >
              <img
                src={mainImage}
                alt={title}
                style={{ width: "100%", height: "100%", minHeight: 430, objectFit: "cover", display: "block" }}
              />
            </a>
          </div>
        </Fancybox>
      </div>
    );
  }

  const sideImages = allImages.slice(1, 3);
  const hiddenImages = allImages.slice(3);
  const secondaryCount = Math.max(allImages.length - 2, 0);

  return (
    <div style={{ marginBottom: 24 }}>
      <Fancybox options={{ Carousel: { infinite: true } }}>
        <div
          style={{
            position: "relative",
            background: "#fff",
            borderRadius: 22,
            padding: 10,
            border: "1px solid #dbe4ee",
            boxShadow: "0 18px 44px rgba(15,23,42,0.06)",
          }}
        >
          <div className="row g-3">
            <div className="col-lg-8">
              <a
                href={mainImage}
                data-fancybox="property-gallery"
                style={{
                  position: "relative",
                  display: "block",
                  minHeight: 430,
                  borderRadius: 18,
                  overflow: "hidden",
                  background: "#e2e8f0",
                }}
              >
                <img
                  src={mainImage}
                  alt={title}
                  style={{
                    width: "100%",
                    height: "100%",
                    minHeight: 430,
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </a>
            </div>

            <div className="col-lg-4">
              <div style={{ display: "grid", gap: 10, gridTemplateRows: "repeat(2, minmax(0, 1fr))", height: "100%" }}>
                {sideImages.map((image, index) => {
                  const isGalleryTile = index === sideImages.length - 1 && allImages.length > 2;

                  return (
                    <a
                      key={image}
                      href={image}
                      data-fancybox="property-gallery"
                      style={{
                        position: "relative",
                        display: "block",
                        minHeight: 210,
                        borderRadius: 18,
                        overflow: "hidden",
                        background: "#e2e8f0",
                      }}
                    >
                      <img
                        src={image}
                        alt={`${title} ${index + 2}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          minHeight: 210,
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                      {isGalleryTile && secondaryCount > 1 && (
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(180deg, rgba(15,23,42,0.08) 0%, rgba(15,23,42,0.62) 100%)",
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent: "flex-start",
                            padding: 18,
                          }}
                        >
                          <div
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 8,
                              borderRadius: 999,
                              padding: "9px 14px",
                              background: "rgba(255,255,255,0.92)",
                              color: "#0f172a",
                              fontSize: 13,
                              fontWeight: 700,
                            }}
                          >
                            + {secondaryCount - 1} Photos
                          </div>
                        </div>
                      )}
                    </a>
                  );
                })}

                {Array.from({ length: Math.max(0, 2 - sideImages.length) }).map((_, index) => (
                  <div
                    key={`placeholder-${index}`}
                    style={{
                      minHeight: 210,
                      borderRadius: 18,
                      background: "#f8fafc",
                      border: "1px dashed #d6e0ea",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#94a3b8",
                      fontSize: 13,
                      fontWeight: 700,
                      letterSpacing: 0.4,
                    }}
                  >
                    More photos soon
                  </div>
                ))}
              </div>
            </div>
          </div>

          <a
            href={mainImage}
            data-fancybox="property-gallery"
            style={{
              position: "absolute",
              top: 22,
              right: 22,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 16px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.96)",
              color: "#0f172a",
              textDecoration: "none",
              fontSize: 12,
              fontWeight: 700,
              boxShadow: "0 8px 18px rgba(15,23,42,0.12)",
            }}
          >
            See all photos
          </a>

          {hiddenImages.map((image, index) => (
            <a
              key={`${image}-${index}`}
              href={image}
              data-fancybox="property-gallery"
              style={{ display: "none" }}
            >
              Hidden image
            </a>
          ))}
        </div>
      </Fancybox>
    </div>
  );
};

export default MediaGallery;
