import Loader from '@/components/Loader'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useGetSingleProduct } from '@/services/queries'
import { ArrowBigLeft, Star } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

const ProductDetails = () => {
  const { id } = useParams()
  const {
    data: product,
    isPending: isProductPending,
    isError: isProductError,
  } = useGetSingleProduct(id!)

  if (isProductPending)
    return (
      <div className='grid place-items-center h-screen'>
        <Loader />
      </div>
    )
  if (isProductError)
    return <p className='center my-8'>Something went wrong!</p>
  return (
    <main className='center my-8'>
      <Button>
        <Link to='/products' className='flex items-center'>
          <ArrowBigLeft />
          Go Back
        </Link>
      </Button>
      <Card key={product._id} className='mt-8 flex'>
        <CardHeader>
          <img
            src={product.image}
            alt={product.title}
            className='w-fit h-36 object-cover'
          />
        </CardHeader>
        <CardContent className='flex flex-col gap-2'>
          <CardTitle className='pt-4'>{product.title}</CardTitle>
          <CardDescription>
            <span>Category: {product.category}</span>
          </CardDescription>
          <div className='flex flex-col gap-1'>
            <span>
              Price: <strong>${product.price}</strong>
            </span>
            <span className='flex gap-1 items-center'>
              Rating: <strong>{product.rating}</strong> <Star size={20} />
            </span>
            <span>
              Brand : <Badge>{product.brand}</Badge>
            </span>
          </div>

         
<div className='flex flex-col gap-2'>
  <span className='font-semibold'>
    {product.discount !== undefined && +product.discount !== 0 && (
      <div>
        Before: <span className='line-through'>${product.price}</span>
      </div>
    )}
    Price: $
    {product.discount !== undefined && +product.discount !== 0 ?
      (+product.price - Math.ceil((+product.price * +product.discount) / 100)) :
      product.price}{' '}
    <span className='text-sm text-red-500'>
      {product.discount !== undefined && +product.discount !== 0 ? 
        `(${product.discount}% discount)` :
        '(No discount)'}
    </span>
  </span>
</div>


          <div>
            <p className='font-bold'>Product Description</p>
            <p>{product.description}</p>
          </div>
          <Button className='mt-4'>Add to Cart</Button>
        </CardContent>
      </Card>
    </main>
  )
}
export default ProductDetails
