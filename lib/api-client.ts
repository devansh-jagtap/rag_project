export async function fetchJson<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(input, {
    cache: "no-store",
    ...init,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    console.error("Request failed:", {
      url: input.toString(),
      status: response.status,
      data,
    });
    throw new Error(
      data?.error ?? `Request failed with status ${response.status}`,
    );
  }

  return data as T;
}
