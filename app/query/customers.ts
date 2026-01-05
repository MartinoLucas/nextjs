// query/customers.ts
import { apiFetch } from '@/app/lib/api';

export type Customer = {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
  description: string;
};

// Lista con ISR de 60s (rápida para usuarios, fresca cada minuto)
export async function getCustomers() {
  return apiFetch<Customer[]>('/customers', { revalidate: 60 });
}

// Con filtros/paginación
export async function getCustomersPaged(page = 1, limit = 20, search?: string) {
  return apiFetch<Customer[]>('/customers', {
    params: { page, limit, search },
    revalidate: 30,
  });
}

// Crear uno
export async function createCustomer(payload: Omit<Customer, 'id' | 'createdAt'>) {
  return apiFetch<Customer>('/customers', { method: 'POST', body: payload, cache: 'no-store' });
}

// Actualizar
export async function updateCustomer(id: string, patch: Partial<Customer>) {
  return apiFetch<Customer>(`/customers/${id}`, { method: 'PATCH', body: patch, cache: 'no-store' });
}

// Borrar
export async function deleteCustomer(id: string) {
  await apiFetch<void>(`/customers/${id}`, { method: 'DELETE', cache: 'no-store' });
}
