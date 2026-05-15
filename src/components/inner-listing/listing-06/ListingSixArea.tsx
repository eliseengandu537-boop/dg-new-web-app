"use client";

import CategoryListingArea from "@/components/inner-listing/CategoryListingArea";
import type { CommercialSearchFilters } from "@/data/commercialPropertyConfig";

interface ListingSixAreaProps {
  filters?: CommercialSearchFilters;
}

const ListingSixArea = ({ filters }: ListingSixAreaProps) => {
  return <CategoryListingArea filters={filters} detailsLink="/listing_details_06" />;
};

export default ListingSixArea;
