import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="mt-4 h-4 w-full max-w-xl" />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="aspect-[4/3] w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}
