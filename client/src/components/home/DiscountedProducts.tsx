import { Product } from '@/types/product'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { useState } from 'react'
import { Star } from 'lucide-react'
import { Button } from '../ui/button'

type DiscountedProductsProps = {
  discountedProducts: Product[] | false | undefined
}

const DiscountedProducts = ({
  discountedProducts,
}: DiscountedProductsProps) => {
  const [selectCategory, setSelectCategory] = useState<string>('all')
  const categories = discountedProducts && [
    'all',
    ...new Set(discountedProducts.map(product => product.category)),
  ]

  const products =
    discountedProducts &&
    (selectCategory === 'all'
      ? discountedProducts
      : discountedProducts.filter(
          product => product.category === selectCategory
        ))

  return (
    <div className=''>
      <section className='py-8 px-4'>
        <div className='flex flex-col items-center gap-4'>
          <h2 className='text-2xl font-semibold'>Discounted Gadgets</h2>
          <ul className='flex gap-4 py-10 flex-wrap'>
            {categories &&
              categories.map(category => (
                <li
                  key={category}
                  onClick={() => setSelectCategory(category)}
                  className={`border border-gray-200 rounded-md px-3 py-1 cursor-pointer ${
                    selectCategory === category ? 'bg-gray-200' : ''
                  }`}
                >
                  {category.slice(0, 1).toUpperCase() + category.slice(1)}
                </li>
              ))}
          </ul>
        </div>
        <section className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {products &&
            products.map(product => (
              <Card key={product._id}>
                <CardHeader>
                  <img
                    src={product.image}
                    alt={product.title}
                    className='w-fit h-36 object-cover'
                  />
                  <CardTitle className='pt-4'>{product.title}</CardTitle>
                  <CardDescription>
                    <span>Category: {product.category}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className='flex gap-2 flex-col'>
                  <div className='flex flex-col gap-1'>
                    <span>
                      Price: <strong>${product.price}</strong>
                    </span>
                    <span className='flex gap-1 items-center'>
                      Rating: <strong>{product.rating}</strong>{' '}
                      <Star size={20} />
                    </span>
                  </div>
                  <div className='flex flex-col gap-1'>
                    <span>
                      Before:{' '}
                      <span className='line-through'>${product.price}</span>
                    </span>
                    <span className=' font-semibold'>
                      Price: $
                      {product.discount &&
                        +product.price -
                          Math.ceil(
                            (+product.price * +product.discount) / 100
                          )}{' '}
                      <span className='text-sm text-red-500'>
                        ({product.discount}% discount)
                      </span>
                    </span>
                  </div>
                </CardContent>
                <CardFooter className='flex justify-between'>
                  <Button>View Details</Button>
                </CardFooter>
              </Card>
            ))}
        </section>
      </section>
    </div>
  )
}
export default DiscountedProducts
