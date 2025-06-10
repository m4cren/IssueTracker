import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
   const users = await prisma.user.findMany({
      orderBy: {
         name: "asc",
      },
   });

   if (users) {
      return NextResponse.json(users, { status: 200 });
   } else {
      return NextResponse.json(
         { message: "There is no existing users" },
         { status: 400 },
      );
   }
}
