import { getServerBackendRoot } from "@/utils/serverApiTargets";
import { proxyRequest } from "@/utils/proxyRequest";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type RouteContext = {
  params: {
    path: string[];
  };
};

const IMAGE_EXTENSIONS = /\.(?:avif|gif|jpe?g|png|svg|webp)$/i;

const unavailableMediaResponse = (request: Request, path: string[], status: number) => {
  if (IMAGE_EXTENSIONS.test(path.at(-1) || "")) {
    return Response.redirect(new URL("/assets/images/lazy.svg", request.url), 307);
  }

  return new Response("The requested media is temporarily unavailable.", { status });
};

const handleUploadProxy = async (request: Request, { params }: RouteContext) => {
  const backendRoot = getServerBackendRoot();

  if (!backendRoot) {
    return unavailableMediaResponse(request, params.path, 503);
  }

  const requestUrl = new URL(request.url);
  const targetUrl = `${backendRoot}/uploads/${params.path.join("/")}${requestUrl.search}`;

  try {
    const response = await proxyRequest(request, targetUrl);
    return response.ok
      ? response
      : unavailableMediaResponse(request, params.path, response.status);
  } catch {
    return unavailableMediaResponse(request, params.path, 502);
  }
};

export { handleUploadProxy as GET, handleUploadProxy as HEAD };
