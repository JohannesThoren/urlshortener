import { CreateDefaultAdmin, ValidateSession } from "@/lib/AdminAuth";
import UrlList from "./UrlList"

export default async function Page() {
    await CreateDefaultAdmin()
    let user = await ValidateSession();



    return (
        <div className="w-full h-full flex flex-col">
            <UrlList/>
        </div>
    );
}
