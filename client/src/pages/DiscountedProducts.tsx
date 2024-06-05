import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useGetAllProducts } from '@/services/queries'

import { LoaderCircle, Star } from 'lucide-react'


const DiscountedProducts = () => {
  const {
    data: products,
    isPending: isProductsPending,
    isError: isProductsError,
  } = useGetAllProducts()

  const hasProduct = products && products.length > 0

  const discountedProducts =
    hasProduct &&
    products
      .filter(product => product.discount && +product.discount > 0)

  if (isProductsPending)
    return (
      <div className='flex justify-center items-center h-screen'>
        <LoaderCircle className='animate-spin' />
      </div>
    )
  if (isProductsError) return <p>Something went wrong!</p>

  return (
    <main className='center pb-8'>
      <h2 className='text-2xl text-center font-semibold py-8'>Discounted Gadgets</h2>
      <section className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {discountedProducts &&
          discountedProducts.map(product => (
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
                    Rating: <strong>{product.rating}</strong> <Star size={20} />
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
    </main>
  )
}
export default DiscountedProducts
