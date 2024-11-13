import { CreateDefaultAdmin, ValidateSession } from "@/lib/AdminAuth";

export default async function Page() {
    await CreateDefaultAdmin();
    await ValidateSession();

    return (
        <>
            
        </>
    );
}
