'use server'

import '@/lib/firebase/firebase'

import { z } from 'zod'
import { formSchema } from "@/components/auth/RegisterForm"
import admin from '@/lib/firebase/admin'

export async function handleCreateUser({ name, email, password }: z.infer<typeof formSchema>) {
    const auth = admin.auth()

    const whitelistedEmails = process.env.WHITELISTED_EMAILS?.split(',')
    
    // Not in whitelist
    if (!whitelistedEmails?.includes(email)) {
        return { message: 'Seu email não tem permissões de criação de conta!', status: 401 }
    }

    try {
        await auth.createUser({
            displayName: name,
            email,
            password,
        })

        return { message: `Usuário cadastrado com sucesso!`, status: 200 }
    } catch (err: any) {
        console.error(err.message)
        return { message: err.message, status: 500 }
    }
}