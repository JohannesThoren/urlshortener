import { cookies } from "next/headers";
import client from "../../prisma/db";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";
import { compare, hashSync, genSaltSync, genSalt, hash } from "bcrypt";
import { LogAdminLogin } from "./Event";

const ADMIN_LOGIN_ROUTE = "/admin/login";
const ADMIN_NOT_FOUND_ERROR =
    "A user with that email or password was not found or is inactive";

export async function ValidateSession() {
    const session = cookies().get("session");
    if (!session) redirect(ADMIN_LOGIN_ROUTE);

    const admin = await client.admin.findUnique({
        where: { session: session.value },
    });

    if (!admin || !admin.active)
        redirect(ADMIN_LOGIN_ROUTE + "?error=" + ADMIN_NOT_FOUND_ERROR);

    if (admin.session_expires.getTime() < Date.now()) {
        client.admin.update({
            where: { session: session.value },
            data: { session: nanoid(128) },
        });
        redirect(ADMIN_LOGIN_ROUTE);
    }

    return admin;
}

export async function AuthAdmin(email: string, password: string) {
    const admin = await client.admin.findUnique({
        where: { email: email },
    });

    console.log(admin)

    if (!admin || !admin.active)
        redirect(ADMIN_LOGIN_ROUTE + "?error=" + ADMIN_NOT_FOUND_ERROR);

    const hash = admin.passwordHash;
    console.log(hash)

    console.log(password, password.length)

    const result = await compare(password, hash)
    console.log(result)

    if (result) {
        console.log("logging in admin")
        await CreateSessionToken(admin.id)
        await LogAdminLogin(admin.id.toString())
        return true;
    }

    redirect(ADMIN_LOGIN_ROUTE + "?error=" + ADMIN_NOT_FOUND_ERROR);
}

export async function CreateSessionToken(id: number) {
    const token = nanoid(128);
    const expires = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

    await client.admin.update({
        where: {
            id: id,
        },
        data: {
            session: token,

            // eslint-disable-next-line camelcase
            session_expires: expires,
        },
    });

    cookies().set("session", token, { expires: expires });
}

export async function CreateDefaultAdmin() {
    const admins = await client.admin.findMany();
    if (admins.length > 0) return;
    // eslint-disable-next-line camelcase
    const existing_admin = await client.admin.findFirst({
        where: {
            email: process.env.DEFAULT_ADMIN_EMAIL
        }
    })
    // eslint-disable-next-line camelcase
    if (existing_admin != null) return


    const salt = genSaltSync();
    const passwordHash = hashSync(
        process.env.DEFAULT_ADMIN_PASSWORD || "password",
        salt
    );
    await client.admin.create({
        data: {
            email: process.env.DEFAULT_ADMIN_EMAIL || "admin@example.com",
            passwordHash: passwordHash,
            session: nanoid(128),
            // eslint-disable-next-line camelcase
            session_expires: new Date(),
        },
    });

    console.log(
        `Default admin email = '${process.env.DEFAULT_ADMIN_EMAIL || "admin@example.com"
        }', password = '${process.env.DEFAULT_ADMIN_PASSWORD || "password"}'`
    );
}


export async function NewAdmin(email: string, password: string) {

    const salt = await genSalt();
    const passwordHash = await hash(password, salt)

    console.log(passwordHash)
    // eslint-disable-next-line camelcase
    const newAdmin = await client.admin.create({
        data: {
            email: email,
            passwordHash: passwordHash,
            session: nanoid(128),
            // eslint-disable-next-line camelcase
            session_expires: new Date(),
        },
    });
    // eslint-disable-next-line camelcase
    return newAdmin

}