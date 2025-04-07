"use server"

import client from "../db"

export async function searchapi(searchTerm: string) {
    try {
        if (searchTerm === '') {
            const data = await client.post.findMany({})
            return data
        }
        const data = await client.post.findMany({
            where: {
                apiName: searchTerm
            }
        })
        return data
    } catch (error) {
        console.error("Error fetching API data:", error)
        return []
    }
}
