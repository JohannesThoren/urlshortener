import { redirect } from "next/navigation";
import client from "../../prisma/db";
import { nanoid } from "nanoid";
import { LogUrlCreated } from "./Event";

export default async function shorten(formData: FormData) {
    "use server";

    const existing_url = await client.url.findUnique({
        where: {
            source: formData.get("url")?.toString() || "",
        },
    });

    if (existing_url != undefined) {
        redirect(`/info/${existing_url.id}`);
    }

    const url = await client.url.create({
        data: {
            id: nanoid(6),
            source: formData.get("url")?.toString() || "",
            email: formData.get("email")?.toString(),
        },
    });

    await LogUrlCreated(url.id, formData.get("email")?.toString());
    redirect(`/info/${url.id}`);
}