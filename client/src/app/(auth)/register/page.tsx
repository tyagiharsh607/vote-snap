import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Register from "@/components/auth/Register";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function register() {
    const session = await getServerSession(authOptions);
    if (session) {
        redirect("/dashboard")
    }
    return (
        <div className="h-screen bg-gray-100 flex items-center justify-center p-6">
            {/* Main Container */}
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                {/* Register Form */}
                <Register />
            </div>
        </div>
    );
}
