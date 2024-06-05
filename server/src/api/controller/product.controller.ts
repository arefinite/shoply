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
  async (req: Request, res: Response, next: NextFunction) => {}
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
  async (req: Request, res: Response, next: NextFunction) => {}
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
