import { Button } from '../ui/button'
import bannerImg from '/banner.svg'
const Banner = () => {
  return (
    <div className='bg-muted mt-8 pb-16'>
      <section className='center flex justify-between items-center'>
        <div className='flex-1 space-y-4'>
          <p className='tracking-wider'>Enjoy Your Shopping With Us</p>
          <h1 className='text-xl md:text-2xl font-semibold tracking-tighter'>
            Get up to 30% Off on New Arrivals
          </h1>
          <p>
            Discover the latest trends and enjoy up to 30% off on our new
            arrivals! Elevate your style with fresh, fashionable pieces that
            won't break the bank. Don't miss out on these exclusive
            discounts—shop. Hurry, these deals won't last long!
          </p>
          <div className='flex gap-2'>
            <Button variant='outline'>Store Locator</Button>
            <Button>Shop Now</Button>
          </div>
        </div>

        <div className='flex-1 flex justify-end'>
          <img src={bannerImg} className='h-60 w-60' alt='Banner Image' />
        </div>
      </section>
    </div>
  )
}
export default Banner
