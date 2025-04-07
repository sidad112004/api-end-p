"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLoginEmail(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // prevent automatic redirect for better error handling
    });
    console.log(res); // Log response for debugging
  }

  // function handleWithGoogle() {
  //   signIn("google", { redirect: false }) // prevent auto-redirect to handle potential errors
  //     .then((res) => {
  //       if (res?.error) {
  //         console.error("Google login error:", res.error);
  //       } else {
  //         console.log("Google login successful:", res);
  //       }
  //     });
  // }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Login to Your Account</h2>
        <form className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-slate-800 mt-1 w-full p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="bg-slate-800 mt-1 w-full p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Login with Credentials Button */}
          <div>
            <button
              onClick={handleLoginEmail}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Login
            </button>
          </div>

          {/* Google Login Button */}
          {/* <div>
            <button
              onClick={handleWithGoogle}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Login with Google
            </button>
          </div> */}

          {/* Sign-Up Redirect */}
          <div className="text-center text-sm">
            Dont have an account?{" "}
            <Link href="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
