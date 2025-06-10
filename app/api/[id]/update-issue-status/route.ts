import { Status } from "@/app/generated/prisma";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../../auth/[...nextauth]/authOptions";

export async function PATCH(request: NextRequest, context: any) {
   const session = await getServerSession(authOptions);

   if (!session)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
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
