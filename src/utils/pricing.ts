// Shared price/rental display logic for property cards and the detail page.

const fmtAmount = (n: number) => `R ${Math.round(n).toLocaleString("en-ZA")}`;
const fmtRate = (n: number) => `R${Math.round(n).toLocaleString("en-ZA")}/m²`;

// The rental rate per m² entered on a listing, from whichever field the
// category uses (commercial office → grossRental; retail/industrial → rentalPerM2).
export const getRentalRatePerM2 = (item: any): number => {
  const cd = item?.categoryDetails || {};
  return Number(cd.grossRental ?? cd.rentalPerM2 ?? cd.rentalRatePerM2 ?? 0) || 0;
};

export interface PriceDisplay {
  label: string;
  value: string;
}

// Unified price label + value. "To Let" (lease) listings never say
// "Price on Request": they show an indicative "From RX/m²" derived from the
// rental rate, an explicit monthly figure, or an invitation to enquire.
export const getPriceDisplay = (item: any): PriceDisplay => {
  const listingType = item?.listingType;

  if (listingType === "lease") {
    if (item?.price) {
      const value = item?.price_text
        ? fmtRate(item.price)
        : `${fmtAmount(item.price)}/month`;
      return { label: "Rental", value };
    }
    const rate = getRentalRatePerM2(item);
    if (rate > 0) return { label: "Rental", value: `From ${fmtRate(rate)}` };
    return { label: "Rental", value: "Enquire for rental" };
  }

  if (listingType === "investment") {
    return {
      label: "Investment Guide",
      value: item?.price ? fmtAmount(item.price) : "Price on Request",
    };
  }

  return {
    label: "Asking Price",
    value: item?.price ? fmtAmount(item.price) : "Price on Request",
  };
};
