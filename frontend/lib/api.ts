
/**
 * KMITL Marketplace - Shared API Client
 *
 * Owner-maintained module.
 * Feature developers should import these helpers
 * instead of creating separate API clients.
 */

export const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000"
).replace(/\/+$/, "");

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly detail: string,
  ) {
    super(detail);
    this.name = "ApiError";
  }
}

export type ApiOptions = Omit<RequestInit, "body"> & {
  body?: BodyInit | Record<string, unknown> | null;
};

export async function apiRequest<T>(
  endpoint: string,
  options: ApiOptions = {},
): Promise<T> {
  const { body, headers, ...rest } = options;

  const requestHeaders = new Headers(headers);

  let requestBody: BodyInit | null | undefined;

  if (
    body !== null &&
    body !== undefined &&
    typeof body === "object" &&
    !(body instanceof FormData) &&
    !(body instanceof URLSearchParams) &&
    !(body instanceof Blob) &&
    !(body instanceof ArrayBuffer) &&
    !ArrayBuffer.isView(body) &&
    !(body instanceof ReadableStream)
  ) {
    requestHeaders.set("Content-Type", "application/json");
    requestBody = JSON.stringify(body);
  } else {
    requestBody = body as BodyInit | null | undefined;
  }

  const response = await fetch(
    `${API_URL}/${endpoint.replace(/^\/+/, "")}`,
    {
      ...rest,
      body: requestBody,
      headers: requestHeaders,
      credentials: "include",
      cache: rest.cache ?? "no-store",
    },
  );

  if (!response.ok) {
    let detail = `Request failed (${response.status})`;

    try {
      const error = await response.json();

      if (typeof error.detail === "string") {
        detail = error.detail;
      } else if (typeof error.message === "string") {
        detail = error.message;
      }
    } catch {
      // Keep the default HTTP error message.
    }

    throw new ApiError(response.status, detail);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export type HealthResponse = {
  status: string;
  service: string;
};

export async function getHealth(): Promise<HealthResponse> {
  return apiRequest<HealthResponse>("/health");
}
