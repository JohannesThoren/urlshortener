import ErrorMessage from "@/components/ErrorMesssage";
import { AuthAdmin } from "@/lib/AdminAuth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default function LoginForm() {
    async function signin(formData: FormData) {
        "use server";
        const email = formData.get("email")?.toString();
        const password = formData.get("password")?.toString();
        if (email == undefined || password == undefined) return;

        if (await AuthAdmin(email, password)) redirect("/admin");
    }

    return (
        <form
            action={signin}
            className="grid gap-2 w-full [&>input]:w-full md:w-[40dvw] lg:w-[20dvw]"
        >
            <Suspense fallback={"Loading"}>
                <ErrorMessage />
            </Suspense>

            <input
                name="email"
                type="email"
                className="px-3 py-1 rounded-md dark:text-stone-900"
                placeholder="E-Mail"
            />
            <input
                name="password"
                type="password"
                className="px-3 py-1 rounded-md dark:text-stone-900"
                placeholder="Password"
            />
            <input
                type="submit"
                value={"signin"}
                className="px-3 py-1 rounded-md bg-stone-300 dark:bg-stone-800 hover:cursor-pointer"
            />
        </form>
    );
}
