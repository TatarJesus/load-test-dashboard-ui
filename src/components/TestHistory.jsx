export default function TestHistory({ testHistory }) {
    if (testHistory.length === 0) return null;

    return (
        <div className="history-box show">
            <h2 className="box-title">History</h2>
            <div className="history-table-wrapper">
                <table className="history-table">
                    <thead>
                    <tr>
                        <th>Time</th>
                        <th>Platform</th>
                        <th>Req/sec</th>
                        <th>Total Req</th>
                        <th>Throughput (KB/s)</th>
                        <th>Latency (ms)</th>
                        <th>Errors</th>
                    </tr>
                    </thead>
                    <tbody>
                    {testHistory.map((entry, idx) => (
                        <tr key={idx}>
                            <td>{new Date(entry.timestamp).toLocaleTimeString()}</td>
                            <td>{entry.platform}</td>
                            <td>{entry.reqPerSec}</td>
                            <td>{entry.reqTotal}</td>
                            <td>{entry.throughputKbPerSec}</td>
                            <td>{entry.latencyMs}</td>
                            <td>{entry.errors}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
