import { model, Schema } from 'mongoose'
import { ProductType } from '../type/product.type'

const productSchema = new Schema<ProductType>(
  {
    
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    discount: { type: Number, required: true, min: 0, max: 100 },
  },
  {
    timestamps: true,
  }
)

export const Product = model('Product', productSchema)
