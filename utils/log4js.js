const log4js = require('log4js')
log4js.configure({
  appenders: {
    // file: {
    //   type: 'file',
    //   filename: path.join(__dirname, '../logs/access.log'),
    //   maxLogSize: 10 * 1024 * 1024, // = 10Mb
    //   backups: 5, // keep five backup files
    //   compress: true, // compress the backups
    //   encoding: 'utf-8',
    //   mode: 0o0640,
    //   flags: 'w+',
    // },
    dateFile: {
      type: 'dateFile',
      filename: path.join(__dirname, '../logs/log_date'),
      alwaysIncludePattern: true,
      pattern: 'yyyy-MM-dd.log',
      compress: true,
    },
    out: {
      type: 'stdout',
    },
  },
  categories: {
    default: { appenders: ['dateFile', 'out'], level: 'trace' },
  },
})
/**
 * export function of getLogger
 */
exports.getLogger = log4js.getLogger
