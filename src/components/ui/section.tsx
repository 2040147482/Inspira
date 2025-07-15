import * as React from 'react';
import { cn } from '@/lib/utils';
import { Container } from './container';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  background?: 'default' | 'muted' | 'accent';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
}

const backgroundVariants = {
  default: 'bg-background',
  muted: 'bg-muted',
  accent: 'bg-gradient-to-br from-primary/5 to-secondary/5',
};

const paddingVariants = {
  sm: 'py-8',
  md: 'py-12',
  lg: 'py-16',
  xl: 'py-20',
};

export function Section({
  className,
  containerSize = 'lg',
  background = 'default',
  padding = 'lg',
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        backgroundVariants[background],
        paddingVariants[padding],
        className
      )}
      {...props}
    >
      <Container size={containerSize}>{children}</Container>
    </section>
  );
}
