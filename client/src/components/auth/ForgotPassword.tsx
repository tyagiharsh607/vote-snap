"use client";
import React, { useActionState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "../common/SubmitButton";
import { useFormState } from "react-dom";
import { forgotPasswordAction } from "@/actions/authActions";
import { toast } from "sonner";

export default function ForgotPassword() {
    const initialState = {
        message: "",
        status: 0,
        errors: {},
    };
    const [state, formAction] = useActionState(forgotPasswordAction, initialState);


    useEffect(() => {
        if (state.status === 500) {
            toast.error(state.message);
        } else if (state.status === 200) {
            toast.success(state.message);
        }
    }, [state]);

    return (
        <form
            action={formAction}
            className="space-y-6 bg-white p-6 rounded-2xl shadow-lg"
        >
            {/* Email Field */}
            <div>
                <label
                    htmlFor="email"
                    className="block text-lg font-semibold text-black mb-2"
                >
                    Email
                </label>
                <Input
                    placeholder="Type your email"
                    name="email"
                    className="w-full p-3 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                {state.errors?.email && (
                    <span className="text-red-400 text-sm">{state.errors.email}</span>
                )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
                <SubmitButton />
            </div>
        </form>

    );
}
