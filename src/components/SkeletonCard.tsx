export default function SkeletonCard() {
  return (
    <div className="rounded-sm overflow-hidden bg-card shadow-card animate-pulse">
      <div className="aspect-[4/5] bg-muted" />
      <div className="px-4 py-3 border-t border-border space-y-2">
        <div className="h-5 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-1/3" />
      </div>
    </div>
  );
}
