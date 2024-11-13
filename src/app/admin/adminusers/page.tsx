import { CreateDefaultAdmin, ValidateSession } from "@/lib/AdminAuth";
import Link from "next/link";

export default async function Page() {
    await CreateDefaultAdmin();
    let user = await ValidateSession();

    return (
        <>
            
        </>
    );
}
