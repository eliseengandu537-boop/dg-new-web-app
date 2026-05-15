"use client";

import CategoryListingArea from "@/components/inner-listing/CategoryListingArea";
import type { CommercialSearchFilters } from "@/data/commercialPropertyConfig";

interface ListingOneAreaProps {
  filters?: CommercialSearchFilters;
}

const ListingOneArea = ({ filters }: ListingOneAreaProps) => {
  return <CategoryListingArea filters={filters} detailsLink="/listing_details_06" />;
};

export default ListingOneArea;
