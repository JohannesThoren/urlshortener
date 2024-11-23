import { redirect } from "next/navigation";
import client from "../../prisma/db";
import { nanoid } from "nanoid";
import { LogUrlCreated } from "./Event";

export async function shorten(sourceUrl: string, email?: string | null): Promise<string> {
    "use server";

    const existingUrl = await client.url.findUnique({
        where: {
            source: sourceUrl,
        },
    });

    if (existingUrl != undefined) {
        return existingUrl.id
    }

    const url = await client.url.create({
        data: {
            id: nanoid(6),
            source: sourceUrl,
            email: email,
        },
    });

    await LogUrlCreated(url.id, email);
    return url.id
}

export async function shortenAndRedirect(sourceUrl: string, email?: string | null) {
    "use server";
    const urlId = await shorten(sourceUrl, email)
    redirect(`/info/${urlId}`);
}