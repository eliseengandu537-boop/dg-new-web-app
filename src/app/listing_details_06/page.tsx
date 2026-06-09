import type { Metadata } from "next";
import ListingDetailsSix from "@/components/ListingDetails/listing-details-6";
import Wrapper from "@/layouts/Wrapper";
import {
  getPublicProperty,
  buildPropertyMetadata,
  buildPropertyJsonLd,
} from "@/utils/serverProperties";

type SearchParams = { id?: string };

const GENERIC: Metadata = { title: "Property Details | DG Property" };

// Build the page <title>, meta description and social tags from the real property,
// so searching the property's name (and link previews) match this exact listing.
export async function generateMetadata(
  { searchParams }: { searchParams: Promise<SearchParams> | SearchParams },
): Promise<Metadata> {
  const sp = await Promise.resolve(searchParams);
  const id = sp?.id;
  if (!id) return GENERIC;

  const property = await getPublicProperty(id);
  if (!property) return GENERIC;

  return buildPropertyMetadata(property, id);
}

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams> | SearchParams;
}) => {
  const sp = await Promise.resolve(searchParams);
  const id = sp?.id;
  // Re-uses the cached fetch from generateMetadata (Next dedupes identical requests).
  const property = id ? await getPublicProperty(id) : null;
  const jsonLd = property ? buildPropertyJsonLd(property, id as string) : null;

  return (
    <Wrapper>
      {jsonLd && (
        <script
          type="application/ld+json"
          // Structured data so Google understands this is a real-estate listing.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ListingDetailsSix />
    </Wrapper>
  );
};

export default Page;
