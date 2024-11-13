import { notFound } from "next/navigation";
import client from "../../../../prisma/db";
import Redirect from "@/app/u/[id]/Redirect";
import { LogUrlUsed } from "@/lib/Event";

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    const url = await client.url.findUnique({ where: { id: id } });
    if (!url) notFound();

    const source = url.source;

    await client.url.update({
        where: { id: id },
        data: { clicks: url.clicks + 1 },
    });

    LogUrlUsed(url.id);

    return (
        <div className="grid place-items-center h-full">
            <Redirect url={source} />
        </div>
    );
}
