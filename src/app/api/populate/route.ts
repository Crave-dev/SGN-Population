import { db } from "@/db";
import { populations } from "@/db/schema";
import { and, inArray, desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

const representCountry = ['World', 'China', 'India', 'United States', 'Russia', 'Japan', 'Indonesia', 'Germany', 'Brazil', 'United Kingdom', 'Italy', 'France', 'Bangladesh']

export async function GET(req: NextRequest) {
    try {
        const target = req.nextUrl.searchParams.get('year')
        if (!req.nextUrl.searchParams.has('year') || !Number(target)) {
            throw Error('You are not provide year param.')
        }

        const representation = req.nextUrl.searchParams.has('type') && req.nextUrl.searchParams.get('type') === 'represent'

        const filter = representation ? and(eq(populations.year, Number(target)), inArray(populations.country_name, representCountry)) : eq(populations.year, Number(target))
        const res = await db
            .select({
                id: populations.id,
                year: populations.year,
                population: populations.population,
                country_name: populations.country_name,
            })
            .from(populations)
            .where(filter)
            .orderBy(desc(populations.population))

        return NextResponse.json(res)
    } catch(err) {
        console.error(err)
        return NextResponse.error()
    }
}