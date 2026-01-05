// app/dashboard/ui/GridSkeleton.tsx
export default function GridSkeleton({ items = 6 }: { items?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gray-200" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-100 rounded w-1/3" />
              </div>
            </div>
            <div className="h-16 bg-gray-100 rounded" />
          </div>
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
            <div className="h-3 bg-gray-100 rounded w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}
