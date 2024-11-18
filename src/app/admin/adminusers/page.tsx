import { CreateDefaultAdmin, ValidateSession } from "@/lib/AdminAuth";
import AdminList from "./AdminList";
import NewAdminForm from "./NewAdmin";
import ErrorDialog from "@/components/ErrorDialog";

export default async function Page() {
    await CreateDefaultAdmin();
    const admin = await ValidateSession();

    return (
        <div className="w-full h-full flex flex-col">
            <ErrorDialog />
            <NewAdminForm adminId={admin.id} />
            <AdminList />
        </div>
    );
}
