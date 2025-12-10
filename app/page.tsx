"use client";

import React from 'react';
import Sidebar from '@/components/Sidebar';
import MetricCard from '@/components/MetricCard';
import ProgressBar from '@/components/ProgressBar';
import TelemetryChart from '@/components/TelemetryChart';
import { useTelemetryData } from '@/hooks/useTelemetryData';

export default function Home() {
  const data = useTelemetryData();

  // Helper to determine status based on thresholds
  // In a real app, these thresholds would be configurable constants
  const getTempStatus = (temp: number, warn: number, crit: number) => {
    if (temp >= crit) return 'critical';
    if (temp >= warn) return 'warning';
    return 'normal';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pl-16 font-sans overflow-x-hidden">
      <Sidebar />

      <main className="p-6 max-w-[1600px] mx-auto space-y-6">
        {/* Header */}
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Telemetry Dashboard</h1>
            <p className="text-slate-400 text-sm">Real-time vehicle analytics</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-mono text-slate-500">CONN_STATUS: OK</div>
              <div className="text-xs font-mono text-slate-500">LATENCY: 24ms</div>
            </div>
            <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium animate-pulse">
              LIVE
            </div>
          </div>
        </header>

        {/* Top KPI Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <MetricCard
            label="Speed"
            value={data.speed}
            unit="km/h"
            status="normal"
          />
          <MetricCard
            label="HV Temp"
            value={data.hvTemp}
            unit="°C"
            status={getTempStatus(data.hvTemp, 55, 65)}
          />
          <MetricCard
            label="Motor Temp"
            value={data.motorTemp}
            unit="°C"
            status={getTempStatus(data.motorTemp, 80, 100)}
          />
          <MetricCard
            label="Inv Temp"
            value={data.inverterTemp}
            unit="°C"
            status={getTempStatus(data.inverterTemp, 60, 75)}
          />
          <MetricCard
            label="Throttle"
            value={data.throttle}
            unit="%"
            status="normal"
          />
          <MetricCard
            label="Brake"
            value={data.brake}
            unit="%"
            status={data.brake > 0 ? 'warning' : 'normal'}
          />
        </div>

        {/* Status Bars Section (Battery & Power) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
          <ProgressBar
            label="HV Estimated Charge"
            percentage={data.soc}
            color={data.soc < 20 ? 'red' : 'emerald'}
          />
          <ProgressBar
            label="LV Estimated Charge"
            percentage={92}
            color="blue"
          />
          <ProgressBar
            label="Power Output"
            percentage={data.throttle}
            color="amber"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
          <TelemetryChart
            title="Tire Temperatures (°C)"
            data={data.history}
            lines={[
              { dataKey: 'tireTempFL', stroke: '#ef4444', name: 'FL' },
              { dataKey: 'tireTempFR', stroke: '#f97316', name: 'FR' },
              { dataKey: 'tireTempRL', stroke: '#3b82f6', name: 'RL' },
              { dataKey: 'tireTempRR', stroke: '#10b981', name: 'RR' },
            ]}
          />
          <TelemetryChart
            title="Motor vs Inverter Temp (°C)"
            data={data.history}
            lines={[
              { dataKey: 'motorTemp', stroke: '#ec4899', name: 'Motor' },
            ]}
          />
          <TelemetryChart
            title="HV Voltage Trend (V)"
            data={data.history}
            lines={[
              { dataKey: 'hvVoltage', stroke: '#eab308', name: 'HV' },
            ]}
          />
        </div>
      </main>
    </div>
  );
}
