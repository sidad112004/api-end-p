import { NextResponse } from "next/server"
import client from "@/db/index"
import checklogin from "@/action/checklogin/checklogin"
import { redirect } from "next/navigation"

export async function POST(req: Request) {
  try {
    const login = await checklogin()

    if (!login) {
      redirect('/start')
    }

    const authorId = Number(login.id)

    const body = await req.json()
    const { apiName, description, link } = body

    if (!apiName || !description || !link) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    console.log("yes")
    const data = await client.post.create({
      data: {
        apiName,
        description,
        link,
        authorId
      }
    })

    console.log("Data saved:", data)

    return NextResponse.json({ message: "API information saved successfully", data }, { status: 201 })
  } catch (error) {
    console.error("Error handling POST request:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
