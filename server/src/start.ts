import { app } from './server.ts';

const start = async () => {
    try {
        await app.listen({ port: 3333, host: '0.0.0.0' });
        app.log.info(`Server listening on 3333`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();
