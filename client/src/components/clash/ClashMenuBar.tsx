"use client";
import React, { Suspense, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import DeleteClash from "./DeleteClash";
import dynamic from "next/dynamic";
import Env from "@/lib/env";
import { toast } from "sonner";

const EditClash = dynamic(() => import("./EditClash"));

export default function ClashMenuBar({
    clash,
    token,
}: {
    clash: ClashType;
    token: string;
}) {
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);

    const handleCopy = () => {
        navigator.clipboard?.writeText(`${Env.APP_URL}/clash/${clash.id}`);
        toast.success("Link copied successfully!");
    };

    return (
        <>
            <DeleteClash open={open} setOpen={setOpen} token={token} id={clash.id} />

            <Suspense fallback={<p className="text-sm text-gray-500">Loading...</p>}>
                {editOpen && (
                    <EditClash
                        token={token}
                        open={editOpen}
                        setOpen={setEditOpen}
                        clash={clash}
                    />
                )}
            </Suspense>

            <DropdownMenu>
                <DropdownMenuTrigger className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-150">
                    <EllipsisVertical className="text-gray-600" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white shadow-lg rounded-md border border-gray-200 p-2 w-40">
                    <DropdownMenuItem
                        onClick={() => setEditOpen(true)}
                        className="p-2 rounded hover:bg-gray-100 text-gray-700 cursor-pointer"
                    >
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={handleCopy}
                        className="p-2 rounded hover:bg-gray-100 text-gray-700 cursor-pointer"
                    >
                        Copy Link
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => setOpen(true)}
                        className="p-2 rounded hover:bg-gray-100 text-red-600 cursor-pointer"
                    >
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
