import React, { useState } from 'react';
import { useMetrics } from './hooks/useMetrics';
import Controls from './components/Controls';
import MetricsBox from './components/MetricsBox';
import LoadTestBox from './components/LoadTestBox';
import TestHistory from './components/TestHistory';
import './Metrics.css';

export default function Metrics() {
    const [platform, setPlatform] = useState('express');
    const [connections, setConnections] = useState(500);
    const [duration, setDuration] = useState(30);

    const {
        metrics,
        testRunning,
        progress,
        testMessage,
        testHistory,
        startTest,
        cancelTest,
    } = useMetrics(platform);

    return (
        <div className="metrics-container">
            <h1 className="title">Server Metrics & Load Test</h1>
            <Controls
                platform={platform}
                setPlatform={setPlatform}
                connections={connections}
                setConnections={setConnections}
                duration={duration}
                setDuration={setDuration}
                disabled={testRunning}
            />


            <div className="content content-2-columns">
                <MetricsBox metrics={metrics} />
                <LoadTestBox
                    testRunning={testRunning}
                    progress={progress}
                    testMessage={testMessage}
                    startTest={startTest}
                    cancelTest={cancelTest}
                    params={{ platform, connections, duration }}
                />
            </div>

            <TestHistory testHistory={testHistory} />
        </div>
    );
}
