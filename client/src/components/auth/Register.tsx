"use client"
import { registerAction } from "@/actions/authActions";
import { SubmitButton } from "@/components/common/SubmitButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

const Register = () => {
    const initState = {
        status: 0,
        message: "",
        errors: {}
    }
    const [state, formAction] = useActionState(registerAction, initState)

    useEffect(() => {
        if (state.status === 404) {
            toast.error(state.message);
        } else if (state.status === 200) {
            console.log("success");

            toast.success(state.message);

        }
    }, [state]);

    return (
        <form className="space-y-6" action={formAction}>
            {/* Header */}
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-black">Create Your Account</h1>
                <p className="text-gray-600">Fill in the details to sign up</p>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
                {/* Name Field */}
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-800">
                        Name
                    </label>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-black focus:ring-2 focus:ring-gray-900 transition-all"
                        required
                    />
                    <span className="text-red-500">{state.errors?.name}</span>
                </div>

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
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-black focus:ring-2 focus:ring-gray-900 transition-all"
                        required
                    />
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
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-black focus:ring-2 focus:ring-gray-900 transition-all"
                        required
                    />
                    <span className="text-red-500">{state.errors?.password}</span>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                    <label htmlFor="confirm_password" className="text-sm font-medium text-gray-800">
                        Confirm Password
                    </label>
                    <Input
                        id="confirm_password"
                        name="confirm_password"
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-black focus:ring-2 focus:ring-gray-900 transition-all"
                        required
                    />
                    <span className="text-red-500">{state.errors?.confirm_password}</span>
                </div>
            </div>

            {/* Submit Button */}
            <SubmitButton />

            {/* Sign Up Link */}
            <div className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-black underline hover:text-gray-700 font-medium">
                    Sign in
                </Link>
            </div>
        </form>

    )
}

export default Register
