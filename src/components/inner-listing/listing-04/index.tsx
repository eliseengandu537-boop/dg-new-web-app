"use client";

import { useState } from "react";

import FooterFour from "@/layouts/footers/FooterFour";
import FancyBanner from "@/components/common/FancyBanner";
import ListingFourArea from "./ListingFourArea";
import HeaderOne from "@/layouts/headers/HeaderOne";
import PropertyHero from "@/components/common/PropertyHero";
import CommercialPropertySearchBar from "@/components/search-dropdown/home-dropdown/CommercialPropertySearchBar";
import type { CommercialSearchFilters } from "@/data/commercialPropertyConfig";

const ListingFour = () => {
  const defaultFilters: CommercialSearchFilters = {
    listingCategory: "industrial",
    listingType: "",
  };
  const [appliedFilters, setAppliedFilters] = useState<CommercialSearchFilters>(defaultFilters);

  return (
    <>
      <HeaderOne style={true} />
      <PropertyHero
        title="Industrial Property"
        badge="Industrial"
        subtitle="Live industrial listings published directly from the admin dashboard."
      >
        <CommercialPropertySearchBar
          overlay={true}
          variant="simple"
          defaultFilters={defaultFilters}
          onSearch={setAppliedFilters}
        />
      </PropertyHero>
      <ListingFourArea filters={appliedFilters} />
      <FancyBanner />
      <FooterFour />
    </>
  );
};

export default ListingFour;
