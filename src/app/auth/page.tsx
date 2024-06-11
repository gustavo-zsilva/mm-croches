"use client"

import "@/lib/firebase/firebase"
import { GoogleAuthProvider } from "firebase/auth"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { LoginForm } from "@/components/auth/LoginForm"
import { RegisterForm } from "@/components/auth/RegisterForm"

import { FcGoogle } from "react-icons/fc";

export default function Auth() {
    const provider = new GoogleAuthProvider()

    return (
        <main className="flex flex-col gap-10 p-9">
            <h1>Autenticação</h1>
            <button className="
                inline-flex
                items-center
                justify-center
                gap-4
                px-6
                py-3
                rounded-full
                whitespace-nowrap
                text-md   
                border
                border-black
                shadow-md
                ring-offset-background
                hover:bg-gray-100
                transition-colors
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-ring
                focus-visible:ring-offset-2
            ">
                <FcGoogle size={32} />
                Login com Google
            </button>
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