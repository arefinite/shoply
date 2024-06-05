import { Link } from 'react-router-dom'
import { ModeToggle } from '../theme/ModeToggle'
import { Button } from '../ui/button'

const Header = () => {
  return (
    <header>
      <section className='center justify-end flex items-center gap-2 py-4'>
        <Button size='sm' asChild>
          <Link to='auth'>Sign In/Sign Up</Link>
        </Button>
        <ModeToggle />
      </section>
    </header>
  )
}
export default Header
