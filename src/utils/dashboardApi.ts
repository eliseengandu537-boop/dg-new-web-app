/**
 * Dashboard API — all calls go through authApi (auto-attaches Bearer token).
 */
import { authApi, API_ROOT, AUTH_API_ROOT, AUTH_BACKEND_ROOT, BACKEND_ROOT } from "./api";
import axios from "axios";

const trimTrailingSlash = (value?: string) => value?.replace(/\/$/, "") || "";
const directUploadBackendRoot = trimTrailingSlash(AUTH_BACKEND_ROOT || BACKEND_ROOT);
const uploadApiRoot = directUploadBackendRoot
  ? `${directUploadBackendRoot}/api`
  : AUTH_API_ROOT;

const uploadWithAuth = (method: "post" | "put", url: string, data: FormData) =>
  authApi.request({
    method,
    url,
    data,
    baseURL: uploadApiRoot,
    headers: { "Content-Type": "multipart/form-data" },
  });

// ── Auth ────────────────────────────────────────────────────────────────
export const login = (email: string, password: string) =>
  authApi.post("/auth/login", { email, password });

export const loginUser = (data: { email: string; password: string }) =>
  authApi.post("/auth/login", data);

export const signup = (data: { name: string; email: string; password: string; termsAccepted: boolean }) =>
  authApi.post("/auth/signup", data);

// ── Admin Stats ─────────────────────────────────────────────────────────
export const fetchAdminStats = () => authApi.get("/admin/stats");
export const fetchPropertyStatusChart = () => authApi.get("/admin/stats/properties/status");
export const fetchInquiryTrendChart = () => authApi.get("/admin/stats/inquiries/trend");
export const fetchRecentInquiries = () => authApi.get("/admin/recent-inquiries");
export const fetchPageViewStats = () => authApi.get("/admin/stats/pageviews");
export const fetchPageViewTrend = (mode: "weekly" | "monthly") =>
  authApi.get("/admin/stats/pageviews/trend", { params: { mode } });
export const fetchPageViewDaily = (days = 30) =>
  authApi.get("/admin/stats/pageviews/daily", { params: { days } });

// ── Public: record a page view (no auth) ────────────────────────────────
export const recordPageView = (sessionId: string, path: string) =>
  axios.post(`${API_ROOT}/pageviews`, { sessionId, path });

// ── Brokers ─────────────────────────────────────────────────────────────
export const fetchAllBrokers = () => authApi.get("/brokers");
export const fetchPublicBrokers = () => axios.get(`${API_ROOT}/brokers/public`);
export const fetchBrokerById = (id: number) => authApi.get(`/brokers/${id}`);
export const createBroker = (data: FormData) => uploadWithAuth("post", "/brokers", data);
export const updateBroker = (id: number, data: FormData) =>
  uploadWithAuth("put", `/brokers/${id}`, data);
export const deleteBroker = (id: number) => authApi.delete(`/brokers/${id}`);
export const toggleBrokerActive = (id: number) => authApi.patch(`/brokers/${id}/toggle-active`);
export const toggleBrokerWebsite = (id: number) => authApi.patch(`/brokers/${id}/toggle-website`);
export const reorderBrokers = (orderedIds: number[]) => authApi.post("/brokers/reorder", { orderedIds });

// ── Properties ──────────────────────────────────────────────────────────
export const fetchAllProperties = (params?: Record<string, any>) =>
  authApi.get("/properties", { params });
export const fetchPublicProperties = (params?: Record<string, any>) =>
  axios.get(`${API_ROOT}/properties/public`, { params });
export const fetchPublicPropertySuggestions = (params?: Record<string, any>) =>
  axios.get(`${API_ROOT}/properties/public/suggestions`, { params });
export const fetchPublicPropertyById = (id: number) =>
  axios.get(`${API_ROOT}/properties/public/${id}`);
