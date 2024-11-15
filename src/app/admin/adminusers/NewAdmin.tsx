import Dialog from "@/components/Dialog";
import Form from "@/components/Form";
import Input from "@/components/Input";
import Submit from "@/components/Submit";
import { NewAdmin } from "@/lib/AdminAuth";
import { redirect } from "next/navigation";

export default async function NewAdminForm() {
    async function CreateAdmin(formData: FormData) {
        "use server";
        const email = formData.get("email")?.toString();
        if (email == undefined)
            redirect("/admin/adminusers?error=Invalid email provided");

        const password = formData.get("password")?.toString();
        if (password == undefined)
            redirect("/admin/adminusers?error=Ivalid password provided");

        const new_admin = await NewAdmin(email, password);
        redirect("/admin/adminusers?reload=true");
    }

    return (
        <Dialog
            children={
                <div className="justify-center items-center flex flex-col w-full h-full">
                    <h2 className="text-2xl">New Admin Account</h2>
                    <Form action={CreateAdmin}>
                        <div>
                            <label htmlFor="email">Email</label>
                            <br />
                            <Input
                                type="email"
                                name="email"
                                placeholder="example@example.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <br />
                            <Input
                                type="password"
                                name="password"
                                placeholder="Password"
                            />
                        </div>
                        <div>
                            <Submit value={"Create Admin Account"} />
                        </div>
                    </Form>
                </div>
            }
            button={
                <button className="bg-blue-500 rounded-md p-1">
                    New Admin Account
                </button>
            }
        ></Dialog>
    );
}
