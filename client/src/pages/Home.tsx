import { BuyProduct, DiscountedProducts, Faq, TopRated } from '@/components'
import Banner from '@/components/home/Banner'
import NewArrivals from '@/components/home/NewArrivals'
import { Card, CardDescription } from '@/components/ui/card'
import { useGetAllProducts } from '@/services/queries'
import { Product } from '@/types/product'
import { Divide, LoaderCircle } from 'lucide-react'

const Home = () => {
  const {
    data: products,
    isPending: isProductsPending,
    isError: isProductsError,
  } = useGetAllProducts()

  const hasProduct = products && products.length > 0

  const discountedProducts =
    hasProduct &&
    products
      .filter(product => product.discount && +product.discount <= 50)
      .sort(
        (a: Product, b: Product) => (+b?.discount || 0) - (+a?.discount || 0)
      )
      .slice(0, 10)

  const newArrival = hasProduct && products.reverse().slice(0, 10)

  const topRatedProducts =
    hasProduct &&
    products
      .sort((a: Product, b: Product) => (+b?.rating || 0) - +(a?.rating || 0))
      .slice(0, 10)

  if (isProductsPending)
    return (
      <div className='flex justify-center items-center h-screen'>
        
        <LoaderCircle className='animate-spin' />
      </div>
    )
  if (isProductsError) return <p>Something went wrong!</p>

  return (
    <>
      <Banner />
      <section className='center'>
        <Card className='relative -translate-y-10'>
          <CardDescription>
            <DiscountedProducts discountedProducts={discountedProducts} />
            <div className='mx-6'>
              <TopRated topRatedProducts={topRatedProducts} />
            </div>
            <BuyProduct />
            <NewArrivals newArrival={newArrival} />
            <Faq />
          </CardDescription>
        </Card>
      </section>
    </>
  )
}
export default Home
