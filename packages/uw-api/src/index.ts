import App from "./app"
import {jsonifyError} from "@uw/domain"
import {logger} from "@uw/logging"
import {MongoDb} from "./db"
import "./config"

// https://github.com/Requarks/wiki/

// npm node gracefully

// global.winston.info('Starting HTTP/WS server on port ' + appconfig.port + '...')

// app.set('port', appconfig.port)
// var server = http.createServer(app)
// var io = socketio(server)

// server.listen(appconfig.port, appconfig.listenAddress)
// server.on('error', (error) => {
//   if (error.syscall !== 'listen') {
//     throw error
//   }

//   // handle specific listen errors with friendly messages
//   switch (error.code) {
//     case 'EACCES':
//       global.winston.error('Listening on port ' + appconfig.port + ' requires elevated privileges!')
//       return process.exit(1)
//     case 'EADDRINUSE':
//       global.winston.error('Port ' + appconfig.port + ' is already in use!')
//       return process.exit(1)
//     default:
//       throw error
//   }
// })

// server.on('listening', () => {
//   global.winston.info('HTTP/WS server started successfully! [RUNNING]')
// })

process.on("unhandledRejection", error => {
  logger.error({unhandledRejection: jsonifyError(error)})
})

const PORT = process.env.NODE_PORT

MongoDb.connect().then(() => {
  App.listen(PORT, (err: object) => {
    if (err) {
      return logger.error(jsonifyError(err))
    }
    return logger.info(`😊 Express server listening on port [${PORT}]`)
  })
})
