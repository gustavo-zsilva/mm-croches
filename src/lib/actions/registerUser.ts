'use server'

import '@/lib/firebase/firebase'

import { z } from 'zod'
import { formSchema } from "@/components/auth/RegisterForm"
import admin from '@/lib/firebase/admin'

import nodemailer from 'nodemailer'

export async function handleCreateUser({ name, email, password }: z.infer<typeof formSchema>) {
    const auth = admin.auth()

    const whitelistedEmails = process.env.NEXT_PUBLIC_WHITELISTED_EMAILS?.split(',')
    
    // Not in whitelist
    if (!whitelistedEmails?.includes(email)) {
        return { message: 'Seu email não tem permissões de criação de conta!', status: 401 }
    }

    const actionCodeSettings = {
        url: 'http://localhost:3000/auth',
        handleCodeInApp: true,
    }

    try {
        await auth.createUser({
            displayName: name,
            email,
            password,
        })
        const link = await auth.generateEmailVerificationLink(email, actionCodeSettings)

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'mmcozycrochet@gmail.com',
                pass: 'nimt lmwt sfew mjzg',
            }
        })

        let message = {
            from: 'MM Cozy Crochet <mmcozycrochet@gmail.com>',
            to: email,
            subject: 'Verifique sua conta na MM Cozy Crochet Store 🧶',
            text: `Verifique sua conta clicando no link: ${link}`,
            html: `
                <h2>Aqui está o seu link de verificação de email da MM Cozy Crochet.<br>
                    <a href="${link}">
                        <button style="border: 0; background-color: #2D3F7B; padding: .8rem 2rem; color: white; font-weight: bold; border-radius: .2rem;">
                            Clique aqui
                        </button>
                    </a>
                </h2>
                <br>
                <p>Não foi você? Clique no link abaixo para proteger sua conta.</p>
            `,
        }

        transporter.sendMail(message, (err) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }
        })
        
        return { message: `Um link de verificação de email foi mandado para ${email}`, status: 200 }
    } catch (err: any) {
        console.error(err.message)
        return { message: err.message, status: 500 }
    }
}