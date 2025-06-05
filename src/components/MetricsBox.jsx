export default function MetricsBox({ metrics }) {
    return (
        <div className={`metrics-box ${metrics ? 'expanded' : ''}`}>
            <h2 className="box-title">Metrics</h2>
            {metrics ? (
                <>
                    <p>CPU: {metrics.cpuPercent}%</p>
                    <p>Memory (pidusage): {metrics.memoryMB} MB</p>
                    <p>RSS: {metrics.rssMB} MB</p>
                    <p>Heap Total: {metrics.heapTotalMB} MB</p>
                    <p>Heap Used: {metrics.heapUsedMB} MB</p>
                    <p>Timestamp: {metrics.timestamp}</p>
                </>
            ) : (
                <p className="placeholder">Waiting for metrics...</p>
            )}
        </div>
    );
}
