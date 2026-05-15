import { redirect } from "next/navigation";

export const metadata = {
  title: "Commercial for Lease | DG Property",
};

const ListingFiveRedirectPage = () => {
  redirect("/commercial-for-lease");
};

export default ListingFiveRedirectPage;
