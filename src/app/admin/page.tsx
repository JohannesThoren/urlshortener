import { CreateDefaultAdmin, ValidateSession } from "@/lib/admin_auth";
import List from "./List";

export default async function Page() {
    await CreateDefaultAdmin()
    let user = await ValidateSession();



    return (
        <div className="w-full h-full flex flex-col">
            <List/>
        </div>
    );
}
