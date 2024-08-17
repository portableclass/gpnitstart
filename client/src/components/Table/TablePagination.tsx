import React, { FC } from 'react'

interface TablePaginationProps {
    pagesCount: number
    currentPage: number
    handleClick: (page: number) => void
}

const TablePagination: FC<TablePaginationProps> = ({
    pagesCount,
    currentPage,
    handleClick,
}) => {
    const renderPages = () => {
        const pages = []
        const visiblePages = 10
        let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2))
        let endPage = Math.min(pagesCount, startPage + visiblePages - 1)

        if (endPage - startPage < visiblePages - 1) {
            startPage = Math.max(1, endPage - visiblePages + 1)
        }

        for (let page = startPage; page <= endPage; page += 1) {
            pages.push(
                <button
                    type='button'
                    key={page}
                    className={
                        page === currentPage
                            ? 'active-action'
                            : 'table-page-link'
                    }
                    onClick={() => handleClick(page)}
                >
                    <span>{page}</span>
                </button>,
            )
        }

        return pages
    }

    return (
        <div className='pagination-wrapper'>
            <div className='page-switch'>
                {currentPage > 1 && (
                    <>
                        <button
                            type='button'
                            className='table-page-action'
                            onClick={() => handleClick(1)}
                        >
                            <span>Перейти к началу</span>
                        </button>
                        <button
                            type='button'
                            className='table-page-action'
                            onClick={() => handleClick(currentPage - 1)}
                        >
                            <span>&lt;&lt;Предыдущие</span>
                        </button>
                        <span className='table-page-action-separator' />
                    </>
                )}

                {renderPages()}

                {currentPage < pagesCount && (
                    <>
                        <span className='table-page-action-separator' />
                        <button
                            type='button'
                            className='table-page-action'
                            onClick={() => handleClick(currentPage + 10)}
                        >
                            <span>Следующие &gt;&gt;</span>
                        </button>
                        <button
                            type='button'
                            className='table-page-action'
                            onClick={() => handleClick(pagesCount)}
                        >
                            <span>Перейти к последней</span>
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default TablePagination
