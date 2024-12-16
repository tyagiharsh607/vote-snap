import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="h-screen bg-gray-100 p-6 flex justify-center items-center">
            <div className="text-center space-y-4">
                {/* Main content */}
                <div className="relative">
                    <Image
                        src="/404_page.svg"
                        width={300}
                        height={300}
                        alt="404_img"
                        className="transition-all duration-500 hover:scale-105"
                    />
                </div>

                {/* Text content */}
                <h1 className="text-4xl font-bold text-gray-800">Oops!</h1>
                <p className="text-lg text-gray-600">
                    Looks like this page took a creative detour.
                </p>

                {/* Return button */}
                <Link href="/">
                    <Button className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg mt-4">
                        Return to Gallery
                    </Button>
                </Link>
            </div>
        </div>
    );
}
