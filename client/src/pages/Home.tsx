import Banner from '@/components/home/Banner'
import BuyBook from '@/components/home/BuyBook'
import DiscountedProducts from '@/components/home/DiscountedProducts'
import Faq from '@/components/home/Faq'
import FilterEbooks from '@/components/home/FilterEbooks'
import LatestBooks from '@/components/home/LatestBooks'
import Products from '@/components/home/Products'

const Home = () => {
  return (
    <>
      <Banner />
      <FilterEbooks />
      <LatestBooks />
      <Products />
      <DiscountedProducts />
      <BuyBook />
      <Faq />
    </>
  )
}
export default Home
