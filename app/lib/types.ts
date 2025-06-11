import { z } from "zod";
import { IssueSchema } from "./rules";
import { Issue, Status } from "../generated/prisma";

export type IssueFormTypes = z.infer<typeof IssueSchema>;
export type FilterTypes = { label: string; value?: Status };
export type SearchParamsTypes = {
   filterStatus: Status | "All";
   orderBy: keyof Issue;
   page: string;
};
