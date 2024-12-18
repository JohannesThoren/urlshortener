import client from "../../prisma/db";

export enum EventType {
    URL_CREATED,
    URL_DELETED,
    URL_USED,
    ADMIN_LOGIN,
    ADMIN_ACCOUNT_CREATED,
    ADMIN_ACCOUNT_DELETED,
}

export function EventTypeToString(type: EventType): string {
    return EventType[type]
}

async function LogEvent(type: EventType, data: string, by?: string) {
    await client.event.create({
        data: {
            /* eslint-disable camelcase */
            event_type: EventTypeToString(type),
            /* eslint-disable camelcase */
            event_data: data,
            by: by
        }
    })
}

export async function LogUrlUsed(id: string) {
    await LogEvent(EventType.URL_USED, id, "USER")
}


export async function LogUrlCreated(source: string, by?: string | null) {
    if (source != "") await LogEvent(EventType.URL_CREATED, source, by || "USER")
}

export async function LogUrlDeleted(id: string, by: string) {
    await LogEvent(EventType.URL_DELETED, id, by)
}

export async function LogAdminLogin(id: string) {
    await LogEvent(EventType.ADMIN_LOGIN, id, "ADMIN")
}

export async function LogAdminCreated(newAdminId: number, byId: number) {
    await LogEvent(EventType.ADMIN_ACCOUNT_CREATED, newAdminId.toString(), byId.toString())
}

export async function LogAdminDeleted(deletedAdminId: number, byId: number) {
    await LogEvent(EventType.ADMIN_ACCOUNT_DELETED, deletedAdminId.toString(), byId.toString())

}
