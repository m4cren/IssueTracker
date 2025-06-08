import { z } from "zod";
import { IssueSchema } from "./rules";

export type IssueFormTypes = z.infer<typeof IssueSchema>;
