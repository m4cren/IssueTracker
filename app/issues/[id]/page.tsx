import React, { FC } from "react";
import IssueForm from "@/app/issues/_components/IssueForm";
import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";

const EditIssueForm: FC<{ params: { id: string } }> = async (props) => {
   const issue = await prisma.issue.findUnique({
      where: {
         id: parseInt(props.params.id),
      },
   });

   if (!issue) notFound();

   return <IssueForm issue={issue} />;
};

export default EditIssueForm;
