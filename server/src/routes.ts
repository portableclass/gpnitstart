import { Router } from 'express'
const mongoose = require('mongoose')

const DataSchema = new mongoose.Schema({
    articleid: Number,
    subarticleid: Number,
    articlename: String,
    external_str_id: Number,
    ecrlongname: String,
})

const Data = mongoose.model('Data', DataSchema, 'main')

const router = Router()

router.get('/product', async (req, res) => {
    try {
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 10
        const offset = parseInt(req.query.offset as string) || 0
        // const skip = (page - 1) * limit + offset
        const orderBy = (req.query.orderBy as string) || 'articleid'

        const totalDocs = await Data.countDocuments({})
        const totalPages = Math.ceil(totalDocs / limit)

        const data = await Data.find({})
            .select(
                'articleid subarticleid articlename external_str_id ecrlongname',
            )
            .sort({ [orderBy]: orderBy.startsWith('-') ? -1 : 1 })
            .skip(offset)
            .limit(limit)

        res.json({
            data,
            totalPages,
            currentPage: page,
            totalDocs,
            orderBy,
            offset,
        })
    } catch (err) {
        res.status(500).send('Server Error')
    }
})

router.get('/product/:id', async (req, res) => {
    try {
        const id = req.params.id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('Invalid ID format')
        }

        const product = await Data.findById(id)

        if (!product) {
            return res.status(404).send('Product not found')
        }

        res.json(product)
    } catch (err) {
        res.status(500).send('Server Error')
    }
})

router.post('/product', async (req, res) => {
    try {
        const {
            articleid,
            subarticleid,
            articlename,
            external_str_id,
            ecrlongname,
        } = req.body

        if (
            !articleid ||
            !subarticleid ||
            !articlename ||
            !external_str_id ||
            !ecrlongname
        ) {
            return res.status(400).send('All fields are required')
        }

        const newProduct = new Data({
            articleid,
            subarticleid,
            articlename,
            external_str_id,
            ecrlongname,
        })

        const savedProduct = await newProduct.save()

        res.status(201).json(savedProduct)
    } catch (err) {
        res.status(500).send('Server Error')
    }
})

router.patch('/product/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateFields = req.body

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('Invalid ID format')
        }

        const updatedProduct = await Data.findByIdAndUpdate(id, updateFields, {
            new: true,
            runValidators: true,
        })

        if (!updatedProduct) {
            return res.status(404).send('Product not found')
        }

        res.json(updatedProduct)
    } catch (err) {
        res.status(500).send('Server Error')
    }
})

router.delete('/product/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await Data.deleteOne({ _id: id })

        if (result.deletedCount === 0) {
            return res.status(404).send('Product not found')
        }

        res.status(200).send('Product deleted successfully')
    } catch (err) {
        res.status(500).send('Server Error')
    }
})

export default router
