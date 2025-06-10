import { Issue } from "@/app/generated/prisma";
import { IssueSchema } from "@/app/lib/rules";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../../auth/[...nextauth]/authOptions";

export async function PATCH(request: NextRequest, context: any) {
   const session = await getServerSession(authOptions);

   if (!session)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
   const issueToUpdate: Issue = await request.json();

   const validIssue = IssueSchema.safeParse(issueToUpdate);

   if (!validIssue.success)
      return NextResponse.json(validIssue.error.errors, { status: 400 });

   try {
      await prisma.issue.update({
         where: {
            id: parseInt(context.params.id),
         },
         data: {
            title: issueToUpdate.title,
            description: issueToUpdate.description,
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
