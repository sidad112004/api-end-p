import { NextRequest, NextResponse } from "next/server"
import checklogin from '@/action/checklogin/checklogin'
import client from '@/db/index'

export async function POST(req: NextRequest) {
    const login = await checklogin()

    if (!login) {
        return NextResponse.redirect('/start')
    }

    const createdById = Number(login.id)

    try {
        const { title, json } = await req.json()

        const jsonData = typeof json === 'string' ? JSON.parse(json) : json

        if (!Array.isArray(jsonData) || !jsonData.every(item => typeof item === 'object')) {
            return NextResponse.json({ success: false, error: 'Invalid JSON format. Expected an array of objects.' })
        }

        const newdata = await client.customapi.create({
            data: {
                title,
                fields: jsonData,
                sampleSize: jsonData.length,
                createdById
            }
        })

        return NextResponse.json({ success: true, data: newdata })
    } catch (error) {
        console.error("Error in uploading JSON data:", error)
        return NextResponse.json({ success: false, error: 'Failed to upload JSON data.' })
    }
}
