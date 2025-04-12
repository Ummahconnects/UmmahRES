
import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface SignupChartProps {
  dateRange: "7d" | "30d" | "90d" | "all";
}

const SignupChart = ({ dateRange }: SignupChartProps) => {
  // This would normally be fetched from an API based on the date range
  const getDemoData = () => {
    switch (dateRange) {
      case "7d":
        return [
          { name: "Mon", businessSignups: 12, betaSignups: 6 },
          { name: "Tue", businessSignups: 18, betaSignups: 9 },
          { name: "Wed", businessSignups: 15, betaSignups: 7 },
          { name: "Thu", businessSignups: 20, betaSignups: 10 },
          { name: "Fri", businessSignups: 25, betaSignups: 15 },
          { name: "Sat", businessSignups: 14, betaSignups: 8 },
          { name: "Sun", businessSignups: 10, betaSignups: 5 }
        ];
      case "30d":
        return [
          { name: "Week 1", businessSignups: 80, betaSignups: 45 },
          { name: "Week 2", businessSignups: 95, betaSignups: 55 },
          { name: "Week 3", businessSignups: 110, betaSignups: 65 },
          { name: "Week 4", businessSignups: 125, betaSignups: 75 }
        ];
      case "90d":
        return [
          { name: "Jan", businessSignups: 250, betaSignups: 150 },
          { name: "Feb", businessSignups: 320, betaSignups: 200 },
          { name: "Mar", businessSignups: 380, betaSignups: 220 }
        ];
      case "all":
        return [
          { name: "Q1", businessSignups: 650, betaSignups: 380 },
          { name: "Q2", businessSignups: 780, betaSignups: 450 },
          { name: "Q3", businessSignups: 920, betaSignups: 510 },
          { name: "Q4", businessSignups: 1050, betaSignups: 590 }
        ];
      default:
        return [];
    }
  };

  const data = getDemoData();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorBusinessSignups" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22C55E" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorBetaSignups" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FFA500" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#FFA500" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="businessSignups"
          stroke="#22C55E"
          fillOpacity={1}
          fill="url(#colorBusinessSignups)"
          name="Total Signups"
        />
        <Area
          type="monotone"
          dataKey="betaSignups"
          stroke="#FFA500"
          fillOpacity={1}
          fill="url(#colorBetaSignups)"
          name="Beta Signups"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default SignupChart;
