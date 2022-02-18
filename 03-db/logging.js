const winston = require("winston");

const myFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level} ${message}`;
});

const log = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.splat(),
    myFormat
  ),
  // meta
  transports: [new winston.transports.Console()],
});

modules.exports = log;
