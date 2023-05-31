import { AboutUs } from './pages/about-us.jsx'
import { Login } from './pages/login.jsx'
import { StationIndex } from './pages/station-index.jsx'
import { StationSearch } from './pages/station-search.jsx'
// import { ChatApp } from './pages/chat-app.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: <StationIndex />,
        label: 'Stations'
    },
    {
        path: 'search',
        component: <StationSearch />,
        label: 'Search'
    },
    // {
    //     path: 'playlist',
    //     component: <PlayList />,
    //     label: 'Search'
    // },
    // {
    //     path: 'artist',
    //     component: <Artist />,
    //     label: 'Artist'
    // },
    // {
    //     path: 'album',
    //     component: <Album />,
    //     label: 'Album'
    // },
    // {
    //     path: 'track',
    //     component: <Track />,
    //     label: 'Track'
    // },
    // {
    //     path: 'genre',
    //     component: <StationGenre />,
    //     label: 'Genre'
    // },
    {
        path: 'login',
        component: <Login />,
        label: 'Login'
    },
    {
        path: 'about',
        component: <AboutUs />,
        label: 'About us'
    },
    // {
    //     path: 'chat',
    //     component: <ChatApp />,
    //     label: 'Chat'
    // },
    // {
    //     path: '/',
    //     component: <HomePage />,
    //     label: 'Home 🏠',
    // },
]

export default routes