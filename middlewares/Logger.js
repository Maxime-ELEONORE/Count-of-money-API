import { createWriteStream } from 'fs';
import { join } from 'path';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logStream = createWriteStream(join(__dirname, '../log/server.log'), { flags: 'a' });

const logger = (req, res, next) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    const logMessage = `
    ------------------------------
    Time: ${formattedDate}
    Request Method: ${req.method}
    Request URL: ${req.originalUrl}
    Headers: ${JSON.stringify(req.headers, null, 2)}
    Body: ${JSON.stringify(req.body, null, 2)}
    ------------------------------
    `;
    logStream.write(logMessage);
    console.log(logMessage);
    next();
};

export default logger;