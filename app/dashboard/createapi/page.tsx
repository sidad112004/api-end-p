"use server";
import Createownapi from "@/components/createsapi/Createownapi"
import { redirect } from "next/navigation"
import checklogin from "@/action/checklogin/checklogin"

export default async function CreateApiPage() {
    const isLoggedIn = await checklogin()

    if (!isLoggedIn) {
        redirect("/start")
    }

    return (
        <>
            <Createownapi />
        </>
    )
}
