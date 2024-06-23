"use client"

import { useRouter } from "next/navigation"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from 'zod'

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

import { signInWithEmailAndPassword, getAuth } from "firebase/auth"

import { handleSetToken } from "@/lib/actions/setToken"

export const formSchema = z.object({
    email: z.string().endsWith('@gmail.com', { message: 'Digite um email válido!' }),
    password: z.string().min(1, { message: 'Você deve preencher este campo!' }),
})

export function LoginForm() {
    const { toast } = useToast()
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    async function handleLoginUser({ email, password }: z.infer<typeof formSchema>) {
        try {
            const auth = getAuth()
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            
            if (!userCredential.user.emailVerified) {
                toast({
                    title: 'Verifique o seu email antes de fazer login.',
                    description: 'Enviamos um link ao seu email para confirmar que é realmente você.',
                    variant: 'destructive',
                })
                await auth.signOut()
                return
            }

            const idToken = await userCredential.user.getIdToken()
            
            handleSetToken({ idToken })
            
            toast({
                title: 'Login realizado com sucesso!',
                description: 'Bem-vindo(a) de volta! Redirecionando para a loja em 3 segundos...',
            })
    
            // Delay de 3 segundos
            await new Promise(resolve => setTimeout(resolve, 3000))

            router.push('/store/new-product')
        } catch (err: any) {
            toast({
                title: 'Algo deu errado!',
                description: err.message,
                variant: 'destructive',
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLoginUser)} className="space-y-8">
                <FormField
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Email" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                                <Input placeholder="Sua senha" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full rounded-sm">Entrar</Button>
            </form>
        </Form>
    )
}