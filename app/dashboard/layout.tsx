import MainNavbar from "@/components/mainnavbar/mainnvabar";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
        <MainNavbar/>
        {children}

        </>
       
    );
  }
  