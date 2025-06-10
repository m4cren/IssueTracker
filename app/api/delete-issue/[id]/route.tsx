import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../../auth/[...nextauth]/authOptions";
export async function DELETE(
   request: NextRequest,
   { params: { id } }: { params: { id: string } },
): Promise<NextResponse> {
   const session = await getServerSession(authOptions);

   if (!session)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
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
