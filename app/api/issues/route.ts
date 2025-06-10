import { IssueSchema } from "@/app/lib/rules";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "../auth/[...nextauth]/authOptions";

export async function POST(request: NextRequest) {
   const session = await getServerSession(authOptions);

   if (!session)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

   const body: { title: string; description: string } = await request.json();
   const validBody = IssueSchema.safeParse(body);

   if (!validBody.success) {
      return NextResponse.json(validBody.error.errors, { status: 400 });
   } else {
      const newIssue = await prisma.issue.create({
         data: {
            title: body.title,
            description: body.description,
         },
      });

      return NextResponse.json(newIssue, { status: 201 });
   }
}
