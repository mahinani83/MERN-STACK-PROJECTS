const app = require('./app')
const http = require('http')
const port = process.env.PORT ;
const {initializeSocket} = require('./socket')

const server = http.createServer(app)

initializeSocket(server);

server.listen(port,()=>{
    console.log(`app listening at port ${port}`)
})
