import client from "../../../../prisma/db";

export default async function EventList() {
    let events = await (await client.event.findMany()).reverse();

    return (
        <table className="w-full">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Event Type</th>
                    <th>Data</th>
                    <th>By</th>
                    <th>Time Stamp</th>
                </tr>
            </thead>
            <tbody className="[&>*:nth-child(even)]:bg-stone-700">
                {events.map((e) => (
                    <tr key={e.id}>
                        <td className="text-center">{e.id}</td>
                        <td className="text-center">{e.event_type}</td>
                        <td className="text-center">{e.event_data}</td>
                        <td className="text-center">{e.by}</td>
                        <td className="text-center">
                            {e.time_stamp.toUTCString()}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
