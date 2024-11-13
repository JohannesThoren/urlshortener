import { CreateDefaultAdmin, ValidateSession } from "@/lib/AdminAuth";
import Link from "next/link";
import client from "../../../prisma/db";

export default async function Page() {
    await CreateDefaultAdmin();
    let user = await ValidateSession();

    let events = (await client.event.findMany({orderBy: {time_stamp: "desc"}, take: 25}));

    let urls = await client.url.findMany();
    return (
        <>
            <nav className="absolute w-full flex gap-1 top-0 left-0 p-1">
                <Link href={"admin/urls"}>Urls</Link>
                <p>|</p>
                <Link href={"admin/adminusers"}>Admin Users</Link>
                <p>|</p>
                <Link href={"admin/events"}>Events</Link>

            </nav>
            <div className="bg-stone-800 w-1/2 h-1/2 flex flex-col p-2">
                <h2 className="text-xl">Information</h2>
                <p>Total Urls: {urls.length}</p>
            </div>
        </>
    );
}
