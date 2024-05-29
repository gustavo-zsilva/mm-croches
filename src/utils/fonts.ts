import { Poppins, Dancing_Script } from 'next/font/google'

export const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
})

export const dancingScript = Dancing_Script({
    subsets: ["latin"],
    weight: ["400", "700"],
})