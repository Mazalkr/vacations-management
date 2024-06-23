import config from 'config';
import server from './app';
import logger from './utils/logger';

server.listen(config.get<number>('app.port'), () => {  
    // console.log(`${config.get<string>('app.name')} is running on localhost:${config.get<string>('app.port')}`);
    logger.info(`${config.get<string>('app.name')} is running on localhost:${config.get<string>('app.port')}`);
});