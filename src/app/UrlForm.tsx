import { LogUrlCreated } from "@/lib/Event";
import client from "../../prisma/db";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";

export default function UrlForm() {
    async function shorten(formData: FormData) {
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

    return (
        <form
            className="grid gap-2 w-full [&>input]:w-full md:w-4/6 lg:w-1/2"
            action={shorten}
        >
            <input
                name="url"
                id="url"
                type="url"
                placeholder="http://..."
                className="w-[40dvw] px-3 py-1 rounded-md dark:text-stone-900"
                required={true}
            />
            <input
                type="email"
                className="w-[40dvw] px-3 py-1 rounded-md dark:text-stone-900"
                name="email"
                id="email"
                placeholder="example@web.com"
            />
            <input
                type="submit"
                value={"Shorten"}
                className="px-3 py-1 rounded-md bg-stone-300 dark:bg-stone-800 hover:cursor-pointer"
            />
        </form>
    );
}
