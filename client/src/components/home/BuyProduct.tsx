import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

const BuyProduct = () => {
  return (
    <section className='py-8 center'>
      <div className='flex flex-col items-center gap-4'>
        <h2 className='text-2xl font-bold'>How to Buy from us</h2>
      </div>
      <div className='flex flex-col gap-4 md:flex-row justify-between py-10'>
        {/* <div className='flex-1'>
          <img src={Buy} alt='buy' />
        </div> */}
        <div className='flex-1 items-center flex justify-center'>
          <div className='space-y-4'>
            <h1 className='text-2xl font-bold'>Shop From Home OR Outlet</h1>
            <p>
              You can shop from our multiple outlet or you can shop by our
              official website
            </p>
            <Button>
              <Link to='contact'>Explore Our Outlet Address</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
export default BuyProduct
