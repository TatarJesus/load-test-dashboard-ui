export default function LoadTestBox({ testRunning, progress, testMessage, startTest, cancelTest, params }) {
    return (
        <div className={`test-box ${testRunning || testMessage ? 'expanded' : ''}`}>
            <h2 className="box-title">Load Test</h2>

            {testRunning ? (
                <button onClick={cancelTest} className="cancel-button">
                    Cancel Test
                </button>
            ) : (
                <button onClick={() => startTest(params)} className="start-button">
                    Start Load Test
                </button>
            )}

            {testRunning && (
                <>
                    <div className="progress-container">
                        <div className="progress-bar" style={{ width: `${progress}%` }} />
                    </div>
                    <p>Progress: {progress.toFixed(1)}%</p>
                </>
            )}

            {!testRunning && testMessage && <p>{testMessage}</p>}
        </div>
    );
}
