import React from 'react';
import clsx from 'clsx';

type Status = 'normal' | 'warning' | 'critical';

interface MetricCardProps {
    label: string;
    value: string | number;
    unit: string;
    status?: Status;
}

const MetricCard: React.FC<MetricCardProps> = ({
    label,
    value,
    unit,
    status = 'normal'
}) => {
    return (
        <div className={clsx(
            "rounded-xl p-4 border transition-all duration-300 flex flex-col justify-between h-32 select-none",
            {
                'bg-emerald-900/10 border-emerald-500/30': status === 'normal',
                'bg-amber-900/10 border-amber-500/30': status === 'warning',
                'bg-red-900/20 border-red-500/40': status === 'critical',
            }
        )}>
            <div className="flex justify-between items-start">
                <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{label}</span>
                <div className={clsx(
                    "w-2 h-2 rounded-full",
                    {
                        'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]': status === 'normal',
                        'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]': status === 'warning',
                        'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]': status === 'critical',
                    }
                )} />
            </div>

            <div className="flex items-baseline gap-1 mt-2">
                <span className={clsx(
                    "text-4xl font-bold tracking-tighter",
                    {
                        'text-emerald-50': status === 'normal',
                        'text-amber-50': status === 'warning',
                        'text-red-50': status === 'critical',
                    }
                )}>
                    {value}
                </span>
                <span className="text-slate-500 text-sm font-medium">{unit}</span>
            </div>
        </div>
    );
};

export default MetricCard;
