import { navs } from '@/utils/navs'
import {  Menu, ShoppingBag } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from '../ui/sheet'

const Navbar = () => {
  return (
    <nav>
      <div className='center flex justify-between items-center pt-2'>
        <Link to='/'>
          <div className='flex items-center gap-2 text-2xl md:text-3xl'>
            <span>
              <ShoppingBag size={30} color='gray' />
            </span>
            <span className='font-semibold'>Shoply.</span>
          </div>
        </Link>
        {/* For tablet and desktop navigation */}
        <div className='hidden md:block'>
          <ul className='flex gap-10'>
            {navs.map((nav, i) => (
              <li key={i}>
                <NavLink to={nav.href}>
                  {nav.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        {/* For mobile navigation */}
        <div className='md:hidden'>
          <Sheet>
            <SheetTrigger>
              <Menu />
            </SheetTrigger>
            <SheetContent className='w-[250px]'>
              <SheetHeader>
                <SheetDescription>
                  <ul className='gap-2 mt-4 text-left flex-col flex'>
                    {navs.map((nav, i) => (
                      <NavLink to={nav.href} key={i}>
                        <SheetClose asChild>
                          <li key={i}>{nav.label}</li>
                        </SheetClose>
                      </NavLink>
                    ))}
                  </ul>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
export default Navbar