export const fetchPropertyById = (id: number) => authApi.get(`/properties/${id}`);
export const createProperty = (data: FormData) => uploadWithAuth("post", "/properties", data);
export const updateProperty = (id: number, data: FormData) =>
  uploadWithAuth("put", `/properties/${id}`, data);
export const updatePropertyStatus = (id: number, status: string) =>
  authApi.patch(`/properties/${id}/status`, { status });
export const deleteProperty = (id: number) => authApi.delete(`/properties/${id}`);

// ── Admin: Clients ───────────────────────────────────────────────────────
export const fetchAllClients = () => authApi.get("/admin/clients");
export const toggleClientActive = (id: number) =>
  authApi.patch(`/admin/clients/${id}/toggle-active`);

// ── Admin: Inquiries ─────────────────────────────────────────────────────
export const fetchAllInquiries = (params?: Record<string, any>) =>
  authApi.get("/admin/inquiries", { params });
export const updateInquiryStatus = (id: number, data: { status?: string; adminNotes?: string }) =>
  authApi.patch(`/admin/inquiries/${id}`, data);
export const deleteInquiry = (id: number) => authApi.delete(`/admin/inquiries/${id}`);

// ── Admin: Leads ─────────────────────────────────────────────────────────
export const fetchAllLeads = (params?: Record<string, any>) =>
  authApi.get("/admin/leads", { params });
export const createLead = (data: Record<string, any>) => authApi.post("/admin/leads", data);
export const updateLead = (id: number, data: Record<string, any>) =>
  authApi.put(`/admin/leads/${id}`, data);
export const deleteLead = (id: number) => authApi.delete(`/admin/leads/${id}`);
export const convertLeadToClient = (id: number) =>
  authApi.post(`/admin/leads/${id}/convert-client`);
export const submitBondLead = (data: Record<string, any>) =>
  axios.post(`${API_ROOT}/client/leads/capture`, data);
// Generic public lead capture (bond / ROI / yield / valuation calculators)
export const submitCalculatorLead = (data: Record<string, any>) =>
  axios.post(`${API_ROOT}/client/leads/capture`, data);

// ── Public: Inquiries (no auth) ─────────────────────────────────────────
export const submitPublicInquiry = (data: Record<string, any>) =>
  axios.post(`${API_ROOT}/client/inquiries/submit`, data);

// ── Client Dashboard ─────────────────────────────────────────────────────
export const fetchClientDashboard = () => authApi.get("/client/dashboard");
export const fetchSavedProperties = () => authApi.get("/client/saved-properties");
export const savePropertyToFavorites = (propertyId: number) =>
  authApi.post(`/client/saved-properties/${propertyId}`);
export const removePropertyFromFavorites = (propertyId: number) =>
  authApi.delete(`/client/saved-properties/${propertyId}`);

export const fetchClientViewings = () => authApi.get("/client/viewings");
export const scheduleViewing = (data: Record<string, any>) =>
  authApi.post("/client/viewings", data);
export const cancelViewing = (id: number) => authApi.patch(`/client/viewings/${id}/cancel`);

export const fetchClientInquiries = () => authApi.get("/client/inquiries");

export const fetchSavedSearches = () => authApi.get("/client/saved-searches");
export const saveSearch = (data: Record<string, any>) =>
  authApi.post("/client/saved-searches", data);
export const deleteSavedSearch = (id: number) =>
  authApi.delete(`/client/saved-searches/${id}`);

export const fetchClientProfile = () => authApi.get("/client/profile");
export const updateClientProfile = (data: Record<string, any>) =>
  authApi.put("/client/profile", data);

// ── Messages ─────────────────────────────────────────────────────────────
export const submitContactMessage = (data: Record<string, any>) =>
  axios.post(`${API_ROOT}/messages`, data);
export const fetchAllMessages = (params?: Record<string, any>) =>
  authApi.get("/messages", { params });
export const updateMessage = (id: number, data: Record<string, any>) =>
  authApi.patch(`/messages/${id}`, data);
export const deleteMessage = (id: number) => authApi.delete(`/messages/${id}`);

