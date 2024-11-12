import { redirect } from "next/navigation";
import client from "../../../prisma/db";

export default async function List() {
    let urls = (await client.url.findMany()) || [];

    async function Delete(formData: FormData) {
        "use server";
        let id = formData.get("id")?.toString();
        if (id == undefined) return;
        await client.url.delete({ where: { id: id } });
        redirect("/admin");
    }

    return (
        <table className="w-full">
            <thead className="static">
                <tr>
                    <th>ID</th>
                    <th>Source Url</th>
                    <th>Clicks</th>
                    <th>Created</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody className="[&>*:nth-child(odd)]:bg-stone-800">
                {urls.length > 0 ? (
                    urls.map((u) => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.source}</td>
                            <td>{u.clicks}</td>
                            <td>
                                {u.created ? u.created.toISOString() : "N/A"}
                            </td>
                            <td>{u.email || "N/A"}</td>
                            <td className="flex">
                                <form>
                                    <input
                                        type="text"
                                        name="id"
                                        id="id"
                                        hidden={true}
                                        value={u.id}
                                    />
                                    <input
                                        formAction={Delete}
                                        type="submit"
                                        className="bg-red-500 rounded-md p-1 mx-1"
                                        value={"Delete"}
                                    />
                                </form>
                                <button className="bg-blue-500 rounded-md p-1 mx-1">
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td className="text-center" colSpan={5}>No URL Entries</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}
