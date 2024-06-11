'use server'

import '@/lib/firebase/firebase'

import { cookies } from 'next/headers'

import { z } from 'zod'
import { formSchema } from "@/components/auth/LoginForm"
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

export async function handleSignIn({ email, password }: z.infer<typeof formSchema>) {
    const auth = getAuth()

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const token = await userCredential.user.getIdToken()
        
        const cookieStore = cookies()
        cookieStore.set('token', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 30, // 30 days
        })

        return { message: `Login realizado com sucesso!`, status: 200 }
    } catch (err: any) {
        console.error(err.message)
        return { message: err.message, status: 500 }
    }
}