import { CreateDefaultAdmin, ValidateSession } from "@/lib/AdminAuth";
import AdminList from "./AdminList";
import Dialog from "@/components/Dialog";
import NewAdminForm from "./NewAdmin";
import ErrorDialog from "@/components/ErrorDialog";

export default async function Page() {
    await CreateDefaultAdmin();
    await ValidateSession();

    return (
        <div className="w-full h-full flex flex-col">
            <ErrorDialog/>
            <NewAdminForm />
            <AdminList />
        </div>
    );
}
