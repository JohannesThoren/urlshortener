import shorten from "@/lib/Url";

export default function UrlForm() {
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
