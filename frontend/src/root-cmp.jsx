import React from 'react'
import { Routes, Route } from 'react-router'

import { StationPlayer } from './cmps/player.jsx'
import routes from './routes'
import { SideNav } from './cmps/side-nav'
import { AppHeader } from './cmps/app-header.jsx'
import { AppFooter } from './cmps/app-footer'
import { UserDetails } from './pages/user-details'

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
