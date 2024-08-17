import React, { FC, useEffect } from 'react'
import { useTable } from 'react-table'
import '../../assets/styles/scss/table.scss'
import {
    currentOffset,
    currentPageByOffset,
} from '../../helpers/tablePaginationHelper'
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks'
import Spinner from '../Spinner/Spinner'
import { fetchProducts } from '../../store/slices/productSlice'
import { productExport } from '../../config/tableHeaders'
import TableHeaderGroups from './TableHeaderGroups'
import TablePagination from './TablePagination'
import TableRow from './TableRow'

const Table: FC = () => {
    const dispatch = useAppDispatch()

    const title = 'Продукты'
    const showButtons = { add: true, edit: true, delete: true }

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({
            columns: productExport.default,
            data: JSON.parse(
                JSON.stringify(
                    useAppSelector(state => state.products.products),
                ),
            ),
            initialState: { hiddenColumns: ['_id'] },
        })

    const isLoading = useAppSelector(state => state.products.loading)

    const pagesCount = useAppSelector(state => state.products.totalPages)
    const offsetValue = useAppSelector(state => state.products.offset)
    const currentOrderBy = useAppSelector(state => state.products.orderBy)

    useEffect(() => {
        const dispatchedThunk = dispatch(
            fetchProducts({
                offset: offsetValue,
                orderBy: currentOrderBy,
            }),
        )

        return () => {
            dispatchedThunk.abort()
        }
    }, [offsetValue, currentOrderBy])

    const handleOrderBy = (field: string) => {
        dispatch(
            fetchProducts({
                orderBy: currentOrderBy === field ? `-${field}` : field,
                offset: offsetValue,
            }),
        )
    }

    const handlePaginationClick = (page: number) => {
        dispatch(
            fetchProducts({
                orderBy: currentOrderBy,
                offset: currentOffset(page),
            }),
        )
    }

    return (
        <>
            <h1 className='section-header'>{`${title} / Список`}</h1>
            <div className='table-wrapper'>
                {!isLoading ? (
                    <>
                        <div className='table-content'>
                            <table className='table' {...getTableProps()}>
                                <thead>
                                    <TableHeaderGroups
                                        headerGroups={headerGroups}
                                        showAdd={
                                            showButtons.add ? 'product' : null
                                        }
                                        handleHeaderClick={handleOrderBy}
                                    />
                                </thead>
                                <tbody {...getTableBodyProps()}>
                                    {rows.map((row, index) => (
                                        <TableRow
                                            row={row}
                                            prepareRow={prepareRow}
                                            showButtons={showButtons}
                                            // eslint-disable-next-line react/no-array-index-key
                                            key={index}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <TablePagination
                            pagesCount={pagesCount}
                            currentPage={currentPageByOffset(offsetValue)}
                            handleClick={handlePaginationClick}
                        />
                    </>
                ) : (
                    <div className='table-body-spinner'>
                        <Spinner />
                    </div>
                )}
            </div>
        </>
    )
}

export default Table
