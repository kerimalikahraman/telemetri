import { useState, useEffect } from 'react';

export interface TelemetryData {
    speed: number;
    hvTemp: number;
    motorTemp: number;
    inverterTemp: number;
    soc: number;
    throttle: number;
    brake: number;
    hvVoltage: number;
    lvVoltage: number;
    power: number;
    history: {
        time: string;
        tireTempFL: number;
        tireTempFR: number;
        tireTempRL: number;
        tireTempRR: number;
        motorTemp: number;
        hvVoltage: number;
    }[];
}

const MAX_HISTORY_LENGTH = 30;

export const useTelemetryData = () => {
    const [data, setData] = useState<TelemetryData>({
        speed: 0,
        hvTemp: 45,
        motorTemp: 50,
        inverterTemp: 40,
        soc: 85,
        throttle: 0,
        brake: 0,
        hvVoltage: 400,
        lvVoltage: 13.5,
        power: 0,
        history: [],
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const timeString = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

            setData(prev => {
                // Mock data logic
                // Speed fluctuates around 60-80 km/h, simulating driving
                const newSpeed = Math.max(0, Math.min(120, prev.speed + (Math.random() - 0.5) * 5));

                // Temperatures rise slowly
                const newMotorTemp = Math.min(90, prev.motorTemp + (Math.random() * 0.5));
                const newHvTemp = Math.min(60, prev.hvTemp + (Math.random() * 0.2));

                // Random throttle/brake
                const newThrottle = Math.floor(Math.random() * 100);
                const newBrake = Math.floor(Math.random() * 20); // Mostly coasting

                // Tire temps
                const baseTireTemp = 60;

                const newEntry = {
                    time: timeString,
                    tireTempFL: baseTireTemp + Math.random() * 10,
                    tireTempFR: baseTireTemp + Math.random() * 10,
                    tireTempRL: baseTireTemp + Math.random() * 10 - 2,
                    tireTempRR: baseTireTemp + Math.random() * 10 - 2,
                    motorTemp: newMotorTemp,
                    hvVoltage: 400 + (Math.random() - 0.5) * 2,
                };

                const newHistory = [...prev.history, newEntry];
                if (newHistory.length > MAX_HISTORY_LENGTH) {
                    newHistory.shift();
                }

                return {
                    speed: Math.round(newSpeed),
                    hvTemp: parseFloat(newHvTemp.toFixed(1)),
                    motorTemp: parseFloat(newMotorTemp.toFixed(1)),
                    inverterTemp: parseFloat((prev.inverterTemp + (Math.random() - 0.5)).toFixed(1)),
                    soc: parseFloat(Math.max(0, prev.soc - 0.05).toFixed(1)), // Discharging
                    throttle: newThrottle,
                    brake: newBrake,
                    hvVoltage: parseFloat(newEntry.hvVoltage.toFixed(1)),
                    lvVoltage: 13.2 + Math.random() * 0.4,
                    power: Math.round(newThrottle * 1.5), // Simplistic power calc
                    history: newHistory,
                };
            });
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return data;
};
