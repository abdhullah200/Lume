import { useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { userSignOutAccountMutation } from '@/lib/react-query/quriesAndMutations';
import { useUserContext } from '@/context/AuthContext';

const Topbar = () => {

    const { mutate: signOut, isSuccess } = userSignOutAccountMutation();
    const navigate = useNavigate();
    const { user } = useUserContext();

    useEffect(() => {
        if (isSuccess) navigate(0);
    }, [isSuccess]);


  return (
    <section className='topbar'>
        <div className='flex-between py-4 px-5'>
            <Link to='/'>
                <img src="/assets/images/logo.png" alt="logo" width={130} height={325} />
            </Link>
            <div className='flex gap-4'>
                <Button variant="ghost" className='shad-button_ghost' onClick={ () => signOut()}>
                    <img src="/assets/images/logout.svg" alt="search" width={20} height={20} />
                </Button>
                <Link to={`/profile/${user.id}`} className='flex-center gap-3'>
                    <img
                    src={user.imageUrl || '/assets/image/profile-placeholder.svg'}
                    alt="profile"
                    className='h-8 w-8 rounded-full'
                    />
                </Link>

            </div>
        </div>
    </section>
  )
}

export default Topbar