export default function Controls({
                                     platform,
                                     setPlatform,
                                     connections,
                                     setConnections,
                                     duration,
                                     setDuration,
                                     disabled,
                                 }) {
    return (
        <fieldset className="controls" disabled={disabled}>
            <label>
                Platform:
                <select
                    value={platform}
                    onChange={e => setPlatform(e.target.value)}
                    className="select"
                >
                    <option value="express">Express</option>
                    <option value="fastify">Fastify</option>
                    <option value="koa">Koa</option>
                    <option value="feathers">Feathers JS</option>
                    <option value="hapi">Hapi</option>
                </select>
            </label>

            <label className="label-spacing">
                Connections:
                <input
                    type="number"
                    min={100}
                    max={1500}
                    value={connections}
                    onChange={e => setConnections(Number(e.target.value))}
                    className="input-number"
                />
            </label>

            <label className="label-spacing">
                Duration (seconds):
                <input
                    type="number"
                    min={5}
                    max={1200}
                    value={duration}
                    onChange={e => setDuration(Number(e.target.value))}
                    className="input-number"
                />
            </label>
        </fieldset>
    );
}
