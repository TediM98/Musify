import http from 'http'
import path from 'path'
import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'


const app = express()
const server = http.createServer(app)

// Express App Config
app.use(cookieParser())
app.use(express.json())


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve('public')))
} else {
    const corsOptions = {
        origin: [
            'http://127.0.0.1:3000',
            'http://localhost:3000'
        ],
        credentials: true
    }
    app.use(cors(corsOptions))
}

import { authRoutes } from './api/auth/auth.routes.mjs'
import { userRoutes } from './api/user/user.routes.mjs'
import { stationRoutes } from './api/station/station.routes.mjs'
import { setupSocketAPI } from './services/socket.service.mjs'

// routes
// import { setupAsyncLocalStorage } from './middlewares/setupAls.middleware.mjs'
// app.all('*', setupAsyncLocalStorage)

app.use('/api/user', userRoutes)
app.use('/api/station', stationRoutes)
setupSocketAPI(server)

// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/station/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue/react-router to take it from there
app.get('/**', (req, res) => {
    res.sendFile(path.resolve('public/index.html'))
})


const port = process.env.PORT || 3030;

// app.get('/**', (req, res) => {
//     res.sendFile(path.join('public', 'index.html'));
// })

app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
});
