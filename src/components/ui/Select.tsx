import React from 'react'

export interface SelectOption {
  value: string | number
  label: string
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: SelectOption[]
  error?: string
  placeholder?: string
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      options,
      error,
      placeholder = 'Pilih salah satu',
      required,
      id,
      disabled,
      className = '',
      value,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          disabled={disabled}
          value={value}
          defaultValue={defaultValue}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed ${
            error
              ? 'border-red-500 focus:ring-red-500/30 focus:border-red-500'
              : 'border-border focus:ring-lepkom-green/30 focus:border-lepkom-green'
          } ${className}`.trim()}
          {...props}
        >
          {placeholder && (
            <option value="" disabled className="text-gray-500 bg-white">
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="text-gray-900 bg-white font-medium">
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    )
  }
)

Select.displayName = 'Select'
