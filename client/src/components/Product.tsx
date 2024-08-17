import React, { FC, useEffect, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { useAppDispatch, useAppSelector } from '../hooks/useReduxHooks'
import {
    addProduct,
    fetchByIdProduct,
    updateProduct,
} from '../store/slices/productSlice'
import { IProduct, ProductSchema } from '../models/product'
import { IDataByMode } from '../models/IFormData'
import Button from './Button'
import Spinner from './Spinner/Spinner'
import '../assets/styles/scss/section.scss'
import FormInput from './FormInput'

interface FormProductProps {
    id: string
    title: string | null
    mode: string
}

const FormProduct: FC<FormProductProps> = props => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const goBack = () => navigate('/product')

    const { id, title, mode } = props

    const dataByMode: IDataByMode<IProduct> = {
        edit: {
            formTitle: `${title} / Редактирование`,
            buttonTitle: 'Сохранить изменения',
            data: useAppSelector(state => state.products.single),
        },
        create: {
            formTitle: `${title} / Добавление`,
            buttonTitle: 'Добавить продукт',
            data: {} as IProduct,
        },
    }

    const getFormData = (key: string) => {
        return dataByMode[key]
    }

    const formData = getFormData(mode)

    const formik = useFormik({
        initialValues: {
            articleid: formData.data.articleid,
            subarticleid: formData.data.subarticleid,
            articlename: formData.data.articlename,
            external_str_id: formData.data.external_str_id,
            ecrlongname: formData.data.ecrlongname,
        },
        validationSchema: ProductSchema,
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true)
            try {
                dispatch(updateProduct({ _id: id, ...values }))
            } catch (e) {
                console.log(e)
            }
            return setSubmitting(false)
        },
        validateOnBlur: false,
        validateOnChange: false,
        validateOnMount: false,
    })

    const handleSaveChanges = () => {
        dispatch(
            updateProduct({
                _id: id,
                ...formik.values,
            }),
        )
        goBack()
    }

    const handleAddElement = () => {
        dispatch(addProduct(formik.values))
        goBack()
    }

    const buttonAction = () =>
        mode === 'edit' ? handleSaveChanges() : handleAddElement()

    return (
        <form onSubmit={formik.handleSubmit} autoComplete='off'>
            <fieldset disabled={formik.isSubmitting}>
                <h1>{formData.formTitle}</h1>

                <FormInput
                    name='articlename'
                    label='articlename'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.articlename}
                />

                <FormInput
                    name='ecrlongname'
                    label='ecrlongname'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.ecrlongname}
                />

                <div className='input-buttons-wrapper'>
                    <Button
                        title={formData.buttonTitle}
                        handleClick={() => buttonAction()}
                    />
                    <Button
                        title='Вернуться'
                        handleClick={() => {
                            goBack()
                        }}
                    />
                </div>
            </fieldset>
        </form>
    )
}

const Product: FC = () => {
    const dispatch = useAppDispatch()

    const loaderData: any = useLoaderData()
    const { id, mode } = loaderData
    const loadingSingle = useAppSelector(state => state.products.loadingSingle)

    useEffect(() => {
        if (mode !== 'edit') {
            dispatch(fetchByIdProduct(id))
        }
    }, [dispatch, id, mode])

    if (loadingSingle && mode !== 'create') {
        return <Spinner />
    }

    return (
        <div className='outlet-wrapper flex-column'>
            <div className='default-wrapper'>
                <div className='section-wrapper'>
                    <div className='section-content'>
                        <FormProduct id={id} title='Продукты' mode={mode} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product
