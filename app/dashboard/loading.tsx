import GridSkeleton from '@/app/ui/GridSkeleton';

export default function Loading() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Loading…</h1>
      <GridSkeleton />
    </div>
  );
}
