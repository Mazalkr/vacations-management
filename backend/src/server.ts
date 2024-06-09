import config from 'config';
import server from './app';

// instead of write 8080 we want to write something general as 'config.get<number>('app.port')'.
server.listen(config.get<number>('app.port'), () => {  
    console.log(`${config.get<string>('app.name')} is running on localhost:${config.get<string>('app.port')}`);
});