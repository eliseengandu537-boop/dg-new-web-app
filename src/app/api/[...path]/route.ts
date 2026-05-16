import { getServerApiRoot } from "@/utils/serverApiTargets";
import { proxyRequest } from "@/utils/proxyRequest";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type RouteContext = {
  params: {
    path: string[];
  };
};

const handleProxy = async (request: Request, { params }: RouteContext) => {
  const apiRoot = getServerApiRoot();

  if (!apiRoot) {
    return Response.json(
      { error: "The API backend is not configured for this deployment." },
      { status: 503 },
    );
  }

  const requestUrl = new URL(request.url);
  const targetUrl = `${apiRoot}/${params.path.join("/")}${requestUrl.search}`;

  try {
    return await proxyRequest(request, targetUrl);
  } catch {
    return Response.json(
      { error: "Unable to reach the API backend right now." },
      { status: 502 },
    );
  }
};

export { handleProxy as GET, handleProxy as POST, handleProxy as PUT, handleProxy as PATCH, handleProxy as DELETE, handleProxy as OPTIONS };
