import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

import '@/lib/firebase/firebase'

import { getAuth, onAuthStateChanged } from 'firebase/auth'

export function middleware(request: NextRequest) {
    const auth = getAuth()
    console.log('Current User: ', auth.currentUser);
    

    // if (auth.currentUser) {
    //     console.log('Logged in');
        
    //     return NextResponse.redirect(new URL('/', request.url))
    // } else {
    //     return NextResponse.redirect(new URL('/store', request.url))
    // }


}

export const config = {
    matcher: '/store/new-product'
}