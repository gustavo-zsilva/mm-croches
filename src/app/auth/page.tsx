"use client";

import "@/lib/firebase/firebase";
import Image from "next/image";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";

import { GoogleLoginButton } from "@/components/auth/GoogleLoginButton";

export default function Auth() {
  return (
    <main className="flex ">
      <div className="flex flex-col flex-1 p-9 gap-10 m-auto max-w-screen-sm">
        <h1>Autenticação</h1>
        <GoogleLoginButton />
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
      </div>
      <picture className="relative h-screen w-1/2 hidden md:flex">
        <Image
          src="/assets/yarn.jpg"
          fill
          alt="Yarn"
          className="object-cover"
        />
      </picture>
    </main>
  );
}
