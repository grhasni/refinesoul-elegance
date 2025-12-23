import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function ProductCardSkeleton({ className }: SkeletonProps) {
  return (
    <div className={cn('animate-pulse', className)}>
      <div className="aspect-[3/4] bg-muted rounded-lg skeleton-shimmer mb-4" />
      <div className="space-y-2">
        <div className="h-5 bg-muted rounded skeleton-shimmer w-3/4" />
        <div className="h-4 bg-muted rounded skeleton-shimmer w-full" />
        <div className="h-4 bg-muted rounded skeleton-shimmer w-1/4" />
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted animate-pulse">
      <div className="text-center space-y-6">
        <div className="h-12 bg-muted-foreground/10 rounded skeleton-shimmer w-64 mx-auto" />
        <div className="h-6 bg-muted-foreground/10 rounded skeleton-shimmer w-80 mx-auto" />
        <div className="h-12 bg-muted-foreground/10 rounded skeleton-shimmer w-40 mx-auto" />
      </div>
    </div>
  );
}

export function ImageSkeleton({ className }: SkeletonProps) {
  return (
    <div className={cn('bg-muted skeleton-shimmer rounded-lg', className)} />
  );
}
