import { AxiosResponse } from 'axios'
import $api from '../../http'
import {
    IProduct,
    IProductCreate,
    IProductsResponse,
} from '../../models/product'
import IQueryParams from '../../models/IQueryParams'

const ProductService = {
    getProducts(
        params: IQueryParams,
        signal: AbortSignal,
    ): Promise<AxiosResponse<IProductsResponse>> {
        return $api.get(
            `/product?limit=${params.limit || 10}&orderBy=${
                params.orderBy || 'articleid'
            }&offset=${params.offset || 0}`,
            { signal },
        )
    },

    addProduct(product: IProductCreate): Promise<AxiosResponse<IProduct>> {
        return $api.post('/product', product)
    },

    deleteProduct(productId: string): Promise<AxiosResponse<void>> {
        return $api.delete(`/product/${productId}`)
    },

    updateProduct(product: IProduct): Promise<AxiosResponse<IProduct>> {
        const { _id, ...productWithoutId } = product
        return $api.patch(`/product/${product._id}`, productWithoutId)
    },

    searchProduct(
        field: keyof IProduct,
        value: any,
    ): Promise<AxiosResponse<IProduct[]>> {
        return $api.get(`/product/search?${field}=${value}`)
    },

    getProduct(
        id: string,
        signal: AbortSignal,
    ): Promise<AxiosResponse<IProduct>> {
        return $api.get(`/product/${id}`, { signal })
    },
}

export default ProductService
