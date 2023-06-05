import React from 'react'
import { Routes, Route } from 'react-router'

import { StationPlayer } from './cmps/player.jsx'
import routes from './routes.js'
import { SideNav } from './cmps/side-nav.jsx'
import { AppHeader } from './cmps/app-header.jsx'
import { UserDetails } from './pages/user-details.jsx'

export function RootCmp() {
  return (
    <section className='app-layout flex' >
      <SideNav />
      <main>
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
          <Route path="user/:id" element={<UserDetails />} />
        </Routes>
      </main>
      <StationPlayer />
    </section>
  )
}
