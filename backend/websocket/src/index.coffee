import Fastify from 'fastify'
import dotenv from 'dotenv'

dotenv.config()

portNumber :: Int = process.env.WEBSOCKET_PORT

server = Fastify({ logger: true })

console.debug("welcom to Fastify from CoffeeScript")

server.get('/', (request, reply) ->
        reply.type('application/json').code(200)
        hello:
                world: 'yosh'
                fastify: true
)

server.listen({ port: portNumber }, (err, addr) ->
        if err
                throw err
)

