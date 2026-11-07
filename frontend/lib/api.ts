// Owner-owned shared integration adapter. Friends: coordinate contracts before changing this.
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";
export async function getHealth(): Promise<{status:string;service:string}> {
  const response = await fetch(`${API_URL}/health`, { cache: "no-store" });
  if (!response.ok) throw new Error("Backend health check failed");
  return response.json() as Promise<{status:string;service:string}>;
}
