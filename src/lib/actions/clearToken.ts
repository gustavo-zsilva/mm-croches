'use server'

import { cookies } from "next/headers"

export async function clearToken() {
    const cookieStore = cookies()
    cookieStore.delete('token')
}