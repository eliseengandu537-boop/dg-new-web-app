"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PropertyCard from "@/components/common/PropertyCard";
import { fetchPublicProperties } from "@/utils/dashboardApi";

// Re-fetch the broker's listings on this interval so the profile stays current
// as properties are added, edited or sold — no page reload needed.
const REFRESH_MS = 60000;

const BrokerListings = ({
  brokerId,
  brokerName,
}: {
  brokerId: number | string;
  brokerName?: string;
}) => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadedOnce, setLoadedOnce] = useState(false);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const res = await fetchPublicProperties({ brokerId, limit: 100 });
        if (!active) return;
        setProperties(Array.isArray(res.data?.properties) ? res.data.properties : []);
      } catch {
        if (active) setProperties([]);
      } finally {
        if (active) {
          setLoading(false);
          setLoadedOnce(true);
        }
      }
    };

    load();
    const timer = setInterval(load, REFRESH_MS);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, [brokerId]);

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 20,
        padding: "32px 40px 40px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        border: "1px solid #f0f0f0",
        marginBottom: 32,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <div style={{ width: 4, height: 28, background: "#e8b86d", borderRadius: 2 }} />
        <h5 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0d1f2d", margin: 0 }}>
          Current Listings
          {loadedOnce && properties.length > 0 ? ` (${properties.length})` : ""}
        </h5>
      </div>

      {loading && !loadedOnce ? (
        <p style={{ fontSize: "0.95rem", color: "#aaa", margin: 0 }}>Loading listings…</p>
      ) : properties.length === 0 ? (
        <p style={{ fontSize: "0.95rem", color: "#888", margin: 0 }}>
          {brokerName ? `${brokerName} has` : "This broker has"} no active listings right now.
        </p>
      ) : (
        <div className="row g-4">
          {properties.map((item) => (
            <div className="col-md-6" key={item.id}>
              <PropertyCard item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrokerListings;
