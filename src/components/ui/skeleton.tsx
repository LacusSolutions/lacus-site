import { type HTMLAttributes, type ReactNode } from 'react';

import { cn } from '~/lib/utils';

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>): ReactNode {
  return <div className={cn('animate-pulse rounded-md bg-muted', className)} {...props} />;
}
