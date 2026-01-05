'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function BackLink({
  href,
  label = 'Back',
}: {
  href?: string;
  label?: string;
}) {
  const router = useRouter();

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 hover:underline"
      >
        <ArrowLeftIcon />
        {label}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 hover:underline"
    >
      <ArrowLeftIcon />
      {label}
    </button>
  );
}

function ArrowLeftIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4A1 1 0 0110.707 6L8.414 8.293H16a1 1 0 110 2H8.414l2.293 2.293a1 1 0 010 1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}
