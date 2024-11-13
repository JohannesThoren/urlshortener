"use server"

import { redirect } from "next/navigation";
import client from "../../../../prisma/db";

export async function Delete(id: string) {
    "use server";
    await client.url.delete({ where: { id: id } });
    redirect("/admin");
}