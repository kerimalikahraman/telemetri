"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { auth } from '../lib/auth';
import { Menu, X, Home, Calculator, Activity, Lock, LogOut } from 'lucide-react';
import clsx from 'clsx';

const menuItems = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Mekanik', path: '/calculations', icon: Calculator },
    { name: 'Telemetri', path: '/telemetry', icon: Activity },
    { name: 'Admin', path: '/admin', icon: Lock },
];

export default function Sidebar({ isCollapsed, toggleSidebar }) {
    const pathname = usePathname();

    // Don't show sidebar on login or change-password pages
    if (['/login', '/change-password'].includes(pathname)) return null;

    return (
        <aside
            className={clsx(
                "fixed left-0 top-0 h-screen bg-slate-900 border-r border-slate-800 transition-all duration-300 z-50 flex flex-col",
                isCollapsed ? "w-16" : "w-[250px]"
            )}
        >
            <div className="p-4 flex items-center justify-between border-b border-slate-800 h-16">
                {!isCollapsed && (
                    <span className="font-bold text-white text-xl tracking-tight">KR_App</span>
                )}
                <button
                    onClick={toggleSidebar}
                    className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors ml-auto"
                >
                    {isCollapsed ? <Menu size={20} /> : <X size={20} />}
                </button>
            </div>

            <nav className="flex-1 overflow-y-auto no-scrollbar py-4 px-2">
                <ul className="space-y-1">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <li key={item.path}>
                                <Link
                                    href={item.path}
                                    className={clsx(
                                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
                                        isActive
                                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                                            : "text-slate-400 hover:text-white hover:bg-slate-800"
                                    )}
                                    title={isCollapsed ? item.name : undefined}
                                >
                                    <item.icon size={20} className={clsx("min-w-[20px]", isActive ? "text-white" : "text-slate-400 group-hover:text-white")} />
                                    {!isCollapsed && (
                                        <span className="font-medium text-sm whitespace-nowrap">{item.name}</span>
                                    )}

                                    {isCollapsed && isActive && (
                                        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-indigo-600 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                                            {item.name}
                                        </div>
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className="p-4 border-t border-slate-800">
                <button
                    onClick={auth.logout}
                    className={clsx(
                        "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-red-500/10 hover:border-red-500/20 transition-all group",
                        isCollapsed ? "justify-center" : ""
                    )}
                    title="Çıkış Yap"
                >
                    <LogOut size={20} className="group-hover:text-red-400" />
                    {!isCollapsed && <span className="font-medium text-sm">Çıkış Yap</span>}
                </button>
            </div>
        </aside>
    );
}
