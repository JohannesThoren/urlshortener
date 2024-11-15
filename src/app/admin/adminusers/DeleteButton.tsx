import { ReactNode } from "react";
import client from "../../../../prisma/db";
import { redirect } from "next/navigation";
import Button from "@/components/Button";
import { LogUrlDeleted } from "@/lib/Event";
import { ValidateSession } from "@/lib/AdminAuth";
import { MdOutlineDelete } from "react-icons/md";

export default function DeleteButton({ id }: { id: number }) {
    async function Delete() {
        "use server";
        await client.admin.delete({ where: { id: id } });

        redirect("/admin/adminusers");
    }

    return (
        <Button callback={Delete} className="bg-red-500 p-1 rounded-md">
            <MdOutlineDelete />
        </Button>
    );
}
