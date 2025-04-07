import CredentialsProvider from "next-auth/providers/credentials"
import client from "@/db"

import GoogleProvider from "next-auth/providers/google"
import { match } from "assert"

export const NEXT_AUTH = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "you@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any) {
                if (!credentials || !credentials.email || !credentials.password) {
                    return null
                }

                const { email, password } = credentials

                const user = await client.user.findFirst({
                    where: {
                        email: email,
                        password: password
                    }
                })

                if (!user) {
                    return null
                }
                if (user.password !== password) {
                    return null
                }
                return {
                    id: user.id.toString(),
                    name: user.name,
                    email: user.email
                }
            }
        }),
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_ID || "",
        //     clientSecret: process.env.GOOGLE_SECRET || ""
        // })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        // async signIn({ user, account, profile, token }: any) {
        //     if (account.provider === "google") {
        //         const dbUser = await client.user.findFirst({
        //             where: { email: user.email }
        //         })

        //         if (!dbUser) {
        //             return false
        //         }
        //     }
        //     return true
        // },
        session: ({ session, token }: any) => {
            if (session && session.user) {
                session.id = token.sub
            }
            return session
        }
    }
}
