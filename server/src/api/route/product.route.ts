import { Router } from 'express'
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from '../controller/product.controller'
import { upload } from '../service/multer'
import { verifyToken } from '../middleware/verifyToken'

export const productRouter = Router()

productRouter.get('/all-products', getAllProducts)
productRouter
  .route('/:id')
  .get(getSingleProduct)
  .patch(verifyToken,upload.fields([{ name: 'image', maxCount: 1 }]),updateProduct)
  .delete(verifyToken,deleteProduct)
productRouter.post('/', verifyToken, upload.fields([{ name: 'image', maxCount: 1 }]),addProduct)
