import {
    authOptions,
    CustomSession,
} from "@/app/api/auth/[...nextauth]/options";
import { fetchClash } from "@/fetch/clashFetch";
import Navbar from "@/components/base/Navbar";
import AddClashItems from "@/components/clash/AddClashItems";
import ViewClashItems from "@/components/clash/ViewClashItems";
import { getServerSession } from "next-auth";
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
    const session: CustomSession | null = await getServerSession(authOptions);
    const clash: ClashType | null = await fetchClash(Number(id));
    return (
        <div className="container">
            <Navbar />
            <div className="mt-4 px-4">
                <h1 className="text-2xl lg:text-4xl font-extrabold">{clash?.title}</h1>
                <p className="text-lg">{clash?.description}</p>
            </div>

            {clash?.ClashItem && clash.ClashItem.length > 0 ? (
                <ViewClashItems clash={clash} />
            ) : (
                <AddClashItems
                    token={session?.user?.token!}
                    clashId={id.toString()}
                />
            )}
        </div>
    );
}