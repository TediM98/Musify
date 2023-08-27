import { Routes, Route } from "react-router"
import { StationPlayer } from "./cmps/player.jsx"
import routes from "./routes.js"
import { SideNav } from "./cmps/side-nav.jsx"
import { AppHeader } from "./cmps/app-header.jsx"

export function RootCmp() {
  return (
    <section className="app-layout ">
      <SideNav />
      <main className="layout-conatiner">
        <div className="gradiant"></div>
        <AppHeader />
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              exact={true}
              element={route.component}
              path={route.path}
            />
          ))}
        </Routes>
      </main>
      <StationPlayer />
    </section>
  )
}
