// lib/api.ts
import { API_BASE } from './env';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type Primitive = string | number | boolean | undefined | null;
type SearchParams = Record<string, Primitive | Primitive[]>;

export type ApiOptions = {
  method?: HttpMethod;
  params?: SearchParams;
  body?: unknown;
  headers?: HeadersInit;
  // Controles de Next.js (elige uno u otro según el caso de uso):
  cache?: RequestCache;               // 'force-cache' | 'no-store'
  revalidate?: number;                // ISR en segundos
  // Timeout en ms (opcional)
  timeoutMs?: number;
};

function buildUrl(path: string, params?: SearchParams) {
  const url = new URL(path.startsWith('http') ? path : `${API_BASE}${path}`);
  if (params) {
    const sp = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (Array.isArray(v)) {
        v.forEach((item) => item != null && sp.append(k, String(item)));
      } else if (v != null) {
        sp.set(k, String(v));
      }
    });
    const qs = sp.toString();
    if (qs) url.search = qs;
  }
  return url.toString();
}

export async function apiFetch<T>(path: string, opts: ApiOptions = {}): Promise<T> {
  const {
    method = 'GET',
    params,
    body,
    headers,
    cache,
    revalidate,
    timeoutMs = 15_000,
  } = opts;

  const url = buildUrl(path, params);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      method,
      headers: {
        'content-type': 'application/json',
        ...headers,
      },
      body: body == null ? undefined : JSON.stringify(body),
      cache,                    // Ej: 'no-store'
      next: revalidate != null ? { revalidate } : undefined, // Ej: { revalidate: 60 }
      signal: controller.signal,
    });

    // Manejo de errores
    if (!res.ok) {
      let detail: unknown = undefined;
      try { detail = await res.json(); } catch { /* ignore */ }
      const error = new Error(
        `API ${method} ${url} -> ${res.status} ${res.statusText}`
      ) as Error & { status?: number; detail?: unknown };
      error.status = res.status;
      error.detail = detail;
      throw error;
    }

    // Si no hay contenido
    if (res.status === 204) return undefined as T;
    return (await res.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}
