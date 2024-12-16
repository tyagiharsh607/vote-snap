import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

export default function UserAvatar() {
    return (
        <Avatar>
            <AvatarImage src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQdOUsrQSUk_tOsBHK_K2FSwWNDGwfPPC-vAUMyMiIFmfpQbtkW3WjC4xljQj4zyxVIEHHJydDkGcSLVHQ3NlmfBmeXDH9w-CgyHohU2eg" />
            <AvatarFallback>HT</AvatarFallback>
        </Avatar>
    );
}