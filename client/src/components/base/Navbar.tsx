"use client";
import React, { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import LogoutModal from "../auth/LogoutModal";
import Link from "next/link";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <LogoutModal open={open} setOpen={setOpen} />
            <nav className="flex justify-between items-center h-14 p-2 w-full bg-white shadow-md">
                <Link href={"/"}>
                    <h1 className="text-4xl font-extrabold text-gray-900">
                        Vote Snap
                    </h1>
                </Link>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <UserAvatar />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="bottom">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {/* <DropdownMenuItem>Profile</DropdownMenuItem> */}
                        <DropdownMenuItem onClick={() => setOpen(true)}>
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </nav>
        </>
    );
}
