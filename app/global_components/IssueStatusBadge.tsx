import { Badge } from "@radix-ui/themes";
import { Status } from "../generated/prisma";

const statusMap: Record<
   Status,
   { color: "red" | "violet" | "green"; label: string }
> = {
   OPEN: { color: "red", label: "Open" },
   IN_PROGRESS: { color: "violet", label: "In Progress" },
   CLOSED: { color: "green", label: "Closed" },
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
   return (
      <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
   );
};

export default IssueStatusBadge;
