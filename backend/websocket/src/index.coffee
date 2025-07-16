import Fastify from 'fastify'
import dotenv from 'dotenv'
import { Server } from 'socketio'

dotenv.config()

portNumber = process.env.WEBSOCKET_PORT

server = Fastify({ logger: true })

server.get("/api/websocket", (request, reply) ->
        msg: "welcome to the pong at the end of time"
)

try
        port = portNumber
        await server.listen({ port: port, host: "0.0.0.0" })
        console.log("websocket is listening on port #{port}")
catch error
        server.log.error(err)
        process.exit(1)
