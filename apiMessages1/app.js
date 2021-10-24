import express from 'express';
import { logger } from './logger.js';
import { router } from './router.js';
import oracledb from 'oracledb';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';


dotenv.config();
var PORT = process.env.PORT;


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/messages', router);


app.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('This is home page');
    res.end();
});

app.all('*', (req, res) => {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write('<html><body><p>The page not found.</p></body></html>');
    //    logger.error('The page not found.');
    res.end();
});

const startApi = async () => {
    try {
        OracleClient();
        app.listen(process.env.PORT, () => {
            logger.info('Server running, Express is listening...');
        })
    } catch (err) {
        logger.error(err.message);

    }


}

const OracleClient = () => {
    try {
        oracledb.initOracleClient({ libDir: process.env.LIBDIR });
    }
    catch (err) {
        console.error('Whoops!');
        console.error(err);
        process.exit(1);
    }
}

startApi();

