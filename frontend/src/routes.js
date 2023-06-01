import { AboutUs } from './pages/about-us.jsx'
import { Login } from './pages/login.jsx'
import { StationDetails } from './pages/station-details.jsx'
import { StationIndex } from './pages/station-index.jsx'
import { StationSearch } from './pages/station-search.jsx'
// import { ChatApp } from './pages/chat-app.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: <StationIndex />,
        label: 'Home',

    },
    {
        path: 'search',
        component: <StationSearch />,
        label: 'Search'
    },
    {
        path: 'station/:stationId',
        component: <StationDetails />,
        label: 'Station'
    },
    // { SAME AS STATION DETAILS
    //     path: 'genre',
    //     component: <StationGenre />,
    //     label: 'Genre'
    // },
    // {
    //     path: 'login',
    //     component: <Login />,
    //     label: 'Login'
    // },
    // {
    //     path: 'about',
    //     component: <AboutUs />,
    //     label: 'About us'
    // },
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