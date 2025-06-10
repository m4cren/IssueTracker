import { Issue } from "@/app/generated/prisma";
import { PatchIssueSchema } from "@/app/lib/rules";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../../auth/[...nextauth]/authOptions";

export async function PATCH(request: NextRequest, context: any) {
   const session = await getServerSession(authOptions);

   if (!session)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
   const issueToUpdate: Issue = await request.json();

   const validIssue = PatchIssueSchema.safeParse(issueToUpdate);

   if (!validIssue.success)
      return NextResponse.json(validIssue.error.errors, { status: 400 });

   const { assignToUserId, title, description } = issueToUpdate;

   if (assignToUserId) {
      const user = await prisma.user.findUnique({
         where: {
            id: assignToUserId,
         },
      });

      if (!user)
         return NextResponse.json(
            { message: "User not found" },
            { status: 400 },
         );
   }

   try {
      await prisma.issue.update({
         where: {
            id: parseInt(context.params.id),
         },
         data: {
            title,
            description,
            assignToUserId,
         },
      });
      return NextResponse.json(
         { message: "Success updating the issue" },
         { status: 200 },
      );
   } catch (error) {
      return NextResponse.json(error, { status: 404 });
   }
}
