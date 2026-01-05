// app/dashboard/customers/page.tsx
import { Suspense } from 'react';
import { getCustomers } from '@/app/query/customers';
import Image from 'next/image';
import Section from '@/app/ui/Section';
import GridSkeleton from '@/app/ui/GridSkeleton';
import Link from 'next/link';

async function CustomersGrid() {
  const customers = await getCustomers();
  if (!customers.length) return <p className="text-gray-600">No customers yet.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
      {customers.map((c) => (
        <div key={c.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
          <div className="p-6 flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200">
              <Image src={c.avatar} alt={c.name} fill sizes='64px' className="object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{c.name}</h3>
              <p className="text-sm text-gray-500">
                Member since {new Date(c.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          {/* bloque variable */}
        <div className="px-6 pb-6 flex-1">
            <div className="flex items-start gap-3 h-full">
                <p className="min-w-0 flex-1 text-gray-600 text-sm relative overflow-hidden pr-3 pb-1">
                <span className="
                    block leading-6
                    [-webkit-line-clamp:3]
                    [-webkit-box-orient:vertical]
                    overflow-hidden
                ">
                    {c.description}
                </span>
                {/* fade derecha */}
                <span className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent" aria-hidden />
                {/* fade inferior */}
                <span className="pointer-events-none absolute bottom-0 left-0 right-12 h-5 bg-gradient-to-t from-white to-transparent" aria-hidden />
                </p>

                <Link
                href={`/dashboard/customers/${c.id}`}
                className="shrink-0 whitespace-nowrap text-blue-600 text-sm hover:underline"
                >
                View Profile
                </Link>
            </div>
        </div>

          <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
            <p className="text-xs text-gray-500">ID: {c.id}</p>
          </div>
        </div>
      ))}
    </div>
  );
}


export default function Page() {
  return (
    <Section title='Customers' fallback={<GridSkeleton />}>
      <CustomersGrid />
    </Section>
  );
}
