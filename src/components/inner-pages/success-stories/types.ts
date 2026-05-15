export interface SuccessStory {
  id: number;
  title: string;
  slug: string;
  tag?: string;
  location?: string;
  gla?: string;
  parking?: string;
  openingDate?: string;
  anchorTenant?: string;
  projectType?: string;
  summary?: string;
  body?: string;
  imageUrl?: string;
  brochureUrl?: string;
  googleMapsQuery?: string;
  sortOrder: number;
  isPublished: boolean;
  createdAt?: string;
  updatedAt?: string;
}
