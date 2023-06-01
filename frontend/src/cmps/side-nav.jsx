import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import routes from '../routes'
import { login, logout, signup } from '../store/user.actions.js'
import { LoginSignup } from './login-signup.jsx'

export function SideNav() {
  // const user = useSelector((storeState) => storeState.userModule.user)

  // async function onLogin(credentials) {
  //   try {
  //     const user = await login(credentials)
  //   } catch (err) {
  //     console.log('Cannot login')
  //   }
  // }

  // async function onSignup(credentials) {
  //   try {
  //     const user = await signup(credentials)
  //   } catch (err) { }
  // }
  // async function onLogout() {
  //   try {
  //     await logout()
  //   } catch (err) { }
  // }

  console.log(routes)
  return (
    <header>
      <nav className="nav-conatiner">
        {routes.map((route) => (
          <NavLink key={route.path} to={route.path} >
            {route.label}
          </NavLink>
        ))}

        <div>
          <h3>Your Library</h3>
        </div>

        <div>
          playlist
        </div>
        {/* {user && (
          <span className="user-info">
            <Link to={`user/${user._id}`}>
              {user.imgUrl && <img src={user.imgUrl} />}
              {user.fullname}
            </Link>
            <button onClick={onLogout}>Logout</button>
          </span>
        )} 
        {/* {!user && (
          <section className="user-info">
            <LoginSignup onLogin={onLogin} onSignup={onSignup} />
          </section>
        )} */}
      </nav>
    </header >
  )
}