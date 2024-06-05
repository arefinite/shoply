import { NextFunction, Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import path from 'node:path'
import cloudinary from '../../config/cloudinary'
import fs from 'node:fs'
import { Product } from '../model/product.model'
import createHttpError from 'http-errors'

// get all products
export const getAllProducts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await Product.find({})
    res.status(200).json(products)
  }
)

// get single product
export const getSingleProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const product = await Product.findById(id)
    if (!product) {
      throw new createHttpError.NotFound('Product not found')
    }
    res.status(200).json(product)
  }
)

// add product
export const addProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, price, description, category, discount, brand, rating } =
      req.body
    const files = req.files as { [filename: string]: Express.Multer.File[] }
    //get the product image
    const productImgMimeType = files.image[0].mimetype.split('/').at(-1)
    const productImgName = files.image[0].filename
    const productImgPath = path.resolve(
      __dirname,
      `../../../public/data/uploads`,
      productImgName
    )
    // upload the cover image  to cloudinary

    const productImgUploadResult = await cloudinary.uploader.upload(
      productImgPath,
      {
        filename_override: productImgName,
        folder: 'product-images',
        format: productImgMimeType,
      }
    )
    //create new product
    const newProduct = await Product.create({
      title,
      price,
      discount,
      category,
      description,
      brand,
      rating,
      image: productImgUploadResult.secure_url,
    })
    await fs.promises.unlink(productImgPath)
    if (!newProduct) return next(createHttpError(404, 'Product not added'))
    res.status(201).json({ message: 'Product added successfully' })
  }
)

// update product
export const updateProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const { title, price, description, category, discount, brand, rating } =
      req.body
    //check if the product exists
    const product = await Product.findById(id)
    if (!product) return next(createHttpError(404, 'Product not found'))

    const files = req.files as { [filename: string]: Express.Multer.File[] }
    //cover image update process
    let fullImg = ''
    if (files.image) {
      const imgMimeType = files.image[0].mimetype.split('/').at(-1)
      const imgName = files.image[0].filename
      const imgPath = path.resolve(
        __dirname,
        `../../../public/data/uploads`,
        imgName
      )
      fullImg = imgName
      const imgSplits = product.image.split('/')
      const imagePublicId =
        imgSplits.at(-2) + '/' + imgSplits.at(-1)?.split('.').at(-2)
      // upload the cover image  to cloudinary

      const imgUploadResult = await cloudinary.uploader.upload(imgPath, {
        filename_override: imgName,
        folder: 'product-images',
        format: imgMimeType,
      })
      //delete the cover image from the server
      await cloudinary.uploader.destroy(imagePublicId)
      fullImg = imgUploadResult.secure_url
      //remove cover image from the server
      await fs.promises.unlink(imgPath)

      //update book
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        {
          title,
          price,
          discount,
          category,
          description,
          brand,
          rating,
          image: fullImg,
        },
        { new: true }
      )
      if (!updatedProduct)
        return next(createHttpError(404, 'Book update failed'))
      res.status(200).json({ message: 'Book updated' })
    }
  }
)

// delete product
export const deleteProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const product = await Product.findByIdAndDelete(id)
    if (!product) return next(createHttpError(404, 'Product not found'))
    res.status(200).json({ message: 'Product deleted successfully' })
  }
)
