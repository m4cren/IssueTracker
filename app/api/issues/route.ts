import { IssueSchema } from "@/app/lib/rules";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function POST(request: NextRequest) {
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
