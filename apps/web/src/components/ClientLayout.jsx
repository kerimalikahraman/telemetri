"use client";

import React, { useState } from 'react';
import Sidebar from './Sidebar';

export default function ClientLayout({ children }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-black text-white flex">
            <Sidebar isCollapsed={isCollapsed} toggleSidebar={() => setIsCollapsed(!isCollapsed)} />
            <div
                className="flex-1 transition-all duration-300 p-8"
                style={{ marginLeft: isCollapsed ? '64px' : '250px' }}
            >
                {children}
            </div>
        </div>
    );
}
