"use client";

import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend
} from 'recharts';

interface LineConfig {
    dataKey: string;
    stroke: string;
    name?: string;
}

interface TelemetryChartProps {
    title: string;
    data: any[];
    lines: LineConfig[];
    height?: number;
}

const TelemetryChart: React.FC<TelemetryChartProps> = ({
    title,
    data,
    lines,
    height = 300
}) => {
    return (
        <div className="w-full bg-slate-900/50 rounded-xl border border-slate-800 p-4 flex flex-col">
            <h3 className="text-slate-400 text-sm font-semibold mb-4 uppercase tracking-wider">
                {title}
            </h3>
            <div style={{ width: '100%', height: height }}>
                <ResponsiveContainer>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis
                            dataKey="time"
                            stroke="#64748b"
                            tick={{ fill: '#64748b', fontSize: 12 }}
                            tickLine={false}
                            axisLine={false}
                            padding={{ left: 10, right: 10 }}
                        />
                        <YAxis
                            stroke="#64748b"
                            tick={{ fill: '#64748b', fontSize: 12 }}
                            tickLine={false}
                            axisLine={false}
                            domain={['auto', 'auto']}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#0f172a',
                                border: '1px solid #1e293b',
                                borderRadius: '8px',
                                color: '#f8fafc'
                            }}
                            itemStyle={{ fontSize: '12px' }}
                            labelStyle={{ color: '#94a3b8', marginBottom: '0.5rem' }}
                        />
                        <Legend wrapperStyle={{ paddingTop: '10px' }} />
                        {lines.map((line) => (
                            <Line
                                key={line.dataKey}
                                type="monotone"
                                dataKey={line.dataKey}
                                stroke={line.stroke}
                                name={line.name || line.dataKey}
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: 4, strokeWidth: 0 }}
                                isAnimationActive={false} // Disable animation for better performance with real-time updates
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TelemetryChart;
