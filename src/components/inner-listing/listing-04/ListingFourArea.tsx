"use client";

import CategoryListingArea from "@/components/inner-listing/CategoryListingArea";
import type { CommercialSearchFilters } from "@/data/commercialPropertyConfig";

interface ListingFourAreaProps {
  filters?: CommercialSearchFilters;
}

const ListingFourArea = ({ filters }: ListingFourAreaProps) => {
  return <CategoryListingArea filters={filters} detailsLink="/listing_details_06" />;
};

export default ListingFourArea;
