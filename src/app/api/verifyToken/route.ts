import admin from '@/lib/firebase/admin'
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    const auth = admin.auth()
    const idToken = request.cookies.get('token')?.value

    try {
        const decodedToken = await auth.verifyIdToken(idToken || '')
        
        return Response.json({ user: decodedToken.email, status: 201 })
    } catch (err: any) {
        return Response.json({ status: 500, ...err })
    }
}