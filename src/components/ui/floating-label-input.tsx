'use client';

import React from 'react';
import { cn } from '@/src/lib/utils';
import { Label } from '@/src/components/ui/label';

type FloatingLabelInputProps = React.ComponentProps<'input'> & {
  label: string;
};

const inputStyles = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

export const FloatingLabelInput = React.forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ className, label, id, ...props }, ref) => (
    <div className="relative pt-5">
      <input
        id={id}
        className={cn(inputStyles, 'peer placeholder:text-transparent', className)}
        placeholder={label}
        ref={ref}
        {...props}
      />
      <Label
        htmlFor={id}
        className="absolute left-3 top-2 text-muted-foreground transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary"
      >
        {label}
      </Label>
    </div>
  )
);

FloatingLabelInput.displayName = 'FloatingLabelInput';
