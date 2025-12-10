"use client";

import React from 'react';
import { Home, Activity, Settings, FileText } from 'lucide-react';
import clsx from 'clsx';

const Sidebar = () => {
    const navItems = [
        { icon: Home, label: 'Home', active: true },
        { icon: Activity, label: 'Bio Data' },
        { icon: FileText, label: 'Logs' },
        { icon: Settings, label: 'Settings' },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-16 bg-slate-900 border-r border-slate-800 flex flex-col items-center py-6 gap-6 z-50">
            {/* Logo Placeholder */}
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center mb-4">
                <span className="font-bold text-white text-xs">FSAE</span>
            </div>

            {/* Nav Items */}
            <nav className="flex flex-col gap-4 w-full items-center">
                {navItems.map((item, index) => (
                    <button
                        key={index}
                        className={clsx(
                            "p-3 rounded-xl transition-all duration-200 group relative",
                            item.active
                                ? "bg-indigo-600/20 text-indigo-400"
                                : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/50"
                        )}
                        title={item.label}
                    >
                        <item.icon size={22} strokeWidth={item.active ? 2.5 : 2} />
                        {item.active && (
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-500 rounded-l-full" />
                        )}
                    </button>
                ))}
            </nav>

            {/* Bottom Status */}
            <div className="mt-auto flex flex-col items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" title="Connected" />
            </div>
        </aside>
    );
};

export default Sidebar;
