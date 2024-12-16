import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import ResetPassword from "@/components/auth/ResetPassword";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function resetPassword() {
    const session = await getServerSession(authOptions);
    if (session !== null) {
        redirect("/dashboard");
    }

    return (
        <div className="h-screen bg-gradient-to-br from-gray-100 to-white flex items-center justify-center p-6">
            {/* Main Container */}
            <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 relative">
                {/* Content */}
                <div>
                    <h1 className="text-4xl text-center font-extrabold text-gray-900">
                        Vote Snap
                    </h1>
                    <h2 className="text-2xl font-bold text-center mt-4 text-gray-700">
                        Reset Password
                    </h2>
                    <p className="text-center mt-2 text-gray-500">
                        Please set your new password below.
                    </p>
                </div>

                {/* ResetPassword Component */}
                <div className="mt-6">
                    <ResetPassword />
                </div>
            </div>
        </div>
    );
}
