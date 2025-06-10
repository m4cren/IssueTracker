import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
   request: NextRequest,
   { params: { id } }: { params: { id: string } },
): Promise<NextResponse> {
   const issueToDelete = await prisma.issue.findUnique({
      where: {
         id: parseInt(id),
      },
   });

   if (!issueToDelete)
      return NextResponse.json({ message: "Issue not found" }, { status: 404 });
   try {
      await prisma.issue.delete({
         where: {
            id: parseInt(id),
         },
      });

      return NextResponse.json(
         { message: "Success deleting the issue" },
         { status: 200 },
      );
   } catch (error) {
      return NextResponse.json(error, { status: 400 });
   }
}
