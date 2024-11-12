import { redirect } from "next/navigation";
import client from "../../../prisma/db";

export default async function List() {
    let urls = await client.url.findMany();

    async function Delete(formData: FormData) {
        "use server";
        let id = formData.get("id")?.toString();
        if (id == undefined) return;
        await client.url.delete({ where: { id: id } });
        redirect("/admin");
    }

    return (
        <div className="w-full dark:bg-stone-800 bg-stone-200 rounded-sm h-[50dvh]">
            <div className="dark:bg-stone-700 bg-stone-300 flex justify-between p-2 rounded-md h-[5dvh] items-center">
                <div className="w-[10%] text-center">id</div>
                <div className="w-[40%] text-center">source</div>
                <div className="w-[10%] text-center">clicks</div>
                <div className="w-[20%] text-center">created</div>
                <div className="w-[10%] text-center">email</div>
                <div className="w-[10%] text-center"></div>
            </div>
            <div className="h-[40dvh] max-h-[40dvh] overflow-auto">
                {urls.map((u) => (
                    <div
                        key={u.id}
                        className="flex w-full p-2 justify-between items-center "
                    >
                        <div className="w-[10%] text-center">{u.id}</div>
                        <div className="w-[40%] text-center overflow-x-scroll">
                            {u.source}
                        </div>
                        <div className="w-[10%] text-center">{u.clicks}</div>
                        <div className="w-[20%] text-center">
                            {u.created.toDateString()}
                        </div>
                        <div className="w-[10%] text-center">
                            {u.email || "No email"}
                        </div>
                        <form className="w-[10%] text-center" action={Delete}>
                            <input
                                type="text"
                                className="hidden"
                                value={u.id}
                                name="id"
                                id="id"
                            />
                            <button className="bg-red-500 rounded-md p-2">
                                Delete
                            </button>
                        </form>
                    </div>
                ))}
            </div>
        </div>
    );
}
