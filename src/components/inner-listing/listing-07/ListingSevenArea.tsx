"use client"
import CategoryListingArea from "@/components/inner-listing/CategoryListingArea";
import type { CommercialSearchFilters } from "@/data/commercialPropertyConfig";

interface ListingSevenAreaProps {
  filters?: CommercialSearchFilters;
}

const ListingSevenArea = ({ filters }: ListingSevenAreaProps) => {
  return <CategoryListingArea filters={filters} detailsLink="/listing_details_06" />;
};

export default ListingSevenArea;
