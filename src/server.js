const express = require("express")
const cors = require("cors")
const listEndpoints = require("express-list-endpoints")
const mongoose = require("mongoose")
const articlesRoutes = require("./services/articles")


const { notFoundHandler, badRequestHandler, genericErrorHandler } = require("./errorHandlers")


const server = express()
const port = process.env.PORT

server.use(cors())
server.use(express.json())

server.use("/articles", articlesRoutes)





server.use(badRequestHandler)
server.use(notFoundHandler)
server.use(genericErrorHandler)

console.log(listEndpoints(server))

mongoose
  .connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    server.listen(port, () => {
      console.log("Server is running on port: ", port);
    })
  );