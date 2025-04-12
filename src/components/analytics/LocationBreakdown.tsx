
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface LocationBreakdownProps {
  dateRange: "7d" | "30d" | "90d" | "all";
  type: "country" | "city";
}

const COLORS = ['#22C55E', '#3B82F6', '#EC4899', '#F59E0B', '#8B5CF6', '#10B981', '#EF4444', '#6366F1'];

const LocationBreakdown = ({ dateRange, type }: LocationBreakdownProps) => {
  // This would normally be fetched from an API based on the date range and type
  const getLocationData = () => {
    if (type === "country") {
      return [
        { name: "United Kingdom", value: 245 },
        { name: "United States", value: 210 },
        { name: "UAE", value: 175 },
        { name: "Malaysia", value: 150 },
        { name: "Canada", value: 125 },
        { name: "Australia", value: 95 },
        { name: "Pakistan", value: 85 },
        { name: "Other", value: 199 }
      ];
    } else {
      return [
        { name: "London", value: 145 },
        { name: "New York", value: 95 },
        { name: "Dubai", value: 90 },
        { name: "Kuala Lumpur", value: 85 },
        { name: "Toronto", value: 75 },
        { name: "Sydney", value: 65 },
        { name: "Lahore", value: 45 },
        { name: "Other", value: 684 }
      ];
    }
  };

  const data = getLocationData();

  return (
    <div className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value} signups`, `${type === "country" ? "Country" : "City"}`]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LocationBreakdown;
