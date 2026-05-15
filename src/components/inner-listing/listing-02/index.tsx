"use client";

import { useState } from "react";

import FooterFour from "@/layouts/footers/FooterFour";
import FancyBanner from "@/components/common/FancyBanner";
import ListingTwoArea from "./ListingTwoArea";
import HeaderOne from "@/layouts/headers/HeaderOne";
import PropertyHero from "@/components/common/PropertyHero";
import CommercialPropertySearchBar from "@/components/search-dropdown/home-dropdown/CommercialPropertySearchBar";
import type { CommercialSearchFilters } from "@/data/commercialPropertyConfig";

const ListingTwo = () => {
  const defaultFilters: CommercialSearchFilters = {
    listingCategory: "retail_leasing",
    listingType: "lease",
  };
  const [appliedFilters, setAppliedFilters] = useState<CommercialSearchFilters>(defaultFilters);

  return (
    <>
      <HeaderOne style={true} />
      <PropertyHero
        title="Retail Leasing Property"
        badge="Retail Leasing"
        subtitle="Live retail leasing opportunities synced from the admin dashboard."
      >
        <CommercialPropertySearchBar
          overlay={true}
          variant="simple"
          defaultFilters={defaultFilters}
          onSearch={setAppliedFilters}
        />
      </PropertyHero>
      <ListingTwoArea filters={appliedFilters} />
      <FancyBanner />
      <FooterFour />
    </>
  );
};

export default ListingTwo;
