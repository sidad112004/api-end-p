"use server"

import { error } from "console"
import client from "../db"

export async function signup(name: string, email: string, password: string) {
    try {
        const user = await client.user.findUnique({
            where: {
                email: email
            }
        })

        if (user) {
            return null
        }

        const newUser = await client.user.create({
            data: {
                name: name,
                email: email,
                password: password
            }
        })

        return newUser
    } catch (error) {
        console.error("Error in signup:", error)
        return error
    }
}
