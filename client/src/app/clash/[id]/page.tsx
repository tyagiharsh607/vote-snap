import { fetchClash, fetchClashes } from "@/fetch/clashFetch";
import Navbar from "@/components/base/Navbar";
import Clashing from "@/components/clash/Clashing";
import { checkDateExpiry } from "@/lib/utils";
import { notFound } from "next/navigation";
import React from "react";



export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const clash = await fetchClash(Number(id));

    return {
        title: clash.title,
    }
}

export default async function clashItems({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const clash: ClashType | null = await fetchClash(Number(id));

    if (!clash) return notFound();
    if (checkDateExpiry(clash.expire_at)) {
        return notFound();
    }
    return (
        <div className="container">
            <Navbar />
            <div className="mt-4 p-5">
                <h1 className="text-2xl lg:text-4xl font-extrabold">{clash?.title}</h1>
                <p className="text-lg">{clash?.description}</p>
            </div>

            <Clashing clash={clash!} />
        </div>
    );
}