"use server"

import { shorten } from "@/lib/Url";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const url = searchParams.get('url')

    if (url == undefined) return new NextResponse(`url parameter is invalid`, { status: 400 })
    const email = searchParams.get('email')

    const urlId = await shorten(url, email)

    return new NextResponse(`${process.env.SHORT_ROOT_URL}/u/${urlId}`, { status: 200 })
}