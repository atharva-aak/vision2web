
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/configs/db";
import { usersTable } from "@/configs/schema";

export async function POST(req: NextRequest) {
    const { userEmail, userName } = await req.json();
    console.log(userEmail)
    // try {
    const result = await db.select().from(usersTable)
        .where(eq(usersTable.email, userEmail));

    if (result?.length == 0) {

        const result: any = await db.insert(usersTable).values({
            name: userName,
            email: userEmail,
            credits: 10,
            // @ts-ignore
        }).returning(usersTable);

        return NextResponse.json(result[0]);
    }
    return NextResponse.json(result[0]);


    // } catch (e) {
    //     return NextResponse.json(e)
    // }
}

export async function GET(req: Request) {
    const reqUrl = req.url;
    const { searchParams } = new URL(reqUrl);
    const email = searchParams?.get('email');

    if (email) {
        const result = await db.select().from(usersTable)
            .where(eq(usersTable.email, email));
        return NextResponse.json(result[0]);
    }
}