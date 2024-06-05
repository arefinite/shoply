import { Card } from '@/components/ui/card'
import { auth } from '@/firebase/firebase.config'
import { useAuthState } from 'react-firebase-hooks/auth'

const Profile = () => {
  const [user] = useAuthState(auth)

  return (
    <main>
      <h1 className='text-xl font-bold my-8'>User Information</h1>
      <Card className='p-4 w-fit flex gap-6 items-center'>
        <div>
          <img
            src={
              user?.photoURL ??
              'https://www.pngmart.com/files/22/User-Avatar-Profile-PNG-Isolated-Transparent.png'
            }
            alt='image'
            className='rounded-full h-24 w-24'
          />
        </div>
        <div>
          <p>Name: {user?.displayName}</p>
          <p>Email: {user?.email ?? 'N/A'}</p>
        </div>
      </Card>
    </main>
  )
}
export default Profile
