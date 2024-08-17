import {
    createSlice,
    createAsyncThunk,
    isPending,
    isRejected,
} from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import React from 'react'
import ProductService from '../../services/reduxServices/ProductService'
import {
    IProduct,
    IProductCreate,
    IProductsResponse,
} from '../../models/product'
import IQueryParams from '../../models/IQueryParams'

interface ErrorResponse {
    message?: string
}

interface IProductsState {
    products: IProduct[]
    totalPages: number
    currentPage: number
    totalDocs: number
    offset: number
    orderBy: string
    loading: boolean
    error: string | null
    single: IProduct
    loadingSingle: boolean
}

const initialState: IProductsState = {
    products: [],
    totalPages: 0,
    currentPage: 1,
    totalDocs: 0,
    offset: 0,
    orderBy: 'articleid',
    loading: false,
    error: null,
    single: {} as IProduct,
    loadingSingle: false,
}

export const fetchProducts = createAsyncThunk<
    IProductsResponse,
    IQueryParams,
    { rejectValue: string }
>('products/fetchProducts', async (params: IQueryParams, thunkAPI) => {
    try {
        const controller = new AbortController()
        thunkAPI.signal.addEventListener('abort', () => controller.abort())

        const response = await ProductService.getProducts(
            params,
            controller.signal,
        )
        return response.data
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>
        const errorMessage =
            axiosError.response?.data?.message || 'Failed to fetch products'

        return thunkAPI.rejectWithValue(errorMessage)
    }
})

export const addProduct = createAsyncThunk<
    IProduct,
    IProductCreate,
    { rejectValue: string }
>('products/addProduct', async (newProduct: IProductCreate, thunkAPI) => {
    try {
        const response = await ProductService.addProduct(newProduct)
        return response.data
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>
        const errorMessage =
            axiosError.response?.data?.message || 'Failed to add product'

        return thunkAPI.rejectWithValue(errorMessage)
    }
})

export const deleteProduct = createAsyncThunk<
    string,
    string,
    { rejectValue: string }
>('products/deleteProduct', async (productId: string, thunkAPI) => {
    try {
        await ProductService.deleteProduct(productId)
        return productId
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>
        const errorMessage =
            axiosError.response?.data?.message || 'Failed to delete product'

        return thunkAPI.rejectWithValue(errorMessage)
    }
})

export const updateProduct = createAsyncThunk<
    IProduct,
    IProduct,
    { rejectValue: string }
>('products/updateProduct', async (updatedProduct: IProduct, thunkAPI) => {
    try {
        const response = await ProductService.updateProduct(updatedProduct)
        return response.data
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>
        const errorMessage =
            axiosError.response?.data?.message || 'Failed to update product'

        return thunkAPI.rejectWithValue(errorMessage)
    }
})

export const searchProduct = createAsyncThunk<
    IProduct[],
    { field: keyof IProduct; value: any },
    { rejectValue: string }
>('products/searchProduct', async (searchCriteria, thunkAPI) => {
    try {
        const response = await ProductService.searchProduct(
            searchCriteria.field,
            searchCriteria.value,
        )
        return response.data
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>
        const errorMessage =
            axiosError.response?.data?.message || 'Failed to search products'

        return thunkAPI.rejectWithValue(errorMessage)
    }
})

export const fetchByIdProduct = createAsyncThunk<
    IProduct,
    string,
    { rejectValue: string }
>('products/fetchByIdProduct', async (productId: string, thunkAPI) => {
    try {
        const controller = new AbortController()
        thunkAPI.signal.addEventListener('abort', () => controller.abort())

        const response = await ProductService.getProduct(
            productId,
            controller.signal,
        )
        return response.data
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>
        const errorMessage =
            axiosError.response?.data?.message || 'Failed to fetchById product'

        return thunkAPI.rejectWithValue(errorMessage)
    }
})

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload.data
                state.totalPages = action.payload.totalPages
                state.currentPage = action.payload.currentPage
                state.totalDocs = action.payload.totalDocs
                state.offset = action.payload.offset
                state.orderBy = action.payload.orderBy
                state.loading = false
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.products.push(action.payload)
                state.loading = false
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(
                    product => product._id !== action.payload,
                )
                state.loading = false
            })
            .addCase(fetchByIdProduct.fulfilled, (state, action) => {
                state.single = action.payload
                state.loadingSingle = false
            })
            .addCase(fetchByIdProduct.pending, (state, action) => {
                state.loadingSingle = true
            })
            .addCase(fetchByIdProduct.rejected, (state, action) => {
                state.loadingSingle = false
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex(
                    product => product._id === action.payload._id,
                )
                if (index !== -1) {
                    state.products[index] = action.payload
                }
                state.loading = false
            })
            .addCase(searchProduct.fulfilled, (state, action) => {
                state.products = action.payload
                state.loading = false
            })
            .addMatcher(
                isPending(
                    fetchProducts,
                    addProduct,
                    deleteProduct,
                    updateProduct,
                    searchProduct,
                ),
                state => {
                    state.loading = true
                    state.error = null
                },
            )
            .addMatcher(
                isRejected(
                    fetchProducts,
                    addProduct,
                    deleteProduct,
                    updateProduct,
                    searchProduct,
                ),
                (state, action) => {
                    state.loading = false
                    state.error = action.payload as string
                },
            )
    },
})

export const productsReducer = productsSlice.reducer
