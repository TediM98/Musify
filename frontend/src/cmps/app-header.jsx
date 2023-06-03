import { login, logout, signup } from '../store/user.actions.js'
import { LoginSignup } from './login-signup.jsx'

export function AppHeader() {
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

  // return (
  //   // <h1>AppHeader</h1>
  /* {user && (
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
      )} */
  // )
  return (
    <header className="app-header content-layout">
      <div className="flex">
        <nav className="flex">
          <button className="btn-go-back">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              height="16"
              width="16"
              aria-hidden="true"
              class="Svg-sc-ytk21e-0 eNWijz IYDlXmBmmUKHveMzIPCF"
              viewBox="0 0 16 16"
              data-encore-id="icon"
            >
              <path d="M11.03.47a.75.75 0 0 1 0 1.06L4.56 8l6.47 6.47a.75.75 0 1 1-1.06 1.06L2.44 8 9.97.47a.75.75 0 0 1 1.06 0z" />
            </svg>
          </button>
          <button className="btn-go-next">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              height="16"
              width="16"
              aria-hidden="true"
              class="Svg-sc-ytk21e-0 eNWijz IYDlXmBmmUKHveMzIPCF"
              viewBox="0 0 16 16"
              data-encore-id="icon"
            >
              <path d="M4.97.47a.75.75 0 0 0 0 1.06L11.44 8l-6.47 6.47a.75.75 0 1 0 1.06 1.06L13.56 8 6.03.47a.75.75 0 0 0-1.06 0z" />
            </svg>
          </button>
        </nav>
        <section>
          <button className="btn-signup">Sign Up</button>
          <button className="btn-login">Log in</button>
        </section>
      </div>
    </header>
  )
}
