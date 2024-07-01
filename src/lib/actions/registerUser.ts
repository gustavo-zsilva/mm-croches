"use server";

import "@/lib/firebase/firebase";

import { z } from "zod";
import { formSchema } from "@/components/auth/RegisterForm";
import admin from "@/lib/firebase/admin";

import nodemailer from "nodemailer";

export async function handleCreateUser({
  name,
  email,
  password,
}: z.infer<typeof formSchema>) {
  const auth = admin.auth();

  const whitelistedEmails =
    process.env.NEXT_PUBLIC_WHITELISTED_EMAILS?.split(",");

  // Not in whitelist
  if (!whitelistedEmails?.includes(email)) {
    return {
      message: "Seu email não tem permissões de criação de conta!",
      status: 401,
    };
  }

  const actionCodeSettings = {
    url: "http://localhost:3000/auth",
    handleCodeInApp: true,
  };

  try {
    await auth.createUser({
      displayName: name,
      email,
      password,
    });
    const link = await auth.generateEmailVerificationLink(
      email,
      actionCodeSettings,
    );

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    let message = {
      from: "MM Cozy Crochet <mmcozycrochet@gmail.com>",
      to: email,
      subject: "Verifique sua conta na MM Cozy Crochet Store 🧶",
      text: `Verifique sua conta clicando no link: ${link}`,
      html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="color: #2D3F7B; text-align: center;">Verifique seu e-mail</h2>
                <p style="font-size: 16px; color: #333;">
                    Olá,
                </p>
                <p style="font-size: 16px; color: #333;">
                    Obrigado por se registrar! Para completar seu cadastro, por favor, clique no botão abaixo para verificar seu e-mail.
                </p>
                <div style="text-align: center; margin: 20px 0;">
                    <a href="${link}" style="background-color: #2D3F7B; color: white; padding: 15px 25px; text-decoration: none; font-size: 16px; border-radius: 5px;">
                    Verificar E-mail
                    </a>
                </div>
                <p style="font-size: 16px; color: #333;">
                    Se você não se cadastrou em nosso site, por favor, ignore este e-mail.
                </p>
                <p style="font-size: 16px; color: #333;">
                    Atenciosamente,<br>
                    Equipe da MMCozyCrochet
                </p>
            </div>
        `,
    };

    transporter.sendMail(message, (err) => {
      if (err) {
        console.log("Error occurred. " + err.message);
        return process.exit(1);
      }
    });

    return {
      message: `Um link de verificação de email foi mandado para ${email}`,
      status: 200,
    };
  } catch (err: any) {
    console.error(err.message);
    return { message: err.message, status: 500 };
  }
}
