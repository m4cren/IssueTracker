"use client";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { DashboardDataTypes } from "./lib/types";
import { Card } from "@radix-ui/themes";

const IssueChart = ({
   dataPackage: { closed, inProgress, open },
}: {
   dataPackage: DashboardDataTypes;
}) => {
   const chartData: { label: string; value: number }[] = [
      {
         label: "Open",
         value: open,
      },
      {
         label: "In progress",
         value: inProgress,
      },
      {
         label: "Closed",
         value: closed,
      },
   ];
   return (
      <Card>
         <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
               <XAxis dataKey="label" />
               <YAxis />

               <Bar
                  dataKey="value"
                  barSize={60}
                  style={{ fill: "var(--accent-9" }}
               />
            </BarChart>
         </ResponsiveContainer>
      </Card>
   );
};

export default IssueChart;
