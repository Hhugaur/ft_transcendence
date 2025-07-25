import Fastify from 'fastify'
import cors from '@fastify/cors'
import dotenv from 'dotenv'
import { Server } from 'socket.io'

dotenv.config()

portNumber = process.env.WEBSOCKET_PORT
hostIp = process.env.HOST_IP

server = Fastify({ logger: true })

server.get("/api/websocket", (request, reply) ->
        msg: "welcome to the pong at the end of time"
)

try
        port = portNumber
        server.listen({ port: port, host: "0.0.0.0" })
        console.log("websocket is listening on port #{port}")
        console.log("websocket hostIp: #{hostIp}")
catch error
        server.log.error(err)
        process.exit(1)
