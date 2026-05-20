import { redirect } from "next/navigation";

export const metadata = {
  title: "Commercial To Let | DG Property",
};

const ListingFiveRedirectPage = () => {
  redirect("/commercial-for-lease");
};

export default ListingFiveRedirectPage;
