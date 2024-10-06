import { redirect } from "next/navigation";
import client from "../../../../prisma/db";
import Redirect from "@/app/components/Redirect";

export default async function ({ params }: any) {
    const { id } = params;
    const url = await (async () => {
        return client.url.findUnique({ where: { id: id } });
    })();

    let source = url?.source!;

    await client.url.update({
        where: { id: id },
        data: { clicks: url?.clicks! + 1 },
    });

    return (
        <div className="grid place-items-center h-screen">
            <Redirect url={source} />
        </div>
    );
}
