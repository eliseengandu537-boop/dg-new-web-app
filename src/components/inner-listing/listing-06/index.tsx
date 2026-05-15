"use client";

import { useState } from "react";

import FooterFour from "@/layouts/footers/FooterFour";
import HeaderFour from "@/layouts/headers/HeaderFour";
import FancyBanner from "@/components/common/FancyBanner";
import ListingSixArea from "./ListingSixArea";
import PropertyHero from "@/components/common/PropertyHero";
import CommercialPropertySearchBar from "@/components/search-dropdown/home-dropdown/CommercialPropertySearchBar";
import type { CommercialSearchFilters } from "@/data/commercialPropertyConfig";

const ListingSix = () => {
  const defaultFilters: CommercialSearchFilters = {
    listingCategory: "investment",
    listingType: "investment",
  };
  const [appliedFilters, setAppliedFilters] = useState<CommercialSearchFilters>(defaultFilters);

  return (
    <>
      <HeaderFour />
      <PropertyHero
        title="Investment Property"
        badge="Investment"
        subtitle="Live investment properties synced directly from the admin dashboard."
      >
        <CommercialPropertySearchBar
          overlay={true}
          variant="simple"
          defaultFilters={defaultFilters}
          onSearch={setAppliedFilters}
        />
      </PropertyHero>
      <ListingSixArea filters={appliedFilters} />
      <FancyBanner />
      <FooterFour />
    </>
  );
};

export default ListingSix;
