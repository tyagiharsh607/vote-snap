import ForgotPassword from "@/components/auth/ForgotPassword";
import React from "react";

export default function forgotPassword() {
    return (
        <div className="h-screen bg-gray-100 flex items-center justify-center p-6">
            {/* Main Container */}
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 relative">
                {/* Decorative Elements */}
                <div className="absolute -top-3 -right-3 w-6 h-6 bg-gray-800 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-gray-500 rounded-full animate-pulse"></div>

                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-extrabold text-black">Vote Snap</h1>
                    <h2 className="text-2xl font-semibold text-gray-800">Forgot Password?</h2>
                    <p className="text-gray-600">
                        Don’t worry, it happens! Enter your registered email below, and we’ll send you a reset link.
                    </p>
                </div>

                {/* Forgot Password Form */}
                <ForgotPassword />

                {/* Optional Register Prompt */}
                {/* Uncomment if needed */}
                {/* <p className="text-center mt-4 text-sm text-gray-600">
                    Don’t have an account?{" "}
                    <strong>
                        <Link href="/register" className="text-gray-800 underline hover:text-gray-900">
                            Register
                        </Link>
                    </strong>
                </p> */}
            </div>
        </div>
    );
}
