import React from 'react'

export interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  label?: string
  description?: string
  className?: string
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  disabled = false,
  label,
  description,
  className = '',
}) => {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`.trim()}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-lepkom-green/30 disabled:opacity-50 disabled:cursor-not-allowed ${
          checked ? 'bg-lepkom-green' : 'bg-gray-300'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <span
              onClick={() => !disabled && onChange(!checked)}
              className={`text-sm font-medium cursor-pointer ${
                disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900'
              }`}
            >
              {label}
            </span>
          )}
          {description && <span className="text-xs text-gray-500">{description}</span>}
        </div>
      )}
    </div>
  )
}
