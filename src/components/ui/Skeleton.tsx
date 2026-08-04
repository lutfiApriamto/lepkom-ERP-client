import { cn } from "@/lib/utils"

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
}

function Skeleton({
  className,
  count = 1,
  ...props
}: SkeletonProps) {
  if (count > 1) {
    return (
      <div className="space-y-2 w-full">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className={cn("animate-pulse rounded-md bg-muted h-4 w-full", className)} {...props} />
        ))}
      </div>
    )
  }
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
