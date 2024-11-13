import { ReactNode } from "react";
import client from "../../../../prisma/db";
import { redirect } from "next/navigation";
import Button from "@/components/Button";
import { LogUrlDeleted } from "@/lib/Event";
import { ValidateSession } from "@/lib/AdminAuth";

export default function DeleteButton({
    id,
    className,
    children,
}: {
    id: string;
    className?: string;
    children?: ReactNode;
}) {
    async function Delete() {
        "use server";
        const admin = await ValidateSession()
        await client.url.delete({ where: { id: id } });
        

        await LogUrlDeleted(id, admin.id.toString());
        redirect("/admin/urls");
    }

    return (
        <Button callback={Delete} className={className}>
            {children}
        </Button>
    );
}
