import { AuthContext } from '@/components/context/AuthContext'
import Loader from '@/components/Loader'
import { auth } from '@/firebase/firebase.config'
import { useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Navigate } from 'react-router-dom'

const PrivateRoutes = ({ children }: { children: React.ReactNode }) => {
  const [user, loading] = useAuthState(auth)
  const { isLoggedIn } = useContext(AuthContext)
  if (loading) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <Loader />
      </div>
    )
  }
  if (isLoggedIn) {
    return children
  }
  if (!user) {
    return <Navigate to='/auth' />
  }
 
  return children
}
export default PrivateRoutes
