import { getServerSession } from "next-auth"
import { NEXT_AUTH } from "@/action/auth" 

export default async function checklogin() {
    const session = await getServerSession(NEXT_AUTH)

    if (!session) {
        return null 
    }
    
    return session 
}
