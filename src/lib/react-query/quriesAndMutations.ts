import { useMutation } from '@tanstack/react-query'
import { createUserAccount, signInAccount } from '../appwrite/api'
import type { INewUser } from '@/types'

export const userCreateUserAccountMutation = ()=>{
    return useMutation({
        mutationFn: (user:INewUser) => createUserAccount(user),
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