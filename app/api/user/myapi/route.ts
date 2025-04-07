import client from "@/db/index"
import checklogin from "@/action/checklogin/checklogin"

import { NextResponse } from "next/server"

export async function GET() {
    const login = await checklogin()

    if (!login) {
        return NextResponse.redirect('/start')
    }
    
    const authorId = Number(login.id)

    try {
        const data = await client.customapi.findMany({
            where: {
                createdById: authorId
            }
        })

        return NextResponse.json({ data })
    } catch (error) {
        console.error("Error fetching data:", error)
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
    }
}
