const Hapi = require("@hapi/hapi")
const rute = require("./routes")
const port = 9000
const host = process.env.NODE_ENV === "deploy" ? "0.0.0.0" : "localhost"
const echo = (...args) => console.log(...args)

async function runServer() {
	const server = Hapi.server({
		port,
		host,
		routes: {
			cors: {
				origin: ["*"]
			}
		}
	})
	server.route(rute)
	await server.start()
	echo(`Listening on ${server.info.uri}`)
}

runServer()