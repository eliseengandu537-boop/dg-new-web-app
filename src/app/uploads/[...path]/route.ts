import { getServerBackendRoot } from "@/utils/serverApiTargets";
import { proxyRequest } from "@/utils/proxyRequest";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type RouteContext = {
  params: {
    path: string[];
  };
};

const handleUploadProxy = async (request: Request, { params }: RouteContext) => {
  const backendRoot = getServerBackendRoot();

  if (!backendRoot) {
    return new Response("Media backend is not configured for this deployment.", {
      status: 503,
    });
  }

  const requestUrl = new URL(request.url);
  const targetUrl = `${backendRoot}/uploads/${params.path.join("/")}${requestUrl.search}`;

  try {
    return await proxyRequest(request, targetUrl);
  } catch {
    return new Response("Unable to reach the media backend right now.", {
      status: 502,
    });
  }
};

export { handleUploadProxy as GET, handleUploadProxy as HEAD };
