import { Product } from '@/types/product'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'

type NewArrivalProps = {
  newArrival: Product[] | false | undefined
}

const NewArrivals = ({ newArrival }: NewArrivalProps) => {
  return (
    <div className='center'>
       <div className='flex flex-col items-center gap-4  my-8'>
        <h2 className='text-2xl font-bold'>
          New Arrivals
        </h2>
      </div>
      <section className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {newArrival &&
          newArrival.map(product => (
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
              <CardFooter>
                <Button variant='outline' className='w-full'>View Details</Button>
            </CardFooter>
            </Card>
          ))}
      </section>
    </div>
  )
}
export default NewArrivals
