import Fastify from 'fastify'
import cors from '@fastify/cors'
import dotenv from 'dotenv'
import { Server } from 'socket.io'

dotenv.config()

portNumber = process.env.WEBSOCKET_PORT
hostIp = process.env.HOST_IP
hostAddress = "https://#{hostIp}:5173"

server = Fastify(
        logger: true
)

corsObj = 
        origin: [
                hostAddress,
                "https://localhost:5173"
        ]
        methods: [ "GET", "POST" ]
        credentials: true

server.register(cors, corsObj)

io = new Server(server.server, 
        cors: corsObj
        path: "/my-websocket/"
)

server.get("/health", (request, reply) ->
        service: "websocket"
        port: portNumber
        status: "healthy"
        uptime: process.uptime()
)

io.on("connection", (socket) ->
        console.log("a user has connected")
        socket.on("disconnect", ->
                console.log("a user has disconnected")
        )
)

try
        server.listen(
                port: portNumber
                host: "0.0.0.0"
        )
        console.log("websocket is listening on port #{portNumber}")
        console.log("websocket hostAddress: #{hostAddress}")
catch errr
        server.log.error(err)
        process.exit(1)
