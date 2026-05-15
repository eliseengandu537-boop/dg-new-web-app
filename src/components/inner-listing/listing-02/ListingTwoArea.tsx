"use client";

import CategoryListingArea from "@/components/inner-listing/CategoryListingArea";
import type { CommercialSearchFilters } from "@/data/commercialPropertyConfig";

interface ListingTwoAreaProps {
  filters?: CommercialSearchFilters;
}

const ListingTwoArea = ({ filters }: ListingTwoAreaProps) => {
  return <CategoryListingArea filters={filters} detailsLink="/listing_details_06" />;
};

export default ListingTwoArea;
