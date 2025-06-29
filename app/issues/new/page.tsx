"use client";
import React from "react";

import dynamic from "next/dynamic";
import IssueFormSkeleton from "../_components/IssueFormSkeleton";

const IssueForm = dynamic(() => import("../_components/IssueForm"), {
   ssr: false,
   loading: () => <IssueFormSkeleton />,
});

const NewIssueForm = () => {
   return <IssueForm />;
};

export default NewIssueForm;
