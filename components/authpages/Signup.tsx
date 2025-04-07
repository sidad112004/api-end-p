"use client";   
import { signup } from "@/action/signup";

import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (name === '' || email === '' || password === '') {
            toast.error("Fill all the fields");
            return;
        }

        setIsLoading(true);
        try {
            const data = await signup(name, email, password);
            if (data === null) {
                toast.error("User already exists");
                return;
            }
            toast.success("Signup successful");
            router.push('/start');
        } catch (error) {
            toast.error("An error occurred. Please try again.");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
            <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-lg p-8">
                <h2 className="text-3xl font-bold text-center mb-6">Create an Account</h2>
                <form className="space-y-6" onSubmit={handleSignup}>
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium">Name</label>
                        <input
                            type="text"
                            value={name}
                            required
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className="mt-1 w-full p-3 border bg-slate-800 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="mt-1 w-full p-3 border bg-slate-800 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 w-full p-3 border bg-slate-800 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full ${isLoading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"} text-white font-semibold py-3 px-6 rounded-lg transition-colors`}
                        >
                            {isLoading ? "Signing Up..." : "Sign Up"}
                        </button>
                    </div>

                    {/* Already have an account */}
                    <div className="text-center text-sm">
                        Already have an account?{" "}
                        <button onClick={() => signIn()} className="text-blue-500 hover:underline">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
