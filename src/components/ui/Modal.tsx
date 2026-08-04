import React, { useEffect } from 'react'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg'
  hideHeader?: boolean
  hideCloseButton?: boolean
  contentClassName?: string
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  hideHeader = false,
  hideCloseButton = false,
  contentClassName = '',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizeClasses = {
    xs: 'max-w-sm',
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`relative bg-white rounded-xl shadow-xl w-full ${sizeClasses[size]} z-10 my-8 flex flex-col max-h-[90vh]`}
        onClick={(e) => e.stopPropagation()}
      >
        {!hideHeader && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            {!hideCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-muted transition-colors focus:outline-none"
                aria-label="Tutup modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}

        <div className={`p-6 overflow-y-auto flex-1 ${contentClassName}`}>{children}</div>

        {footer && (
          <div className="border-t border-border px-6 py-4 flex justify-end gap-3 bg-gray-50/50 rounded-b-xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
