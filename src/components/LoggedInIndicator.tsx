'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import '@/lib/firebase/firebase'
import { User, getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export function LoggedInIndicator() {
    const auth = getAuth()
    const [user, setUser] = useState<User | null>(null)

    async function handleSignOut() {
        try {
            await signOut(auth)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                console.log(user.email);
                console.log(user.uid);
                
                setUser(user)
            } else {
                console.log('Signed Out')
                setUser(null)
            }
        })

        // handleSignOut()
    }, [])

    if (!user) {
        return null
    }

    return (
        <div className="border-4 border-indigo-500 rounded-full fixed max-w-[50vw] top-4 right-4 cursor-pointer" onClick={handleSignOut}>
            <Avatar className="h-10">
                <AvatarImage src={user.photoURL || undefined} />
                <AvatarFallback>MT</AvatarFallback>
            </Avatar>
        </div>
    )
}