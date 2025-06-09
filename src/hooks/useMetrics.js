import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('https://api.gpt-tech.ru');

export function useMetrics(platform) {
    const [metrics, setMetrics] = useState(null);
    const [testRunning, setTestRunning] = useState(false);
    const [progress, setProgress] = useState(0);
    const [testData, setTestData] = useState(null);
    const [testMessage, setTestMessage] = useState('');
    const [testHistory, setTestHistory] = useState([]);

    useEffect(() => {
        socket.on('connect', () => console.log('Connected to server via Socket.IO'));

        socket.on('metrics', setMetrics);

        socket.on('test-update', (data) => {
            setTestRunning(data.running ?? true);
            setProgress(data.progress ?? 0);
            if (data.reqPerSec !== undefined) {
                setTestData(data);
                setTestHistory(prev => {
                    const updated = [
                        {
                            timestamp: data.timestamp || new Date().toISOString(),
                            platform,
                            reqPerSec: data.reqPerSec,
                            throughputKbPerSec: data.throughputKbPerSec,
                            reqTotal: data.reqTotal,
                            latencyMs: data.latencyMs,
                            errors: data.errors,
                        },
                        ...prev,
                    ];
                    return updated.slice(0, 10);
                });
            }
        });

        socket.on('test-complete', (data) => {
            setTestRunning(false);
            setTestMessage(data.message || 'Load test complete');
        });

        return () => {
            socket.off('metrics');
            socket.off('test-update');
            socket.off('test-complete');
        };
    }, [platform]);

    const startTest = ({ platform, connections, duration }) => {
        socket.emit('start-test', { platform, connections, duration });
        setTestRunning(true);
        setProgress(0);
        setTestData(null);
        setTestMessage('');
    };

    const cancelTest = () => {
        socket.emit('cancel-test');
        setTestRunning(false);
        setProgress(0);
        setTestData(null);
        setTestMessage('Cancelling test...');
    };

    return {
        metrics,
        testRunning,
        progress,
        testData,
        testMessage,
        testHistory,
        startTest,
        cancelTest,
    };
}
