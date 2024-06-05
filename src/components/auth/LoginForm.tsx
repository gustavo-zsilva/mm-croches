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
import {
    getAuth,
    signInWithEmailAndPassword
} from "firebase/auth"

const formSchema = z.object({
    email: z.string().endsWith('@gmail.com', { message: 'Digite um email válido!' }),
    password: z.string().min(1, { message: 'Você deve preencher este campo!' }),
})

export function LoginForm() {
    const auth = getAuth()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    async function loginUser({ email, password }: z.infer<typeof formSchema>) {
        console.log({ email, password });
        
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const user = userCredential.user

            console.log(`User: ${user}`)
        } catch (err: any) {
            console.error(err.message)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(loginUser)} className="space-y-8">
                <FormField
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Email" type="email" {...field} />
                            </FormControl>
                            <FormDescription>
                                Email cadastrado pelo administrador
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
                                Senha cadastrada pelo administrador
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full rounded-sm">Entrar</Button>
            </form>
        </Form>
    )
}