'use client'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const pages = []
  const showEllipsis = totalPages > 5

  if (showEllipsis) {
    // Mostrar páginas: 1, 2, 3, ..., última
    pages.push(1, 2, 3)
    if (totalPages > 3) {
      pages.push(-1) // Ellipsis
      pages.push(totalPages)
    }
  } else {
    // Mostrar todas las páginas
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  }

  return (
    <nav
      aria-label="Paginación"
      className="mt-12 flex items-center justify-center gap-2"
    >
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-border hover:bg-gray-ui transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Página anterior"
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>

      {/* Page Numbers */}
      {pages.map((page, index) => {
        if (page === -1) {
          return (
            <span key={`ellipsis-${index}`} className="px-2">
              ...
            </span>
          )
        }

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
              currentPage === page
                ? 'bg-accent text-white'
                : 'border border-gray-border hover:bg-gray-ui'
            }`}
            aria-label={`Página ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        )
      })}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-border hover:bg-gray-ui transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Página siguiente"
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
    </nav>
  )
}

export default Pagination
