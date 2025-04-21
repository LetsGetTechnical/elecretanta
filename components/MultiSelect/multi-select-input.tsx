'use client';

import React from 'react';
import { useId } from 'react';
import { cn } from '@/lib/utils';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange'
  > {
  options: Option[];
  value?: string[];
  onChange?: (value: string[]) => void;
}

export const MultiSelect = React.forwardRef<HTMLInputElement, MultiSelectProps>(
  ({ options, className, value = [], onChange, ...props }, ref) => {
    const id = useId();

    const handleChange = (optionValue: string) => {
      const newValue = value.includes(optionValue)
        ? value.filter((v) => v !== optionValue)
        : [...value, optionValue];
      onChange?.(newValue);
    };

    return (
      <div className={cn('flex flex-wrap gap-2', className)} ref={ref}>
        {options.map((option) => (
          <label
            key={option.value}
            htmlFor={`${id}-${option.value}`}
            className={cn(
              'inline-flex items-center justify-center px-2 py-1 border rounded-md cursor-pointer transition-colors text-xs font-semibold',
              value.includes(option.value)
                ? 'bg-black text-white border-black'
                : 'bg-white text-black border-gray-300 hover:bg-gray-100',
            )}
          >
            <input
              type="checkbox"
              id={`${id}-${option.value}`}
              value={option.value}
              checked={value.includes(option.value)}
              onChange={() => handleChange(option.value)}
              className="sr-only"
              {...props}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    );
  },
);

MultiSelect.displayName = 'MultiSelect';
