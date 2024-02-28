import { db } from "@/db";
import { populations } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const res = await db.select().from(populations)
        return NextResponse.json(res)
    } catch(err) {
        console.error(err)
        return NextResponse.error()
    }
}