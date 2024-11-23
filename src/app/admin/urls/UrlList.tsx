import client from "../../../../prisma/db";
import { MdOutlineStackedBarChart } from "react-icons/md";
import DeleteButton from "./DeleteButton";
import Link from "next/link";

export default async function UrlList() {
    let urls = (await client.url.findMany()) || [];
    urls = urls.sort((a, b) => {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
    });

    return (
        <table className="w-full">
            <thead className="static">
                <tr>
                    <th>ID</th>
                    <th className="w-1/2">Source Url</th>
                    <th>Clicks</th>
                    <th>Created</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody className="dark:[&>*:nth-child(even)]:bg-stone-800 [&>*:nth-child(even)]:bg-stone-200 w-full">
                {urls.length > 0 ? (
                    urls.map((u) => (
                        <tr key={u.id}>
                            <td className="text-center">{u.id}</td>
                            <td className="h-full flex" title={u.source}>
                                <div className="h-full truncate w-0 flex-grow">
                                    {u.source}
                                </div>
                            </td>
                            <td className="text-center">{u.clicks}</td>
                            <td className="text-center">
                                {u.created ? u.created.toUTCString() : "N/A"}
                            </td>
                            <td className="text-center">{u.email || "N/A"}</td>
                            <td>
                                <div className="flex justify-end items-center gap-1">
                                    <Link
                                        href={"/admin/urls/stats/" + u.id}
                                        className="bg-blue-500 p-1 rounded-md"
                                    >
                                        <MdOutlineStackedBarChart />
                                    </Link>

                                    <DeleteButton id={u.id} />
                                </div>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td className="text-center" colSpan={5}>
                            No URL Entries
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}
