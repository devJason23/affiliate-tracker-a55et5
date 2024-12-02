'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { format } from 'date-fns'

export default function RevenueChart({ data }: { data: any[] }) {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tickFormatter={(date) => format(new Date(date), 'MMM d')}
          />
          <YAxis />
          <Tooltip 
            formatter={(value: number) => [`$${value}`, 'Revenue']}
            labelFormatter={(date) => format(new Date(date), 'MMM d, yyyy')}
          />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#4F46E5"
            fill="#4F46E5"
            fillOpacity={0.1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
