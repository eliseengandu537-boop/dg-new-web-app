import "server-only";

const BODYLESS_METHODS = new Set(["GET", "HEAD"]);

export const proxyRequest = async (request: Request, targetUrl: string) => {
  const headers = new Headers(request.headers);
  headers.delete("host");

  const init: RequestInit = {
    method: request.method,
    headers,
    redirect: "manual",
  };

  if (!BODYLESS_METHODS.has(request.method.toUpperCase())) {
    init.body = Buffer.from(await request.arrayBuffer());
  }

  const upstream = await fetch(targetUrl, init);
  return new Response(upstream.body, {
    status: upstream.status,
    headers: upstream.headers,
  });
};
