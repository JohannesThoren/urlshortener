import client from "../../../../prisma/db";
import { redirect } from "next/navigation";
import Button from "@/components/Button";
import { LogUrlDeleted } from "@/lib/Event";
import { ValidateSession } from "@/lib/AdminAuth";
import { MdOutlineDelete } from "react-icons/md";

export default function DeleteButton({ id }: { id: string }) {
    async function Delete() {
        "use server";
        const admin = await ValidateSession();
        await client.url.delete({ where: { id: id } });

        await LogUrlDeleted(id, admin.id.toString());
        redirect("/admin/urls");
    }

    return (
        <Button callback={Delete} className="bg-red-500 p-1 rounded-md">
            <MdOutlineDelete />
        </Button>
    );
}
