import cluster from 'cluster';
import os from 'node:os';
import app from './app.js';
if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);
    for (let index = 0; index < os.availableParallelism(); index++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    const PORT = process.env['PORT'] || 9999;
    Bun.serve({ port: PORT, fetch: app.fetch, hostname: '0.0.0.0' });
    console.log(`🦊 Hono is running at 0.0.0.0:${PORT}`);
}
