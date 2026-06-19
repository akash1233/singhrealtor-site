import { Skeleton } from "@/components/ui/skeleton";

export default function ListingsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-8">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="mt-8 h-32 w-full rounded-xl" />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="aspect-[4/3] w-full rounded-none" />
        ))}
      </div>
    </div>
  );
}
