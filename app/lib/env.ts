// lib/env.ts
export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE?.replace(/\/+$/, '') // sin trailing slash
  ?? 'https://695ba6d11d8041d5eeb7cdbd.mockapi.io/api/v1';
