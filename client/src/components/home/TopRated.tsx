import { Product } from '@/types/product'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel'
import { Card, CardContent } from '../ui/card'
import { Star } from 'lucide-react'

type TopRatedProductsProps = {
  topRatedProducts: Product[] | false | undefined
}

const TopRated = ({ topRatedProducts }: TopRatedProductsProps) => {
  return (
    <section className='center py-8'>
      <div className='flex flex-col items-center gap-4'>
        <h2 className='text-2xl font-bold'>
          Top Rated Gadgets
        </h2>
      </div>
      <div>
        <Carousel className='w-full py-10 '>
          <CarouselContent className='-ml-1'>
            {topRatedProducts &&
              topRatedProducts.map(product => (
                <CarouselItem
                  key={product._id}
                  className='pl-1 md:basis-1/2 lg:basis-1/5'
                >
                  <div className='p-1'>
                    <Card>
                      <CardContent className='flex aspect-square items-center justify-center p-6'>
                        <div className='flex flex-col gap-2'>
                          <img
                            src={product.image}
                            alt={product.title}
                            className='w-fit h-36 object-cover'
                          />
                          <span className='font-semibold'>
                            {product.title}
                          </span>
                          <div className='flex flex-col gap-2'>
                            <span className='flex gap-1 items-center'>
                              Rating: <strong>{product.rating}</strong>{' '}
                              <Star size={20} />
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  )
}
export default TopRated
