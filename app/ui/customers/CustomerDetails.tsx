// app/dashboard/customers/[customerId]/CustomerDetails.tsx
import Image from "next/image";
import { Customer } from "@/app/query/customers";

async function getCustomerById(id: string): Promise<Customer> {
  const res = await fetch(
    `https://695ba6d11d8041d5eeb7cdbd.mockapi.io/api/v1/customers/${id}`,
    { next: { revalidate: 60 }, headers: { "content-type": "application/json" } }
  );
  if (!res.ok) throw new Error(`Failed to fetch customer ${id}: ${res.status}`);
  return res.json();
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="py-3 grid grid-cols-3 gap-3">
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="col-span-2 text-sm text-gray-900">{value}</dd>
    </div>
  );
}

export default async function CustomerDetails({ id }: { id: string }) {
  const customer = await getCustomerById(id);

  const memberSince = new Date(customer.createdAt).toLocaleDateString();

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="bg-white rounded-lg shadow p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="relative size-24 sm:size-28 rounded-full overflow-hidden ring-2 ring-white shadow">
            <Image
              src={customer.avatar}
              alt={customer.name}
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-semibold text-gray-900 truncate">
              {customer.name}
            </h2>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
              <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-gray-700">
                ID: {customer.id}
              </span>
              <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-gray-700">
                Member since {memberSince}
              </span>
            </div>
          </div>

          {/* Acciones (placeholder) */}
          <div className="flex gap-2">
            <button
              className="rounded-lg border px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              type="button"
            >
              Message
            </button>
            <button
              className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
              type="button"
            >
              Edit
            </button>
          </div>
        </div>
      </section>

      {/* Content grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* About */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6 md:p-8">
          <h3 className="text-lg font-semibold text-gray-900">About</h3>
          <p className="mt-3 text-gray-700 leading-6">
            {customer.description || "No description provided."}
          </p>
        </div>

        {/* Details */}
        <div className="bg-white rounded-lg shadow p-6 md:p-8">
          <h3 className="text-lg font-semibold text-gray-900">Details</h3>
          <dl className="mt-4 divide-y divide-gray-100">
            <InfoRow label="Name" value={customer.name} />
            <InfoRow label="Customer ID" value={customer.id} />
            <InfoRow label="Created At" value={memberSince} />
            {/* Campos opcionales si existen en tu API; déjalos comentados para extender:
            <InfoRow label="Email" value={customer.email ?? '—'} />
            <InfoRow label="Phone" value={customer.phone ?? '—'} />
            <InfoRow label="Region" value={customer.region ?? '—'} />
            */}
          </dl>
        </div>
      </section>
    </div>
  );
}
