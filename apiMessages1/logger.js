
import pkg from 'winston';
const { createLogger, format, transports } = pkg;
const { combine, timestamp, label, printf } = format;


const myFormat = printf(({ level, message, timestamp }) => {  
  return `${timestamp} ${level}: ${message}`;
});


export const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    myFormat
  ),
  transports: [ 
    new transports.Console({}),
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' })
  ]
});