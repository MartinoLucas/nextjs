// app/dashboard/error.tsx
'use client';

import { useEffect } from 'react';

type ErrorWithStatus = Error & { status?: number } & { digest?: string };

export default function ErrorPage({
  error,
  reset,
}: {
  error: ErrorWithStatus;
  reset: () => void;
}) {
  // Log opcional para debugging
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error('Dashboard error boundary:', { error });
  }, [error]);

  // Trata de extraer un status si no vino adjunto
  const parsedStatus =
    error?.status ??
    (typeof error?.message === 'string'
      ? Number((error.message.match(/\b(\d{3})\b/) || [])[1])
      : undefined);

  return (
    <div className="relative min-h-[70vh] bg-white grid place-items-center p-6">
      {/* Doodles animados de fondo */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* círculo grande girando */}
        <svg
          className="absolute -top-20 -left-20 h-72 w-72 opacity-10 animate-spin"
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle cx="100" cy="100" r="80" stroke="#3b82f6" strokeWidth="12" />
          <circle cx="100" cy="100" r="60" stroke="#a5b4fc" strokeWidth="6" />
        </svg>
        {/* blob pulsante */}
        <svg
          className="absolute -bottom-24 -right-24 h-80 w-80 opacity-10 animate-pulse"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#60a5fa"
            d="M49.7,-61.6C63.4,-50.6,72.7,-33.6,75.3,-16C77.9,1.5,73.8,19.8,64.7,34.2C55.6,48.5,41.5,58.9,26.1,65.9C10.7,72.8,-6,76.4,-21.8,72.5C-37.7,68.6,-52.8,57.2,-63.9,42.1C-75,27.1,-82,8.4,-80.6,-10C-79.2,-28.3,-69.4,-46.2,-55.3,-57.7C-41.2,-69.1,-22.6,-74.2,-3.7,-70.1C15.1,-66.1,30.2,-53,49.7,-61.6Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-xl rounded-2xl border border-gray-100 bg-white shadow-xl">
        <div className="px-8 pt-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-50 grid place-items-center">
              <span className="text-blue-600 text-lg">!</span>
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">Something went wrong</h1>
          </div>

          <p className="mt-3 text-sm text-gray-500">
            We couldn’t render this section of the dashboard. You can try again or go back.
          </p>

          <div className="mt-6 rounded-lg bg-gray-50 p-4">
            <dl className="grid grid-cols-3 gap-3 text-sm">
              <dt className="text-gray-500">Status</dt>
              <dd className="col-span-2 text-gray-900">
                {parsedStatus ?? '—'}
              </dd>

              <dt className="text-gray-500">Message</dt>
              <dd className="col-span-2 text-gray-900 break-words">
                {error?.message || 'Unknown error'}
              </dd>

              {error?.digest && (
                <>
                  <dt className="text-gray-500">Digest</dt>
                  <dd className="col-span-2 text-gray-900 break-all">{error.digest}</dd>
                </>
              )}
            </dl>
          </div>
        </div>

        <div className="px-8 pb-8 pt-6 flex flex-wrap gap-3">
          <button
            onClick={() => reset()}
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="button"
          >
            Retry
          </button>
          <a
            href="/dashboard"
            className="inline-flex items-center rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
