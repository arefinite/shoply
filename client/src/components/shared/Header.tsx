import { Link } from 'react-router-dom'
import { ModeToggle } from '../theme/ModeToggle'
import { Button } from '../ui/button'
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/firebase.config'

const Header = () => {
  const [user] = useAuthState(auth)
  console.log(user)
  const [signOut] = useSignOut(auth)
  const handleSignOut = async () => {
    await signOut()
  }
  return (
    <header>
      <section className='center justify-end flex items-center gap-2 py-4'>
        <Button size='sm' asChild>
          <Link to='auth'>Sign In/Sign Up</Link>
        </Button>
        <Button onClick={handleSignOut}>Signout</Button>
        <ModeToggle />
      </section>
    </header>
  )
}
export default Header
