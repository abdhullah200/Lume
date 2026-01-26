import { useMutation } from '@tanstack/react-query'
import { currentUserAccount, signInAccount } from '../appwrite/api'
import type { INewUser } from '@/types'

export const userCreateUserAccountMutation = ()=>{
    return useMutation({
        mutationFn: (user:INewUser) => currentUserAccount(user),
    })
}

export const userSignInAccountMutation = ()=>{
    return useMutation({
        mutationFn: (user: {
            email: string;
            password: string;
        }) => signInAccount(user),
    })
}