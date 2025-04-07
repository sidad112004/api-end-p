"use server";
import checklogin from "@/action/checklogin/checklogin"
import AddApi from "@/components/addapipage/Addapi"
import { redirect } from "next/navigation"

export default async function AddApiPage() {
    const isLoggedIn = await checklogin()

    if (!isLoggedIn) {
        return redirect('/start')
    }

    return (
        <>
            <AddApi />
        </>
    )
}
