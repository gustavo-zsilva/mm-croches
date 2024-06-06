"use client"

import "@/lib/firebase/firebase"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { LoginForm } from "@/components/auth/LoginForm"
import { RegisterForm } from "@/components/auth/RegisterForm"

export default function Auth() {
    

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
                    <RegisterForm />
                </TabsContent>
            </Tabs>
                
        </main>
    )
}