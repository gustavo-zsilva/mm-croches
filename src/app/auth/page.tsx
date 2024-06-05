"use client"

import "@/lib/firebase/firebase"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from 'zod'

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth"
import { LoginForm } from "@/components/auth/LoginForm"

const formSchema = z.object({
    email: z.string().endsWith('@gmail.com', { message: 'Digite um email válido!' }),
    password: z.string().min(1, { message: 'Você deve preencher este campo!' }),
})

const whitelistedEmails = [
    "marina.konstantinou.tavares",
    "marinamorenamiamore",
    "petzmarina25",
]

export default function Auth() {
    const auth = getAuth()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    
    async function registerUser({ email, password }: z.infer<typeof formSchema>) {
        console.log({ email, password });
        
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user

            console.log(`User: ${user}`)
        } catch (err: any) {
            console.error(err.message)
        }
    }

    return (
        <main className="flex flex-col gap-10 p-9">
            <h1>Autenticação</h1>
            <Tabs defaultValue="login">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Registrar</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <LoginForm />
                </TabsContent>
                <TabsContent value="register">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(registerUser)} className="space-y-8">
                            <FormField
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Email" type="email" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Email permitido pelo administrador para cadastro
                                        </FormDescription>
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
                                        <FormDescription>
                                            Crie uma senha ou utilize a do seu email
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full rounded-sm">Cadastrar</Button>
                        </form>
                    </Form>
                </TabsContent>
            </Tabs>
                
        </main>
    )
}