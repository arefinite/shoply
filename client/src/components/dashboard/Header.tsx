import { Key } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

const Header = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString())
  const date = new Date().toDateString()
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])
  return (
    <header className='py-4 bg-muted'>
      <section className='center'>
        <div className='flex center items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Key color='red' />
            <span className='text-lg md:text-2xl tracking-tighter font-bold'>
              <Link to='/dashboard/home'>Admin Dashboard</Link>
            </span>
          </div>
          <div className='text-right  hidden md:block'>
            <div>Welcome user</div>
            <div>
              {date} | {time}
            </div>
          </div>
        </div>
      </section>
    </header>
  )
}
export default Header
