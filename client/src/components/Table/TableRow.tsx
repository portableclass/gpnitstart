import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { type Row } from 'react-table'
import { toast } from 'react-toastify'
import { useAppDispatch } from '../../hooks/useReduxHooks'
import { ReactComponent as SVGEdit } from '../../assets/img/table/edit.svg'
import { ReactComponent as SVGDelete } from '../../assets/img/table/delete.svg'
import { deleteProduct } from '../../store/slices/productSlice'
import getTableRowId from '../../helpers/getTableRowId'
import ToastMessage from '../ToastMessage'

interface TableRowProps {
    row: Row<any>
    prepareRow: (row: Row<any>) => void
    showButtons: {
        [key: string]: boolean | undefined
        read?: boolean
        add?: boolean
        dropdown?: boolean
        edit?: boolean
        delete?: boolean
        request?: boolean
        nested?: boolean
    }
}

const TableRow: FC<TableRowProps> = props => {
    const dispatch = useAppDispatch()
    const { row, prepareRow, showButtons } = props

    const handleDeleteProduct = (stroke: Row<any>) => {
        const id = getTableRowId(stroke, '_id')
        dispatch(deleteProduct(id))
            .then(() => {
                toast.success(
                    <ToastMessage
                        name='Запись удалена'
                        desc='Успешная операция'
                    />,
                    {
                        position: 'bottom-right',
                        theme: 'colored',
                        autoClose: 5000,
                    },
                )
            })
            .catch(() => {
                toast.error(
                    <ToastMessage
                        name='Ошибка удаления'
                        desc='Операция завершена'
                    />,
                    {
                        position: 'bottom-right',
                        theme: 'colored',
                        autoClose: 15000,
                    },
                )
            })
    }

    prepareRow(row)

    return (
        <tr {...row.getRowProps()}>
            {row.cells.map(cell => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
            ))}
            <td>
                <div className='actions-wrapper'>
                    {showButtons.edit && (
                        <Link to={`/product/${getTableRowId(row, '_id')}/edit`}>
                            <span>
                                <SVGEdit />
                            </span>
                        </Link>
                    )}
                    {showButtons.delete && (
                        <button
                            type='button'
                            onClick={() => handleDeleteProduct(row)}
                        >
                            <span>
                                <SVGDelete fill='#A1A1A1' />
                            </span>
                        </button>
                    )}
                </div>
            </td>
        </tr>
    )
}

export default TableRow
