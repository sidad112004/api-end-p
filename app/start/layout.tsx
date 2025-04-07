import Navbar from "@/components/startpage/Navbar"

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
        <Navbar/>
        {children}
        </>
    )
}
