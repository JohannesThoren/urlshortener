import Dialog from "@/components/Dialog";
import client from "../../../../prisma/db";
import DeleteButton from "./DeleteButton";

export default async function AdminList() {
    const admins = (await client.admin.findMany()).reverse();

    return (
        <table className="w-full">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Session Expires</th>
                </tr>
            </thead>
            <tbody className="dark:[&>*:nth-child(even)]:bg-stone-800 [&>*:nth-child(even)]:bg-stone-200 ">
                {admins.map((a) => (
                    <tr key={a.id}>
                        <td className="text-center">{a.id}</td>
                        <td className="text-center">{a.email}</td>
                        <td className="text-center">
                            {a.session_expires.toUTCString()}
                        </td>
                        <td className="flex justify-end gap-1">
                            <Dialog
                                button={
                                    <button className="bg-blue-500 px-1 rounded-md">
                                        Edit
                                    </button>
                                }
                            >
                                <div className="rounded-md p-2 bg-stone-800 w-[10rem] h-[10rem]">
                                    <p>hej</p>
                                </div>
                            </Dialog>
                            <DeleteButton id={a.id}></DeleteButton>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
