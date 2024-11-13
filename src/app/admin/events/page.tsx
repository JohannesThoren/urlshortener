import { CreateDefaultAdmin, ValidateSession } from "@/lib/AdminAuth";
import EventList from "./EventList"

export default async function Page() {
    await CreateDefaultAdmin()
    await ValidateSession();



    return (
        <div className="w-full h-full flex flex-col">
            <EventList/>
        </div>
    );
}
