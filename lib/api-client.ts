export class AuthRedirectError extends Error {
  constructor(public readonly location: string | null) {
    super("Authentication is required for this request.");
    this.name = "AuthRedirectError";
  }
}

export function isAuthRedirectError(error: unknown) {
  return error instanceof AuthRedirectError;
}

export async function fetchJson<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(input, {
    cache: "no-store",
    redirect: "manual",
    ...init,
  });

  const text = await response.text();
  const contentType = response.headers.get("content-type") ?? "";
  const location = response.headers.get("location");
  const isJson = contentType.includes("application/json");
  const data = isJson && text ? JSON.parse(text) : null;

  if (response.status >= 300 && response.status < 400) {
    throw new AuthRedirectError(location);
  }

  if (!response.ok) {
    const fallbackMessage = isJson
      ? `Request failed with status ${response.status}`
      : `Expected JSON but received ${contentType || "unknown content"} from ${response.url}`;

    console.error("Request failed:", {
      url: input.toString(),
      status: response.status,
      contentType,
      data,
    });
    throw new Error(
      data && typeof data === "object" && "error" in data
        ? String(data.error)
        : fallbackMessage,
    );
  }

  if (!isJson) {
    throw new Error(
      `Expected JSON but received ${contentType || "unknown content"} from ${response.url}`,
    );
  }

  return data as T;
}
