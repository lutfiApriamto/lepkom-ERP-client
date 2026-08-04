import React, { useState, useEffect, useRef } from 'react';
import { LuX } from 'react-icons/lu';
import { Input, Button } from '@/components/ui';
import { cn } from '@/lib/utils';

interface DebouncedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
  icon?: React.ReactNode;
}

const DebouncedInput: React.FC<DebouncedInputProps> = ({
  value: initialValue,
  onChange,
  debounce = 500,
  className,
  icon,
  ...props
}) => {
  const [value, setValue] = useState(initialValue);
  const isFirstRun = useRef(true);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, debounce]);

  const handleClear = () => {
    setValue('');
    onChange('');
  };

  const hasValue = value !== '' && value != null;

  return (
    <div className="relative w-full group">
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-brand-green transition-colors pointer-events-none">
          {icon}
        </div>
      )}
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={cn(
          "w-full overflow-hidden text-ellipsis whitespace-nowrap placeholder:italic placeholder:text-muted-foreground placeholder:font-normal bg-card transition-all duration-200",
          icon ? "pl-9" : "pl-3",
          hasValue ? "pr-8 border-brand-green ring-1 ring-brand-green/30" : "pr-3",
          className
        )}
        {...props}
      />
      {hasValue && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleClear();
          }}
        >
          <LuX className="h-3.5 w-3.5" />
        </Button>
      )}
    </div>
  );
};

export default DebouncedInput;