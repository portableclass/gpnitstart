import { z } from 'zod'
import primitives from '../primitives'

export interface IProduct {
    _id: string
    articleid: number
    subarticleid: number
    articlename: string
    external_str_id: number
    ecrlongname: string
}

export interface IProductsResponse {
    data: IProduct[]
    totalPages: number
    currentPage: number
    totalDocs: number
    offset: number
    orderBy: string
}

export interface IProductCreate {
    articleid: number
    subarticleid: number
    articlename: string
    external_str_id: number
    ecrlongname: string
}

export const ProductSchema = z.object({
    _id: primitives.strMax128,
    articleid: primitives.integer,
    subarticleid: primitives.integer,
    articlename: primitives.strMax256,
    external_str_id: primitives.integer,
    ecrlongname: primitives.strMax256,
})
