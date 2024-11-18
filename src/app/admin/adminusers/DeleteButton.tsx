import client from "../../../../prisma/db";
import { redirect } from "next/navigation";
import Button from "@/components/Button";
import { MdOutlineDelete } from "react-icons/md";
import { ValidateSession } from "@/lib/AdminAuth";
import { LogAdminDeleted, LogUrlDeleted } from "@/lib/Event";

export default function DeleteButton({ id }: { id: number }) {
    async function Delete() {
        "use server";
        const admin = await ValidateSession();
        await client.admin.delete({ where: { id: id } });

        await LogAdminDeleted(id, admin.id);
        redirect("/admin/adminusers");
    }

    return (
        <Button callback={Delete} className="bg-red-500 p-1 rounded-md">
            <MdOutlineDelete />
        </Button>
    );
}
