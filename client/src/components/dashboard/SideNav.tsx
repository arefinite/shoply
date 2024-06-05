import { Link, NavLink } from 'react-router-dom'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { BookA, CircleGauge, Menu, Settings, User } from 'lucide-react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from '../ui/sheet'
import { auth } from '@/firebase/firebase.config'
import { useSignOut } from 'react-firebase-hooks/auth'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const SideNav = () => {
  const {setIsLoggedIn} = useContext(AuthContext)
  const [signOut] = useSignOut(auth)
  const handleSignOut = async () => {
    await signOut()
    localStorage.removeItem('access-token')
    setIsLoggedIn(false)
  }
  return (
    <main>
      <nav className='center hidden md:block'>
        <Card className=' w-[250px] mt-8 p-4'>
          <ul className='space-y-4'>
            <li className='flex gap-2'>
              <CircleGauge color='gray' />
              <NavLink to='/dashboard/home'>Dashboard</NavLink>
            </li>
            <li className='flex gap-2'>
              <Settings color='gray' />
              <NavLink to='/dashboard/manage-products'>Manage Products</NavLink>
            </li>

            <li className='flex gap-2'>
              <User color='gray' />
              <NavLink to='dashboard/profile'>Profile</NavLink>
            </li>
          </ul>
          <div className='flex gap-2'>
            <Button variant='outline' size='sm' className='mt-4 w-fit' asChild>
              <Link to='/'>Visit Site</Link>
            </Button>
            <Button
              variant='destructive'
              size='sm'
              className='mt-4 w-fit'
              onClick={handleSignOut}
            >
              Logout
            </Button>
          </div>
        </Card>
      </nav>
      {/* Mobile Nav */}
      <div className='md:hidden mt-8 pr-4'>
        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent className='w-full' side='left'>
            <SheetHeader>
              <SheetDescription>
                <nav className='flex flex-col '>
                  <ul className='flex flex-col gap-4'>
                    <NavLink to='/dashboard/home'>
                      <SheetClose asChild>
                        <li className='flex gap-2 items-center'>
                          <CircleGauge color='gray' size={20} />
                          Dashboard
                        </li>
                      </SheetClose>
                    </NavLink>
                    <NavLink to='dashboard/manage-products'>
                      <SheetClose asChild>
                        <li className='flex gap-2 items-center'>
                          <BookA color='gray' size={20} />
                          Manage Books
                        </li>
                      </SheetClose>
                    </NavLink>

                    <NavLink to='dashboard/profile'>
                      <SheetClose asChild>
                        <li className='flex gap-2 items-center'>
                          <User color='gray' size={20} />
                          Profile
                        </li>
                      </SheetClose>
                    </NavLink>
                  </ul>
                  <div className='flex gap-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      className='mt-4 w-fit'
                      asChild
                    >
                      <Link to='/'>Visit Site</Link>
                    </Button>
                    <Button
                      variant='destructive'
                      size='sm'
                      className='mt-4 w-fit'
                      onClick={handleSignOut}
                    >
                      Logout
                    </Button>
                  </div>
                </nav>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </main>
  )
}
export default SideNav
