import Error from "@/components/inner-pages/error";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Page Not Found | DG Property",
  description: "The page you requested could not be found on the DG Property website.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Wrapper>
      <Error />
    </Wrapper>
  );
}
