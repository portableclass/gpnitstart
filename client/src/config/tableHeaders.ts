import { IProduct } from '../models/product'

export const product = [
    {
        Header: 'articleid',
        id: 'articleid',
        accessor: (d: IProduct) => d.articleid,
    },
    {
        Header: 'subarticleid',
        id: 'subarticleid',
        accessor: (d: IProduct) => d.subarticleid,
    },
    {
        Header: 'articlename',
        id: 'articlename',
        accessor: (d: IProduct) => d.articlename,
    },
    {
        Header: 'external_str_id',
        id: 'external_str_id',
        accessor: (d: IProduct) => d.external_str_id,
    },
    {
        Header: 'ecrlongname',
        id: 'ecrlongname',
        accessor: (d: IProduct) => d.ecrlongname,
    },
]

export const productFull = [
    {
        Header: '_id',
        id: '_id',
        accessor: (d: IProduct) => d._id,
    },
    {
        Header: 'articleid',
        id: 'articleid',
        accessor: (d: IProduct) => d.articleid,
    },
    {
        Header: 'subarticleid',
        id: 'subarticleid',
        accessor: (d: IProduct) => d.subarticleid,
    },
    {
        Header: 'articlename',
        id: 'articlename',
        accessor: (d: IProduct) => d.articlename,
    },
    {
        Header: 'external_str_id',
        id: 'external_str_id',
        accessor: (d: IProduct) => d.external_str_id,
    },
    {
        Header: 'ecrlongname',
        id: 'ecrlongname',
        accessor: (d: IProduct) => d.ecrlongname,
    },
]

export const productExport = {
    default: product,
    full: productFull,
}

// export default productExport
