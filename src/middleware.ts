import { NextRequest } from 'next/server'
import admin from '@/lib/firebase/admin'

export async function middleware(request: NextRequest) {
    // Get Authorization from cookies
    
    const auth = admin.auth()
    const currentUser = request.cookies.get('currentUser')?.value

    try {
        const matchingUid = await auth.getUser(currentUser || '')
        console.log(`User found in database: ${matchingUid.email}`)
    } catch (err) {
        console.error(err)
        return Response.redirect(new URL('/store', request.url))
    }
    
    if (!currentUser) {
        return Response.redirect(new URL('/store', request.url))
    }
    
}

export const config = {
    matcher: '/store/new-product'
}