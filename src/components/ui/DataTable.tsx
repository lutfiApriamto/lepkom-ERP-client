import React from 'react'

export interface Column<T = any> {
  key: string
  label: string
  className?: string
  render?: (row: T, index: number) => React.ReactNode
}

export interface DataTableProps<T = any> {
  columns: Column<T>[]
  data: T[]
  emptyMessage?: string
  rowKey?: (row: T, index: number) => string | number
  className?: string
}

export function DataTable<T = any>({
  columns,
  data,
  emptyMessage = 'Tidak ada data',
  rowKey,
  className = '',
}: DataTableProps<T>) {
  return (
    <div className={`overflow-x-auto border border-border rounded-lg ${className}`.trim()}>
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="bg-page text-gray-700 font-semibold uppercase text-xs tracking-wider border-b border-border">
          <tr>
            {columns.map((col) => (
              <th key={col.key} scope="col" className={`px-4 py-3 ${col.className || ''}`}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-white">
          {data && data.length > 0 ? (
            data.map((row, idx) => {
              const key = rowKey ? rowKey(row, idx) : (row as any)._id || (row as any).id || idx
              return (
                <tr key={key} className="border-b border-border hover:bg-gray-50/50 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className={`px-4 py-3.5 ${col.className || ''}`}>
                      {col.render ? col.render(row, idx) : (row as any)[col.key] ?? '-'}
                    </td>
                  ))}
                </tr>
              )
            })
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-gray-500">
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
