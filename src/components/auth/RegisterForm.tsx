'use client'

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
import { useToast } from "@/components/ui/use-toast"
import { handleCreateUser } from "@/lib/actions/registerUser"

export const formSchema = z.object({
    email: z.string().email({ message: 'Digite um email válido!' }),
    name: z.string(),
    password: z.string().min(1, { message: 'Você deve preencher este campo!' }),
})

export function RegisterForm() {
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            name: "",
            password: "",
        }
    })
    
    async function handleRegisterUser({ name, email, password }: z.infer<typeof formSchema>) {
        const response = await handleCreateUser({ name, email, password })

        if (response.status !== 200) {
            return toast({
                title: response.message,
                variant: 'destructive',
            })
        }

        toast({
            title: response.message,
            description: 'Após isso, faça login na aba do lado!',
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleRegisterUser)} className="space-y-8">
                <FormField
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                                <Input placeholder="Seu nome" {...field} />
                            </FormControl>
                            <FormDescription>
                                Opcional
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
    )
}