// ── Membership Plans ──────────────────────────────────────────────────────
export const fetchPublicPlans = () => axios.get(`${API_ROOT}/membership/plans/public`);
export const fetchAllPlans = () => authApi.get("/membership/plans");
export const createPlan = (data: Record<string, any>) => authApi.post("/membership/plans", data);
export const updatePlan = (id: number, data: Record<string, any>) =>
  authApi.put(`/membership/plans/${id}`, data);
export const deletePlan = (id: number) => authApi.delete(`/membership/plans/${id}`);

// ── Subscriptions ─────────────────────────────────────────────────────────
export const fetchAllSubscriptions = (params?: Record<string, any>) =>
  authApi.get("/membership/subscriptions", { params });
export const assignSubscription = (data: Record<string, any>) =>
  authApi.post("/membership/subscriptions", data);
export const fetchMySubscription = () => authApi.get("/membership/my-subscription");

// ── Reviews ───────────────────────────────────────────────────────────────
export const submitReview = (data: Record<string, any>) =>
  axios.post(`${API_ROOT}/reviews`, data);
export const fetchAllReviews = (params?: Record<string, any>) =>
  authApi.get("/reviews", { params });
export const updateReview = (id: number, data: Record<string, any>) =>
  authApi.patch(`/reviews/${id}`, data);
export const deleteReview = (id: number) => authApi.delete(`/reviews/${id}`);

// ── Favorites / Most Saved ────────────────────────────────────────────────
export const fetchMostSavedProperties = () => authApi.get("/admin/most-saved-properties");

// ── Client Listings ───────────────────────────────────────────────────────
export const fetchClientListings = () => authApi.get("/client/listings");
export const submitClientListing = (data: Record<string, any>) => authApi.post("/client/listings", data);
export const updateClientListing = (id: number, data: Record<string, any>) => authApi.put(`/client/listings/${id}`, data);
export const deleteClientListing = (id: number) => authApi.delete(`/client/listings/${id}`);

// ── Client Payment Proof ──────────────────────────────────────────────────
export const submitPaymentProof = (data: Record<string, any>) => authApi.post("/client/payment-proof", data);

// ── Admin: approve/deny contact ───────────────────────────────────────────
export const approveInquiryContact = (id: number, approved: boolean) =>
  authApi.patch(`/admin/inquiries/${id}/approve-contact`, { approved });

// ── Admin: activate pending subscription ─────────────────────────────────
export const activateSubscription = (id: number) =>
  authApi.patch(`/membership/subscriptions/${id}/activate`);

// ── Success Stories ────────────────────────────────────────────────────────
export const fetchPublicSuccessStories = () =>
  axios.get(`${API_ROOT}/success-stories/public`);
export const fetchPublicSuccessStoryBySlug = (slug: string) =>
  axios.get(`${API_ROOT}/success-stories/public/${slug}`);
export const fetchAllSuccessStories = () =>
  authApi.get("/success-stories");
export const createSuccessStory = (data: FormData) =>
  uploadWithAuth("post", "/success-stories", data);
export const updateSuccessStory = (id: number, data: FormData) =>
  uploadWithAuth("put", `/success-stories/${id}`, data);
export const deleteSuccessStory = (id: number) =>
  authApi.delete(`/success-stories/${id}`);

// ── News / Property News ───────────────────────────────────────────────────
export const fetchPublicNews = () =>
  axios.get(`${API_ROOT}/news/public`);
export const fetchPublicNewsBySlug = (slug: string) =>
  axios.get(`${API_ROOT}/news/public/${slug}`);
export const fetchAllNews = () =>
  authApi.get("/news");
export const createNewsPost = (data: FormData) =>
  uploadWithAuth("post", "/news", data);
export const updateNewsPost = (id: number, data: FormData) =>
  uploadWithAuth("put", `/news/${id}`, data);
export const deleteNewsPost = (id: number) =>
  authApi.delete(`/news/${id}`);
