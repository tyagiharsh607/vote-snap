import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
    return (
        <div className="w-full h-screen bg-gradient-to-br from-gray-100 to-white p-6">
            {/* Navigation */}


            {/* Main Content - Horizontal Layout */}
            <div className="flex justify-between items-center h-[calc(100vh-120px)]">
                {/* Left Content */}
                <div className="w-1/2 space-y-6 pl-8">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-gray-900 mb-6">
                        VOTE SNAP
                    </h1>
                    <p className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6 text-gray-700">
                        Discover the better choice, together.
                    </p>
                    <Link href="/login">
                        <Button className="text-lg py-3 px-6 rounded-full bg-gray-800 hover:bg-gray-900 text-white transition duration-300 transform hover:scale-105">
                            Start Free
                        </Button>
                    </Link>
                </div>

                {/* Right Content - Image */}
                <div className="w-1/2 h-full flex items-center justify-center">
                    <div className="relative w-[90%] h-[80%] rounded-3xl shadow-lg overflow-hidden">
                        <Image
                            src="/hero.svg"
                            layout="fill"
                            objectFit="cover"
                            alt="Clash Banner"
                            className="transition-transform duration-500 transform hover:scale-105"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
