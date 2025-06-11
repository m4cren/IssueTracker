import { z } from "zod";
import { IssueSchema } from "./rules";
import { Status } from "../generated/prisma";

export type IssueFormTypes = z.infer<typeof IssueSchema>;
export type FilterTypes = { label: string; value?: Status };
