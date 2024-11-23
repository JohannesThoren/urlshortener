import { ValidateSession } from "@/lib/AdminAuth";
import client from "../../../../../../prisma/db";
import { redirect } from "next/navigation";
import { EventType, EventTypeToString } from "@/lib/Event";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("../Chart"), { ssr: false });

function CountDate(
    events: {
        id: number;
        event_type: string;
        event_data: string;
        by: string;
        time_stamp: Date;
    }[]
): {
    key: string;
    value: number;
}[] {
    const map = new Map();

    events.forEach((e) => {
        const date = new Date(e.time_stamp.toUTCString()).toLocaleDateString();

        map.set(date, map.get(date) == undefined ? 1 : map.get(date) + 1);
    });

    const data = Array.from(map, ([key, value]) => ({ key, value }));

    return data;
}

export default async function Page({ params }: { params: { id: string } }) {
    await ValidateSession();
    const { id } = params;
    if (id == undefined) redirect("/admin");
    const events = await client.event.findMany({
        where: {
            // eslint-disable-next-line camelcase
            event_data: id,
            // eslint-disable-next-line camelcase
            event_type: EventTypeToString(EventType.URL_USED),
        },
    });

    const data = CountDate(events);

    return (
        <div className="w-1/2 h-full">
            <Chart data={data} />

        </div>
    );
}
