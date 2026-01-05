// app/dashboard/ui/Section.tsx
import Link from 'next/link';
import { Suspense, ReactNode } from 'react';
import BackLink from './dashboard/BackLink';

export default function Section({
  title,
  fallback,
  backHref,
  backLabel,
  children,
}: {
  title: string;
  fallback: ReactNode;
  backHref?: string;
  backLabel?: string;
  children: ReactNode;
}) {
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <BackLink href={backHref} label={backLabel} />
      </div>
      <Suspense fallback={fallback}>{children}</Suspense>
    </div>
  );
}
