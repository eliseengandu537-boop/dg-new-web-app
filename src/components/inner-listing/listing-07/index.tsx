"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import FooterFour from "@/layouts/footers/FooterFour"
import HeaderFour from "@/layouts/headers/HeaderFour"
import FancyBanner from "@/components/common/FancyBanner"
import ListingSevenArea from "./ListingSevenArea"
import PropertyHero from "@/components/common/PropertyHero"
import CommercialPropertySearchBar from "@/components/search-dropdown/home-dropdown/CommercialPropertySearchBar";
import type { CommercialSearchFilters } from "@/data/commercialPropertyConfig";
import {
   buildCommercialSearchQuery,
   normalizeCommercialSearchFilters,
   parseCommercialSearchFilters,
} from "@/utils/propertySearch";

const ListingSix = () => {
   const router = useRouter();
   const searchParams = useSearchParams();
   const defaultFilters = useMemo<CommercialSearchFilters>(
      () => parseCommercialSearchFilters(searchParams, { listingType: "sale" }),
      [searchParams]
   );
   const [appliedFilters, setAppliedFilters] = useState<CommercialSearchFilters>(defaultFilters);

   useEffect(() => {
      setAppliedFilters(defaultFilters);
   }, [defaultFilters]);

   const handleSearch = useCallback((filters: CommercialSearchFilters) => {
      const nextFilters = normalizeCommercialSearchFilters({
         listingType: filters.listingType || "sale",
         ...filters,
      });

      const query = buildCommercialSearchQuery(nextFilters);

      setAppliedFilters(nextFilters);
      router.replace(query ? `/listing_07?${query}` : "/listing_07", { scroll: false });
   }, [router]);

   const heroBadge = useMemo(() => {
      if (appliedFilters.listingType === "lease") return "To Let";
      if (appliedFilters.listingType === "investment") return "Investment";
      return "For Sale";
   }, [appliedFilters.listingType]);

   return (
      <>
         <HeaderFour />
         <PropertyHero title="All Listings" badge={heroBadge} subtitle="Explore our curated property listings.">
            <CommercialPropertySearchBar
               overlay={true}
               defaultFilters={defaultFilters}
               onSearch={handleSearch}
            />
         </PropertyHero>
         <ListingSevenArea filters={appliedFilters} />
         <FancyBanner />
         <FooterFour />
      </>
   )
}

export default ListingSix;
