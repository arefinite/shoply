import { Router } from 'express'
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from '../controller/product.controller'
import { upload } from '../service/multer'

export const productRouter = Router()

productRouter.get('/all-products', getAllProducts)
productRouter
  .route('/:id')
  .get(getSingleProduct)
  .patch(upload.fields([{ name: 'image', maxCount: 1 }]),updateProduct)
  .delete(deleteProduct)
productRouter.post('/', upload.fields([{ name: 'image', maxCount: 1 }]),addProduct)
