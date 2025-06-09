import { Status } from "@/app/generated/prisma";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, context: any) {
   const body: { currentState: Status } = await request.json();

   try {
      await prisma.issue.update({
         where: {
            id: parseInt(context.params.id),
         },
         data: {
            status:
               body.currentState === "OPEN"
                  ? "IN_PROGRESS"
                  : body.currentState === "IN_PROGRESS"
                    ? "CLOSED"
                    : "CLOSED",
         },
      });
      return NextResponse.json({ message: "Success" }, { status: 200 });
   } catch (error) {
      return NextResponse.json(error, { status: 400 });
   }
}
