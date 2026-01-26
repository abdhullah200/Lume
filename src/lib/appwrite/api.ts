import type { INewUser } from "@/types";
import { ID } from "appwrite";
import { account, appwriteConfig, avatars, databases } from "./config";
import { ca } from "zod/locales";
import { Query } from "appwrite";

export async function currentUserAccount(user:INewUser){
    try{
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        );

        if(!newAccount) throw Error;

        const avatarsUrl = avatars.getInitials(user.name);

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: new URL(avatarsUrl),
        })

        //const newUser    = await saveUserToDB()

        return newUser;
        

    }catch(error){
        console.log(error);
        return error;
    }
}

export async function saveUserToDB( user:{
    accountId: string;
    name     : string;
    email    : string;
    imageUrl : URL;
    username?: string;
}){
    try{
        const newUser = await databases.createDocument(
            appwriteConfig.databasesId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user,
        )
        return newUser;
    }catch(error){
        console.log(error);
        throw error;
    }
}


export async function signInAccount(user:{email: string; password: string;}){
    try{
        const session = await account.createEmailPasswordSession(user.email, user.password);
        return session;
    }catch(error: any){
        console.log(error);
        throw error;
    }
}

export async function getCurrentUser(){
    try{
        const currentUserAccount = await account.get();
        
        if(!currentUserAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databasesId,
            appwriteConfig.userCollectionId,
            [
                Query.equal("accountId", currentUserAccount.$id)
            ]
        )
        if(!currentUser) throw Error;

        return currentUser.documents[0];

    }catch(error){
        console.log(error);
        throw error;
    }
}