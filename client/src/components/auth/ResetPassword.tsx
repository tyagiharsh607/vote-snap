"use client";
import React, { useActionState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "../common/SubmitButton";
import { useFormState } from "react-dom";
import { resetPasswordAction } from "@/actions/authActions";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
    const initialState = {
        message: "",
        status: 0,
        errors: {},
    };
    const sParams = useSearchParams();
    const [state, formAction] = useActionState(resetPasswordAction, initialState);
    const router = useRouter();
    // console.log("state", state);


    useEffect(() => {
        if (state.status === 500) {
            toast.error(state.message);
        } else if (state.status === 200) {
            toast.success(state.message);
            const timeOut = setTimeout(() => {
                router.replace("/login");
            }, 1500);

            return () => clearTimeout(timeOut);
        }
    }, [state, state.status, state.message, router]);


    return (
        <form action={formAction}>
            {/* Hidden Input for Token */}
            <input type="hidden" name="token" value={sParams.get("token") ?? ""} />

            {/* Email Field */}
            <div className="mt-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <Input
                    placeholder="Type your email"
                    name="email"
                    readOnly
                    value={sParams.get("email") ?? ""}
                />
                {state.errors?.email && <span className="text-red-400 text-sm">{state.errors.email}</span>}
            </div>

            {/* Password Field */}
            <div className="mt-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <Input
                    type="password"
                    placeholder="Type your password"
                    name="password"
                />
                {state.errors?.password && <span className="text-red-400 text-sm">{state.errors.password}</span>}
            </div>

            {/* Confirm Password Field */}
            <div className="mt-4">
                <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                </label>
                <Input
                    type="password"
                    placeholder="Confirm your password"
                    name="confirm_password"
                />
                {state.errors?.confirm_password && <span className="text-red-400 text-sm">{state.errors.confirm_password}</span>}
            </div>

            {/* Submit Button */}
            <div className="mt-4">
                <SubmitButton />
            </div>
        </form>

    );
}
