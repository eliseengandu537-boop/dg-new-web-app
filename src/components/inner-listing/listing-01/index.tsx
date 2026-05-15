"use client";

import { useState } from "react";

import FooterFour from "@/layouts/footers/FooterFour";
import FancyBanner from "@/components/common/FancyBanner";
import HeaderOne from "@/layouts/headers/HeaderOne";
import PropertyHero from "@/components/common/PropertyHero";
import CommercialPropertySearchBar from "@/components/search-dropdown/home-dropdown/CommercialPropertySearchBar";
import type { CommercialSearchFilters } from "@/data/commercialPropertyConfig";
import ListingOneArea from "./ListingOneArea";

const ListingOne = () => {
  const defaultFilters: CommercialSearchFilters = {
    listingCategory: "commercial",
    listingType: "",
  };
  const [appliedFilters, setAppliedFilters] = useState<CommercialSearchFilters>(defaultFilters);

  return (
    <>
      <HeaderOne style={true} />
      <PropertyHero
        title="Commercial Property"
        badge="Commercial"
        subtitle="Live commercial listings published from the admin dashboard."
      >
        <CommercialPropertySearchBar
          overlay={true}
          variant="simple"
          defaultFilters={defaultFilters}
          onSearch={setAppliedFilters}
        />
      </PropertyHero>
      <ListingOneArea filters={appliedFilters} />
      <FancyBanner />
      <FooterFour />
    </>
  );
};

export default ListingOne;
