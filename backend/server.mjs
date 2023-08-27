import http from "http"
import path from "path"
import cors from "cors"
import express from "express"
import cookieParser from "cookie-parser"
import { setupAsyncLocalStorage } from "./middlewares/setupAls.middleware.mjs"
import { userRoutes } from "./api/user/user.routes.mjs"
import { stationRoutes } from "./api/station/station.routes.mjs"
import { setupSocketAPI } from "./services/socket.service.mjs"

const app = express()
const server = http.createServer(app)

app.use(cookieParser())
app.use(express.json())

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve("public")))
} else {
  const corsOptions = {
    origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
    credentials: true,
  }
  app.use(cors(corsOptions))
}

// routes
app.all("*", setupAsyncLocalStorage)
app.use("/api/user", userRoutes)
app.use("/api/station", stationRoutes)
setupSocketAPI(server)
app.get("/**", (req, res) => {
  res.sendFile(path.resolve("public/index.html"))
})

const port = process.env.PORT || 3030

server.listen(port, () => {
  console.log(`App listening on port ${port}!`)
})
