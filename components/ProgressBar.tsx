import React from 'react';
import clsx from 'clsx';

interface ProgressBarProps {
    percentage: number;
    color?: string; // tailwind color class prefix e.g. "emerald", "amber"
    label?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
    percentage,
    color = "emerald",
    label
}) => {
    // Clamp percentage between 0 and 100
    const value = Math.min(Math.max(percentage, 0), 100);

    return (
        <div className="w-full">
            {label && (
                <div className="flex justify-between mb-1">
                    <span className="text-xs font-medium text-slate-400">{label}</span>
                    <span className="text-xs font-bold text-slate-200">{value.toFixed(1)}%</span>
                </div>
            )}
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                    className={clsx(
                        "h-full transition-all duration-500 ease-out rounded-full",
                        // Default color mappings assuming standard tailwind palette availability
                        color === 'emerald' && "bg-emerald-500",
                        color === 'amber' && "bg-amber-500",
                        color === 'red' && "bg-red-500",
                        color === 'blue' && "bg-blue-500",
                        // Fallback if specific string matches aren't enough (extend as needed)
                    )}
                    style={{
                        width: `${value}%`,
                        backgroundColor: !['emerald', 'amber', 'red', 'blue'].includes(color) ? color : undefined
                    }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;
