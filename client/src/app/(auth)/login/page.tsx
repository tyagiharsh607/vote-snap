import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Login from "@/components/auth/Login";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function login() {
    const session = await getServerSession(authOptions);
    if (session) {
        redirect("/dashboard")
    }
    return (
        <div className="h-screen bg-gray-50 flex items-center justify-center p-6">
            {/* Main Container */}
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                {/* Login Form */}
                <Login />


            </div>
        </div>
    );
}
