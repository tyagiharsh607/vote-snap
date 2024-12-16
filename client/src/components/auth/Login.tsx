"use client"
import React, { useActionState, useEffect } from 'react'
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { SubmitButton } from '../common/SubmitButton';
import { loginAction } from '@/actions/authActions';
import { toast } from 'sonner';
import { signIn } from 'next-auth/react';

const Login = () => {
    const initState = {
        status: 0,
        message: "",
        errors: {},
        data: {}
    }
    const [state, formAction] = useActionState(loginAction, initState)



    useEffect(() => {
        console.log(state);

        if (state.status === 500) {
            toast.error(state.message);
        } else if (state.status === 200) {
            toast.success(state.message);
            signIn("credentials", {
                email: state.data?.email,
                password: state.data?.password,
                redirect: true,
                callbackUrl: "/dashboard",
            });
        }
    }, [state]);

    return (
        <form className="space-y-6" action={formAction}>
            {/* Header */}
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-black">Welcome Back</h1>
                <p className="text-gray-600">Sign in to your account</p>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-800">
                        Email
                    </label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="hello@example.com"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-black focus:border-black focus:ring-2 focus:ring-gray-300 transition-all"
                        required
                    />
                    {/* Uncomment for error handling */}
                    <span className="text-red-500">{state.errors?.email}</span>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium text-gray-800">
                        Password
                    </label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-black focus:border-black focus:ring-2 focus:ring-gray-300 transition-all"
                        required
                    />
                    {/* Uncomment for error handling */}
                    <span className="text-red-500">{state.errors?.password}</span>
                </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
                <Link href="/forgot-password" className="text-sm text-gray-800 hover:text-black">
                    Forgot your password?
                </Link>
            </div>

            <SubmitButton />

            {/* Sign Up Link */}
            <div className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/register" className="text-black hover:underline font-medium">
                    Sign up
                </Link>
            </div>
        </form>

    )
}

export default Login
