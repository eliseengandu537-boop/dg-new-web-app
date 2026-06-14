"use client"
import { useState, useEffect, useMemo, useRef, Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import NiceSelect from "@/ui/NiceSelect";
import ReactPaginate from "react-paginate";
import PropertyCard from "@/components/common/PropertyCard";
import { fetchPublicProperties } from "@/utils/dashboardApi";
import type { CommercialSearchFilters } from "@/data/commercialPropertyConfig";
import icon from "@/assets/images/icon/icon_46.svg";

interface Props {
  category?: string;
  listingType?: string;
  detailsLink?: string;
  filters?: CommercialSearchFilters;
}

const LIMIT = 9;

const CategoryListingAreaInner = ({ category, listingType, detailsLink = "/listing_details_06", filters }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [properties, setProperties] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("newest");
  const serializedFilters = JSON.stringify(filters || {});
  const activeFilters = useMemo<CommercialSearchFilters>(
    () => JSON.parse(serializedFilters),
    [serializedFilters]
  );
  const hasActiveSearch = useMemo(
    () =>
      Object.entries(activeFilters).some(([, value]) => value !== "" && value !== undefined && value !== null),
    [activeFilters]
  );

  // The current page lives in the URL (?page=N). That way it survives opening a
  // property and pressing back, and each page change adds a browser-history step.
  const currentPage = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);

  // A new search/filter returns to page 1. Skip the first render so a restored
  // ?page=2 (e.g. after pressing back from a property) isn't wiped on mount.
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (params.has("page")) {
      params.delete("page");
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serializedFilters]);

  useEffect(() => {
    const params: Record<string, any> = { page: currentPage, limit: LIMIT };
    const mergedCategory = activeFilters.category || category;
    const mergedListingType = activeFilters.listingType || listingType;

    if (mergedCategory) params.category = mergedCategory;
    if (mergedListingType) params.listingType = mergedListingType;
    Object.entries(activeFilters).forEach(([key, value]) => {
      if (value !== "" && value !== undefined && value !== null) {
        params[key] = value;
      }
    });

    setLoading(true);
    fetchPublicProperties(params)
      .then((res) => {
        setProperties(res.data.properties || []);
        setTotal(res.data.total || 0);
        setTotalPages(res.data.totalPages || 1);
      })
      .catch(() => {
        setProperties([]);
        setTotal(0);
        setTotalPages(1);
      })
      .finally(() => setLoading(false));
  }, [activeFilters, category, listingType, currentPage]);

  const sortedProperties = [...properties].sort((a, b) => {
    if (sortOrder === "price_low") return (a.price || 0) - (b.price || 0);
    if (sortOrder === "price_high") return (b.price || 0) - (a.price || 0);
    return 0;
  });

  const start = total === 0 ? 0 : (currentPage - 1) * LIMIT + 1;
  const end = Math.min(currentPage * LIMIT, total);

  const handlePageClick = (event: { selected: number }) => {
    const next = event.selected + 1;
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("page", String(next));
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="property-listing-six pb-200 xl-pb-120 pt-20 xl-pt-10">
      <div className="container container-large">

        <div className="listing-header-filter d-sm-flex justify-content-between align-items-center mb-40 lg-mb-30">
          <div>
            {loading
              ? "Loading..."
              : total > 0
                ? <>Showing <span className="color-dark fw-500">{start}–{end}</span> of <span className="color-dark fw-500">{total}</span> results</>
                : "No properties found"
            }
          </div>
          <div className="d-flex align-items-center xs-mt-20">
            <div className="short-filter d-flex align-items-center">
              <div className="fs-16 me-2">Sort by:</div>
              <NiceSelect
                className="nice-select rounded-0"
                options={[
                  { value: "newest", text: "Newest" },
                  { value: "price_low", text: "Price Low" },
                  { value: "price_high", text: "Price High" },
                ]}
                defaultCurrent={0}
                onChange={(e: any) => setSortOrder(e.target.value)}
                name=""
                placeholder=""
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border" role="status" />
            <p className="mt-3 fs-16">Loading properties...</p>
          </div>
        ) : sortedProperties.length === 0 ? (
          <div className="text-center py-5">
            <p className="fs-18 fw-500 color-dark">No properties found</p>
            <p className="fs-16">
              {hasActiveSearch
                ? "Try adjusting your property type, location, keyword, or price range."
                : <>Please check back later or <a href="/contact">contact us</a> for more information.</>}
            </p>
          </div>
        ) : (
          <div className="row gx-xxl-5">
            {sortedProperties.map((item: any) => (
              <div key={item.id} className="col-lg-4 col-md-6 d-flex mb-80 lg-mb-40 wow fadeInUp">
                <PropertyCard item={item} detailsLink={detailsLink} />
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <ReactPaginate
            breakLabel="..."
            nextLabel={<Image src={icon} alt="" className="ms-2" />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            forcePage={Math.min(currentPage, totalPages) - 1}
            previousLabel={<Image src={icon} alt="" className="ms-2" />}
            renderOnZeroPageCount={null}
            className="pagination-one square d-flex align-items-center justify-content-center style-none pt-30"
          />
        )}

      </div>
    </div>
  );
};

const CategoryListingArea = (props: Props) => (
  <Suspense
    fallback={
      <div className="property-listing-six pb-200 xl-pb-120 pt-20 xl-pt-10">
        <div className="container container-large">
          <div className="text-center py-5">
            <div className="spinner-border" role="status" />
          </div>
        </div>
      </div>
    }
  >
    <CategoryListingAreaInner {...props} />
  </Suspense>
);

export default CategoryListingArea;
