import { NEXT_AUTH } from "@/action/auth";
import NextAuth from "next-auth";


const handler = NextAuth(NEXT_AUTH);

export { handler as GET, handler as POST };
