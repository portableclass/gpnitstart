import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { HeaderGroup } from 'react-table'

interface TableHeaderGroupsProps {
    headerGroups: HeaderGroup<any>[]
    showAdd: string | null
    handleHeaderClick: (field: string) => void
}

const TableHeaderGroups: FC<TableHeaderGroupsProps> = props => {
    const { headerGroups, showAdd, handleHeaderClick } = props

    return (
        <>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>
                            <button
                                type='button'
                                onClick={() => handleHeaderClick(column.id)}
                            >
                                {column.render('Header')}
                            </button>
                        </th>
                    ))}
                    {showAdd && (
                        <th>
                            <Link to='/product/create'>
                                <div className='search-line'>Добавить</div>
                            </Link>
                        </th>
                    )}
                </tr>
            ))}
        </>
    )
}

export default TableHeaderGroups
